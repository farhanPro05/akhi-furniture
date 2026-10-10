# Photo edit pipeline used for the mockups (2026-10-10). Paths point at the session workspace; adjust SRC/WEB/MASTER to rerun.
# Needs: pip install pillow numpy scipy "rembg[cpu]". Cutouts were made with rembg isnet-general-use, then cleaned by hand.
import glob, json, numpy as np
from PIL import Image, ImageOps, ImageFilter, ImageDraw, ImageEnhance
SRC = "/mnt/user-data/uploads/akhi_furnitures_website/media/originals/facebook/"
WEB = "/mnt/user-data/outputs/design/assets/photos/"
MASTER = "/tmp/akhi/edited/"
def load(n): return ImageOps.exif_transpose(Image.open(glob.glob(SRC + f"akhi-fb-{n}-*.jpg")[0])).convert("RGB")

def grade(im, warmth=1.0):
    """Light, global corrections only: levels, gentle white balance, mild contrast/saturation, light sharpening.
       Nothing local, nothing generative: the furniture itself is never altered."""
    a = np.asarray(im).astype(np.float32) / 255.0
    lum = a @ np.array([0.2126, 0.7152, 0.0722], np.float32)
    lo, hi = np.percentile(lum, 0.4), np.percentile(lum, 99.6)
    s = (a - lo) / max(hi - lo, 1e-3)
    a = 0.55 * np.clip(s, 0, 1) + 0.45 * a                      # partial level stretch
    mx, mn = a.max(2), a.min(2); sat = (mx - mn) / (mx + 1e-4)
    m = (sat < 0.12) & (lum > 0.25) & (lum < 0.95)                # near-neutral pixels
    if m.sum() > 500:
        avg = a[m].mean(0); target = avg.mean() * np.array([1.015, 1.0, 0.975]) * np.array([warmth, 1, 2 - warmth])
        gain = np.clip(target / avg, 0.94, 1.06)                  # at most +-6% per channel
        a = a * gain
    a = np.clip(a, 0, 1)
    out = Image.fromarray((a * 255).astype(np.uint8))
    out = ImageEnhance.Contrast(out).enhance(1.04)
    out = ImageEnhance.Color(out).enhance(1.05)
    return out.filter(ImageFilter.UnsharpMask(radius=1.2, percent=55, threshold=3))

def save(im, name, long_edge=1600, q=80):
    m = im.copy(); m.save(MASTER + name + ".jpg", quality=92)
    w = im.copy(); w.thumbnail((long_edge, long_edge), Image.LANCZOS); w.save(WEB + name + ".jpg", quality=q, optimize=True, progressive=True)
    return w.size

def crop_frac(im, x0, y0, x1, y1):
    W, H = im.size; return im.crop((int(x0 * W), int(y0 * H), int(x1 * W), int(y1 * H)))

def composite(n, name, W=1200, H=1500, fit_w=0.84, fit_h=0.76, floor=0.86):
    """Clean cutout (rembg isnet) on a warm studio ground matching surface-sunken, with a soft contact shadow."""
    cut = Image.open(f"/tmp/akhi/cut/{n}c.png").convert("RGBA")
    cut = cut.crop(cut.getbbox())
    rgb = grade(cut.convert("RGB")); al = cut.getchannel("A")
    al = al.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))   # 1px defringe + feather
    obj = rgb.convert("RGBA"); obj.putalpha(al)
    k = min(W * fit_w / obj.width, H * fit_h / obj.height); obj = obj.resize((int(obj.width * k), int(obj.height * k)), Image.LANCZOS)
    # warm ground: surface-sunken #f2eadf, lighter toward the top, slightly deeper floor
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    base = np.array([242, 234, 223], np.float32); light = np.array([249, 244, 237], np.float32); deep = np.array([234, 224, 210], np.float32)
    t = np.clip(1 - np.hypot((xx - W / 2) / (W * 0.75), (yy - H * 0.3) / (H * 0.6)), 0, 1)[..., None]
    bg = base * (1 - t) + light * t
    f = np.clip((yy - H * floor + H * 0.12) / (H * 0.3), 0, 1)[..., None]; bg = bg * (1 - 0.5 * f) + deep * 0.5 * f
    canvas = Image.fromarray(bg.astype(np.uint8)).convert("RGBA")
    x = (W - obj.width) // 2; y = int(H * floor) - obj.height
    sh = Image.new("L", (W, H), 0); d = ImageDraw.Draw(sh)
    d.ellipse((x + obj.width * 0.08, y + obj.height - H * 0.016, x + obj.width * 0.92, y + obj.height + H * 0.010), fill=120)
    sh = sh.filter(ImageFilter.GaussianBlur(H * 0.010))
    amb = Image.new("L", (W, H), 0); amb.paste(obj.getchannel("A").point(lambda v: v * 0.25), (x, y + int(H * 0.008))); amb = amb.filter(ImageFilter.GaussianBlur(H * 0.02))
    dark = Image.new("RGBA", (W, H), (70, 52, 38, 255))
    canvas = Image.composite(dark, canvas, Image.fromarray(np.maximum(np.asarray(sh), np.asarray(amb))))
    canvas.alpha_composite(obj, (x, y))
    return canvas.convert("RGB")

log = {}
def native(n, name, **kw): log[name] = {"src": n, "edit": "grade", "size": save(grade(load(n), **kw), name)}
def cropped(n, name, box, **kw): log[name] = {"src": n, "edit": f"grade + crop {box}", "size": save(grade(crop_frac(load(n), *box)), name)}
def cutcomp(n, name): log[name] = {"src": n, "edit": "background removed (rembg isnet), warm studio ground, contact shadow, grade", "size": save(composite(n, name), name, long_edge=1500)}

# Home / rooms / hero
native("051", "hero-living")
native("099", "room-bedroom"); native("038", "room-living"); native("040", "room-dining")
# Design cards and galleries
for n, s in [("054","d-din-021"),("057","d-din-021-b"),("058","d-din-021-c"),("055","d-din-021-d"),("053","d-din-021-e"),("052","d-din-021-f"),
             ("007","d-sof-007-b"),("010","d-bed-014"),("011","d-bed-014-b"),("048","d-wrd-005-b"),("062","d-sof-012"),("060","d-sof-012-b"),
             ("004","d-drs-003"),("002","d-drs-003-b"),("031","d-bed-019"),("064","d-sof-015"),("065","d-sof-015-b"),("068","d-tbl-006"),
             ("067","d-tbl-006-b"),("100","d-drs-008")]:
    native(n, s)
for n, s in [("008","c-sof-007"),("009","c-chr-004"),("046","c-wrd-005"),("071","c-shw-009")]: cutcomp(n, s)
# Projects
native("079","p-bedroom-suite"); native("080","p-bedroom-suite-b")
cropped("019","p-kitchen",(0.22,0.20,0.98,0.88))      # removes the corner logo and the phone's timestamp
native("017","p-kitchen-b"); native("022","p-wardrobes")
cropped("068","p-sitting-detail",(0.22,0.42,0.78,0.98))
# Workshop, showroom, craft
native("086","ws-sofa"); native("084","ws-sofa-b"); native("049","ws-wardrobe"); native("047","ws-wardrobe-b")
native("013","showroom-1"); native("036","showroom-2"); native("037","showroom-3")
cropped("032","craft-carving",(0.24,0.0,0.69,1.0))
json.dump(log, open("/tmp/akhi/edit-log.json","w"), indent=1)
print(len(log), "images")
