/* =========================================================================
   AKHI FURNITURE · Mockup behaviour
   Injects the shared shell (header, menus, footer, sticky bar, channel
   chooser, toast, lightbox) and wires the small interactions so the
   mockups can be clicked through. Build note: in Astro these become
   components; the behaviour here is the reference.

   Mockup-only helper: ?state=menu | dropdown | sheet | toast | lightbox |
   brief2 | brief3 | brief4 | hover | copied  opens that state on load.
   ========================================================================= */
(function () {
  const body = document.body;
  const lang = body.dataset.lang || "en";
  const BN = lang === "bn";
  const page = body.dataset.page || "";
  const code = body.dataset.code || "";
  // The other-language version of this page: x.html <-> x-bn.html (override with data-alt)
  const file = decodeURIComponent(location.pathname.split("/").pop() || "home.html");
  const alt = body.dataset.alt || (BN ? file.replace("-bn.html", ".html") : file.replace(/\.html$/, "-bn.html"));
  const sticky = body.dataset.sticky || "general";

  /* ---------- Placeholder business facts (TODO-VERIFY before launch) ---------- */
  const FACT = {
    phone: BN ? "০১৬০০-২৯৭৯২৩" : "01600-297923",
    tel: "tel:+8801600297923",
    wa: "https://wa.me/8801600297923",
    messenger: "https://m.me/akhifurniture",
    instagram: "https://ig.me/m/akhifurniture",
    email: "hello@akhifurniture.com",
    area: BN ? "বসুন্ধরা, ঢাকা" : "Bashundhara, Dhaka",
  };

  /* ---------- Icons (Lucide-style, 1.5px stroke). Brand glyphs for
     WhatsApp / Messenger / Instagram / Facebook / YouTube are stand-ins:
     use the official glyphs from each brand's asset kit in the build. ---------- */
  const P = {
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    "chev-down": '<path d="m6 9 6 6 6-6"/>',
    "chev-right": '<path d="m9 6 6 6-6 6"/>',
    "chev-left": '<path d="m15 6-6 6 6 6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "arrow-left": '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    whatsapp: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8c-.9-.4-1.6-1.1-2-2l.8-1-1-2L9 9.5z" stroke-width="1.2"/>',
    messenger: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01" stroke-width="2.4"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01" stroke-width="2.4"/>',
    facebook: '<circle cx="12" cy="12" r="10"/><path d="M15 8h-1.5A2.5 2.5 0 0 0 11 10.5V22M8.5 13.5h6"/>',
    youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>',
    copy: '<rect x="8" y="8" width="14" height="14" rx="2"/><path d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    "check-circle": '<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>',
    play: '<path d="M7 4.5v15l13-7.5z"/>',
    more: '<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
    ruler: '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2M11.5 9.5l2-2M8.5 6.5l2-2M17.5 15.5l2-2"/>',
    wood: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    finish: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5S12.5 5.5 12 3c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z"/>',
    fabric: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
    storage: '<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8M10 12h4"/>',
    sparkle: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 3v4M17 5h4"/>',
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" stroke-width="2"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
    store: '<path d="M4 10v10h16V10M2 10l2-6h16l2 6zM10 20v-5h4v5"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
    expand: '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
    heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>',
    hammer: '<path d="m15 12-8.5 8.5a2.1 2.1 0 1 1-3-3L12 9M17.6 15 22 10.6M20.9 11.7l-1.2-1.2c-.6-.6-.9-1.4-.9-2.3v-.8L16 4.6A5.6 5.6 0 0 0 12 3H9l.9.8A6.2 6.2 0 0 1 12 8.4V10l2 2h2.5l2.3 1.9"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    nav: '<path d="M3 11l19-9-9 19-2-8-8-2z"/>',
    external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    send: '<path d="m22 2-7 20-4-9-9-4zM22 2 11 13"/>',
    edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"/>',
    grid: '<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
    translate: '<path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/>',
    bed: '<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M2 17h20M6 10V8h5v2M13 10V8h5v2"/>',
    sofa: '<path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0zM4 18v2M20 18v2"/>',
    dining: '<path d="M2 9h20M5 9v11M19 9v11M8 9v4h8V9"/>',
    chair: '<path d="M7 3h10v9H7zM5 12h14v3H5zM6 15v6M18 15v6"/>',
    wardrobe: '<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M12 2v20M10 11v2M14 11v2"/>',
    dresser: '<circle cx="12" cy="7" r="5"/><path d="M5 15h14v7M5 15v7M12 12v3M5 18h14"/>',
    showcase: '<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M4 9h16M4 15h16"/>',
    desk: '<path d="M2 8h20M4 8v12M20 8v12M14 8v7h6"/>',
    conference: '<rect x="3" y="10" width="18" height="4" rx="2"/><path d="M7 14v6M17 14v6M7 6h.01M12 6h.01M17 6h.01" stroke-width="2"/>',
  };
  const sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">' +
    Object.entries(P).map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24">${v}</symbol>`).join("") + "</svg>";
  body.insertAdjacentHTML("afterbegin", sprite);
  const I = (n, c = "") => `<svg class="icon ${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  window.AKHI_ICON = I;

  /* ---------- Sample designs (placeholders until the asset register is ready).
     Names, codes and materials are SAMPLE content: replace with real AKHI work. ---------- */
  const ROOM = { bedroom: ["Bedroom", "বেডরুম"], living: ["Living", "লিভিং রুম"], dining: ["Dining", "ডাইনিং"], office: ["Office", "অফিস"] };
  // [code, name EN, name BN, room, type, material (unverified), main photo, hover photo]
  // Photos: real AKHI work from the public Facebook page, edited (see media/asset-register.csv).
  // "c-" photos are background-removed studio shots; "d-" photos are graded in-room shots.
  const DESIGNS = [
    ["AF-DIN-021", "Marble-top dining set", "মার্বেল টপ ডাইনিং সেট", "dining", ["Dining sets", "ডাইনিং সেট"], ["Marble-look top, champagne finish", "মার্বেল লুক টপ, শ্যাম্পেন ফিনিশ"], "d-din-021", "d-din-021-b"],
    ["AF-SOF-007", "Carved velvet sofa", "খোদাই করা ভেলভেট সোফা", "living", ["Sofas", "সোফা"], ["Carved wood, velvet", "খোদাই করা কাঠ, ভেলভেট"], "c-sof-007", "d-sof-007-b"],
    ["AF-BED-014", "Velvet upholstered bed", "ভেলভেট কুশন খাট", "bedroom", ["Beds", "খাট"], ["Velvet headboard and base", "ভেলভেট হেডবোর্ড ও বেস"], "d-bed-014", "d-bed-014-b"],
    ["AF-WRD-005", "Mahogany wardrobe with mirror doors", "আয়না দরজার মেহগনি ওয়ার্ডরোব", "bedroom", ["Wardrobes", "ওয়ার্ডরোব"], ["Mahogany finish, mirror doors", "মেহগনি ফিনিশ, আয়না দরজা"], "c-wrd-005", "d-wrd-005-b"],
    ["AF-CHR-004", "Carved velvet armchair", "খোদাই করা ভেলভেট আর্মচেয়ার", "living", ["Chairs", "চেয়ার"], ["Carved wood, velvet", "খোদাই করা কাঠ, ভেলভেট"], "c-chr-004", ""],
    ["AF-SOF-012", "Leather Chesterfield sofa", "লেদার চেস্টারফিল্ড সোফা", "living", ["Sofas", "সোফা"], ["Leather, button tufted", "লেদার, বাটন টাফটেড"], "d-sof-012", "d-sof-012-b"],
    ["AF-SHW-009", "Champagne glass showcase", "শ্যাম্পেন রঙের কাচের শোকেস", "living", ["Showcases", "শোকেস"], ["Carved frame, glass shelves", "খোদাই ফ্রেম, কাচের তাক"], "c-shw-009", ""],
    ["AF-DRS-003", "Carved dressing table with stool", "টুলসহ খোদাই করা ড্রেসিং টেবিল", "bedroom", ["Dressing tables", "ড্রেসিং টেবিল"], ["Antique finish", "অ্যান্টিক ফিনিশ"], "d-drs-003", "d-drs-003-b"],
    ["AF-BED-019", "Tufted pearl bed", "টাফটেড পার্ল খাট", "bedroom", ["Beds", "খাট"], ["Tufted headboard, carved frame", "টাফটেড হেডবোর্ড, খোদাই ফ্রেম"], "d-bed-019", ""],
    ["AF-SOF-015", "Loveseat set with armchairs", "আর্মচেয়ারসহ লাভসিট সেট", "living", ["Sofas", "সোফা"], ["Painted frame, damask fabric", "রঙিন ফ্রেম, ড্যামাস্ক কাপড়"], "d-sof-015", "d-sof-015-b"],
    ["AF-TBL-006", "Mirrored coffee table", "আয়না বসানো কফি টেবিল", "living", ["Tables", "টেবিল"], ["Mirror panels", "আয়নার প্যানেল"], "d-tbl-006", "d-tbl-006-b"],
    ["AF-DRS-008", "Triple-mirror dressing table", "তিন আয়নার ড্রেসিং টেবিল", "bedroom", ["Dressing tables", "ড্রেসিং টেবিল"], ["Champagne finish", "শ্যাম্পেন ফিনিশ"], "d-drs-008", ""],
  ];
  const L = BN ? 1 : 0;
  const card = ([c, en, bn, room, type, mat, img, img2], opts = {}) => `
<a class="d-card" href="${BN ? "design-detail-bn.html" : "design-detail.html"}">
  <div class="d-card__media">
    <div class="ph" ${img ? `data-img="${img}"` : ""} data-ph="${type[L]}, 4:5" aria-label="${BN ? bn : en}"></div>${img2 ? `<div class="ph" data-img="${img2}" data-ph="${type[L]}"></div>` : ""}
    <div class="d-card__material"><span>${BN ? "ম্যাটেরিয়াল" : "Material"}: <span class="verify">${mat[L]}</span></span></div>
    ${opts.heart ? `<span class="btn-icon d-card__heart" aria-label="Save">${I("heart")}</span>` : ""}
  </div>
  <div class="d-card__meta">
    <div class="d-card__top"><span class="d-card__code">${c}</span><span class="tag">${BN ? "কাস্টমাইজযোগ্য" : "Customizable"}</span></div>
    <span class="d-card__name">${BN ? bn : en}</span>
    <span class="d-card__sub">${ROOM[room][L]} · ${type[L]}</span>
    <span class="d-card__mat-touch verify">${mat[L]}</span>
  </div>
</a>`;
  window.AKHI_CARD = card;
  const SETS = { featured: [0, 1, 2, 3, 4, 5, 6, 7], all: DESIGNS.map((_, i) => i), related: [1, 5, 2, 7], office: [], bedroom: [2, 3, 7, 8, 11], sitting: [9, 10, 4, 1] };
  window.AKHI_DESIGNS = DESIGNS;
  document.querySelectorAll("[data-cards]").forEach((el) => {
    el.innerHTML = (SETS[el.dataset.cards] || []).map((i) => card(DESIGNS[i], { heart: el.hasAttribute("data-heart") })).join("");
  });
  // Expand <i data-icon="x"> shorthands used in the page files.
  document.querySelectorAll("i[data-icon]").forEach((el) => {
    el.outerHTML = I(el.dataset.icon, el.className || "");
  });
  // Photo placeholders: <div class="ph" data-ph="Bed, front view"> gets a label.
  // Real photos: <div class="ph" data-img="name" data-pos="50% 60%"> uses assets/photos/name.jpg
  document.querySelectorAll(".ph[data-img]").forEach((el) => {
    el.style.backgroundImage = `url(../assets/photos/${el.dataset.img}.jpg)`;
    if (el.dataset.pos) el.style.setProperty("--pos", el.dataset.pos);
    el.classList.add("has-img"); el.setAttribute("role", "img");
  });
  document.querySelectorAll(".ph[data-ph]:not([data-img])").forEach((el) => {
    if (!el.querySelector(".ph__label")) el.insertAdjacentHTML("beforeend", `<span class="ph__label">${I("image")}${BN ? "AKHI ছবি" : "AKHI photo"} · ${el.dataset.ph}</span>`);
  });

  /* ---------- Strings ---------- */
  const T = BN ? {
    nav: [["designs", "ডিজাইন", "designs.html"], ["custom", "কাস্টম ফার্নিচার", "custom-furniture.html"], ["work", "আমাদের কাজ", "our-work.html"], ["business", "অফিস ও ব্যবসা", "for-business.html"], ["about", "আমাদের সম্পর্কে", "about.html"], ["visit", "শোরুম ও যোগাযোগ", "visit.html"]],
    wa: "হোয়াটসঅ্যাপ করুন", call: "কল করুন", menu: "মেনু", close: "বন্ধ করুন", more: "আরও উপায়",
    rooms: [["বেডরুম", "bed"], ["লিভিং রুম", "sofa"], ["ডাইনিং", "dining"], ["অফিস", "desk"]],
    types: ["খাট", "সোফা", "ডাইনিং সেট", "আলমারি ও ওয়ার্ডরোব", "ড্রেসিং টেবিল", "শোকেস", "অফিস ও কনফারেন্স"],
    viewAll: "সব ডিজাইন দেখুন", byRoom: "রুম অনুযায়ী", byType: "ধরন অনুযায়ী", featured: "এই মাসের পছন্দ",
    ask: `${code} নিয়ে জানতে চাই`,
    sheetT: "কীভাবে যোগাযোগ করবেন?", sheetS: "যে অ্যাপ আপনি ব্যবহার করেন, সেটি বেছে নিন।",
    rec: "প্রস্তাবিত",
    ch: [["whatsapp", "হোয়াটসঅ্যাপ", code ? "মেসেজে এই ডিজাইনের কোড থাকবে" : "ছবি ও মাপ পাঠানোর সবচেয়ে সহজ উপায়"], ["messenger", "মেসেঞ্জার", "ডিজাইন কোড কপি হবে, মেসেজে পেস্ট করুন"], ["instagram", "ইনস্টাগ্রাম", "মেসেঞ্জারের মতোই, কোড আগে কপি হবে"], ["phone", "কল করুন", FACT.phone], ["pin", "লোকেশন দেখুন", `${FACT.area} · গুগল ম্যাপে খুলবে`]],
    toast: `ডিজাইন কোড ${code || "AF-DIN-021"} কপি হয়েছে, মেসেজে পেস্ট করুন`,
    foot: "ঢাকায় কাস্টম ফার্নিচার ও শোরুম। খাট, সোফা, ডাইনিং সেট ও অফিস ফার্নিচার, আপনার মাপে তৈরি।",
    fcols: ["ডিজাইন", "আখি ফার্নিচার", "যোগাযোগ", "শোরুম"],
    fDesigns: ["সব ডিজাইন", "বেডরুম", "লিভিং রুম", "ডাইনিং", "অফিস"],
    fCompany: [["কাস্টম ফার্নিচার", "custom-furniture.html"], ["আমাদের কাজ", "our-work.html"], ["অফিস ও ব্যবসা", "for-business.html"], ["সোফা রিনিউয়াল", "sofa-renewal.html"], ["আমাদের সম্পর্কে", "about.html"], ["প্রশ্ন ও উত্তর", "faq.html"]],
    hours: "সময়সূচি নিশ্চিত করা হবে", dir: "লোকেশন দেখুন",
    copy: "© ২০২৬ আখি ফার্নিচার। এখানে দেখানো সব কাজ আমাদের নিজেদের।", privacy: "গোপনীয়তা",
    lbHint: "জুম করতে দুই আঙুলে টানুন", of: "/",
    address: "শোরুমের ঠিকানা, বসুন্ধরা আ/এ, ঢাকা",
  } : {
    nav: [["designs", "Designs", "designs.html"], ["custom", "Custom Furniture", "custom-furniture.html"], ["work", "Our Work", "our-work.html"], ["business", "For Business", "for-business.html"], ["about", "About", "about.html"], ["visit", "Visit Us", "visit.html"]],
    wa: "WhatsApp us", call: "Call", menu: "Menu", close: "Close", more: "More ways to reach us",
    rooms: [["Bedroom", "bed"], ["Living", "sofa"], ["Dining", "dining"], ["Office", "desk"]],
    types: ["Beds", "Sofas", "Dining sets", "Wardrobes & storage", "Dressing tables", "Showcases", "Office & conference"],
    viewAll: "View all designs", byRoom: "By room", byType: "By type", featured: "Featured this month",
    ask: `Ask about ${code}`,
    sheetT: "Choose how to reach us", sheetS: "Pick the app you already use.",
    rec: "Recommended",
    ch: [["whatsapp", "WhatsApp", code ? "Your message opens with this design's code" : "Easiest way to send photos and sizes"], ["messenger", "Messenger", "We copy the design code for you to paste"], ["instagram", "Instagram", "Same as Messenger: the code is copied first"], ["phone", "Call", FACT.phone], ["pin", "Get directions", `${FACT.area} · opens Google Maps`]],
    toast: `Design code ${code || "AF-DIN-021"} copied, paste it in your message`,
    foot: "Custom furniture and a showroom in Dhaka. Beds, sofas, dining sets and office furniture, made to your size.",
    fcols: ["Designs", "Akhi Furniture", "Talk to us", "Showroom"],
    fDesigns: ["All designs", "Bedroom", "Living", "Dining", "Office"],
    fCompany: [["Custom furniture", "custom-furniture.html"], ["Our work", "our-work.html"], ["For business", "for-business.html"], ["Sofa renewal", "sofa-renewal.html"], ["About", "about.html"], ["FAQ", "faq.html"]],
    hours: "Hours to be confirmed", dir: "Get directions",
    copy: "© 2026 Akhi Furniture. All work shown is our own.", privacy: "Privacy",
    lbHint: "Pinch to zoom", of: "/",
    address: "Showroom address, Bashundhara R/A, Dhaka",
  };
  const langSwitch = `<nav class="lang-switch" aria-label="Language"><a href="${BN ? alt : "#"}" lang="en" ${BN ? "" : 'aria-current="true"'}>EN</a><a href="${BN ? "#" : alt}" lang="bn" ${BN ? 'aria-current="true"' : ""}>বাং</a></nav>`;
  const brand = `<a class="brand" href="${BN ? "home-bn.html" : "home.html"}" aria-label="Akhi Furniture home"><img src="../assets/akhi-mark.png" alt=""><span class="brand__word">Akhi Furniture<small>${BN ? "ঢাকা" : "Dhaka"}</small></span></a>`;

  /* ---------- Header ---------- */
  const navLinks = T.nav.map(([k, label, href]) => k === "designs"
    ? `<div class="nav__drop"><button type="button" aria-expanded="false" aria-controls="designs-dd" class="${page === k ? "is-current" : ""}">${label}${I("chev-down")}</button></div>`
    : `<a href="${href}" ${page === k ? 'aria-current="page"' : ""}>${label}</a>`).join("");
  const header = `
<header class="site-header" id="top">
  <div class="container site-header__bar">
    ${brand}
    <nav class="nav" aria-label="Main">${navLinks}</nav>
    ${langSwitch}
    <a class="btn btn--primary btn--sm header-wa" href="${FACT.wa}">${I("whatsapp")}${T.wa}</a>
    <button class="btn-icon btn-icon--bare menu-btn" type="button" aria-label="${T.menu}" aria-expanded="false">${I("menu", "icon--24")}</button>
  </div>
  <div class="dropdown" id="designs-dd">
    <div class="container dropdown__inner">
      <div><p class="t-eyebrow" style="margin-bottom:16px">${T.byRoom}</p>
        <div class="dropdown__rooms">${T.rooms.map(([r], i) => `<a class="dropdown__room" href="designs.html"><div class="ph has-img" ${["room-bedroom", "room-living", "room-dining", ""][i] ? `style="background-image:url(../assets/photos/${["room-bedroom", "room-living", "room-dining"][i]}.jpg)"` : ""}></div><span class="t-label">${r}</span></a>`).join("")}</div></div>
      <div><p class="t-eyebrow" style="margin-bottom:16px">${T.byType}</p>
        <div class="dropdown__types">${T.types.map((t) => `<a href="designs.html">${t}</a>`).join("")}<a class="link-arrow" href="designs.html">${T.viewAll}${I("arrow", "icon--16")}</a></div></div>
      <a class="d-card" href="design-detail.html">
        <div class="ph r-4x3 has-img" style="border-radius:8px;background-image:url(../assets/photos/d-din-021-b.jpg)"></div>
        <div class="d-card__meta"><span class="t-caption">${T.featured}</span><span class="d-card__name">${BN ? "মার্বেল টপ ডাইনিং সেট" : "Marble-top dining set"}</span><span class="d-card__code">AF-DIN-021</span></div>
      </a>
    </div>
  </div>
</header>
<div class="mobile-menu" role="dialog" aria-modal="true" aria-label="${T.menu}">
  <div class="container mobile-menu__top">${brand}${langSwitch}<button class="btn-icon btn-icon--bare menu-close" type="button" aria-label="${T.close}">${I("x", "icon--24")}</button></div>
  <nav class="container mobile-menu__links" aria-label="Main">
    ${T.nav.map(([k, label, href]) => `<a href="${href}" ${page === k ? 'aria-current="page"' : ""}>${label}${I("arrow")}</a>${k === "designs" ? `<div class="mobile-menu__sub">${T.rooms.map(([r]) => `<a class="chip" href="designs.html" style="font-family:var(--font-sans);font-size:14px;min-height:40px;border-bottom:1px solid var(--line-strong)">${r}</a>`).join("")}</div>` : ""}`).join("")}
  </nav>
  <div class="mobile-menu__foot"><div class="container" style="display:grid;gap:12px">
    <a class="btn btn--primary btn--lg btn--block" href="${FACT.wa}">${I("whatsapp")}${T.wa}</a>
    <a class="btn btn--secondary btn--lg btn--block" href="${FACT.tel}">${I("phone")}${T.call} <span class="verify t-num">${FACT.phone}</span></a>
    <p class="t-caption" style="display:flex;gap:8px;align-items:flex-start;margin-top:4px">${I("pin", "icon--16")}<span><span class="verify">${T.address}</span><br>${T.hours}</span></p>
  </div></div>
</div>`;
  body.insertAdjacentHTML("afterbegin", header);

  /* ---------- Footer ---------- */
  const footer = `
<footer class="site-footer">
  <div class="container">
    <div class="site-footer__top">
      <div class="site-footer__brand"><img src="../assets/akhi-logo-full.png" alt="Akhi Furniture"><p>${T.foot}</p></div>
      <div class="site-footer__cols">
        <details class="f-col"><summary>${T.fcols[0]}${I("chev-down")}</summary><ul>${T.fDesigns.map((d) => `<li><a href="designs.html">${d}</a></li>`).join("")}</ul></details>
        <details class="f-col"><summary>${T.fcols[1]}${I("chev-down")}</summary><ul>${T.fCompany.map(([d, h]) => `<li><a href="${h}">${d}</a></li>`).join("")}</ul></details>
        <details class="f-col"><summary>${T.fcols[2]}${I("chev-down")}</summary><ul>
          <li><a href="${FACT.wa}">${I("whatsapp")}WhatsApp</a></li><li><a href="${FACT.messenger}">${I("messenger")}Messenger</a></li><li><a href="${FACT.instagram}">${I("instagram")}Instagram</a></li>
          <li><a href="${FACT.tel}">${I("phone")}<span class="verify t-num">${FACT.phone}</span></a></li><li><a href="mailto:${FACT.email}">${I("mail")}<span class="verify">${FACT.email}</span></a></li></ul></details>
        <details class="f-col"><summary>${T.fcols[3]}${I("chev-down")}</summary><ul><li><p><span class="verify">${T.address}</span></p></li><li><p>${T.hours} <span class="verify-tag">TODO-VERIFY</span></p></li><li><a class="link" href="visit.html">${I("nav", "icon--16")}${T.dir}</a></li></ul></details>
      </div>
    </div>
    <div class="site-footer__bottom">
      <span>${T.copy} · <a href="privacy.html" style="color:inherit">${T.privacy}</a></span>
      <div class="cluster">${langSwitch}<div class="socials"><a class="btn-icon" href="#" aria-label="Facebook">${I("facebook")}</a><a class="btn-icon" href="#" aria-label="Instagram">${I("instagram")}</a><a class="btn-icon" href="#" aria-label="YouTube">${I("youtube")}</a></div></div>
    </div>
  </div>
</footer>`;
  if (!body.hasAttribute("data-no-footer")) body.insertAdjacentHTML("beforeend", footer);

  /* ---------- Sticky bar, channel chooser, toast, lightbox ---------- */
  let bar = "";
  if (sticky === "general") bar = `<a class="btn btn--secondary" href="${FACT.tel}">${I("phone")}${T.call}</a><a class="btn btn--primary" href="${FACT.wa}">${I("whatsapp")}${T.wa}</a><button class="btn-icon" type="button" data-open-sheet aria-label="${T.more}">${I("more")}</button>`;
  if (sticky === "design") bar = `<a class="btn btn--primary" href="${FACT.wa}">${I("whatsapp")}${T.ask}</a><button class="btn-icon" type="button" data-open-sheet aria-label="${T.more}">${I("more")}</button>`;
  if (bar) { body.insertAdjacentHTML("beforeend", `<div class="sticky-bar" role="region" aria-label="Contact">${bar}</div>`); body.classList.add("has-sticky"); }

  const hrefFor = { whatsapp: FACT.wa, messenger: FACT.messenger, instagram: FACT.instagram, phone: FACT.tel, pin: "visit.html" };
  body.insertAdjacentHTML("beforeend", `
<div class="overlay" data-close-sheet></div>
<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
  <div class="sheet__grab"></div>
  <div class="sheet__head"><div><h2 class="t-h2" id="sheet-title">${T.sheetT}</h2><p>${T.sheetS}</p></div><button class="btn-icon btn-icon--bare" data-close-sheet aria-label="${T.close}">${I("x")}</button></div>
  <div class="channel-list">${T.ch.map(([k, l, h], i) => `<a class="channel ${i === 0 ? "channel--rec" : ""}" href="${hrefFor[k]}" ${k === "messenger" || k === "instagram" ? "data-copy-first" : ""}><span class="channel__ico">${I(k)}</span><span><b>${l}${i === 0 ? `<span class="badge-rec">${T.rec}</span>` : ""}</b><span class="${k === "phone" ? "verify t-num" : ""}">${h}</span></span>${I("chev-right")}</a>`).join("")}</div>
</div>
<div class="toast" role="status" aria-live="polite">${I("check-circle")}<span>${T.toast}</span></div>`);

  /* ---------- Bengali pages link to Bengali pages ---------- */
  if (BN) document.querySelectorAll('a[href$=".html"]').forEach((a) => {
    const h = a.getAttribute("href");
    if (a.closest(".lang-switch") || h.includes("/") || h.endsWith("-bn.html") || h === "404.html" || h === "design-system.html") return;
    a.setAttribute("href", h.replace(/\.html$/, "-bn.html"));
  });

  /* ---------- Behaviour ---------- */
  // Footer groups are accordions on phones only
  const fq = matchMedia("(min-width: 768px)");
  const syncFooter = () => document.querySelectorAll(".f-col").forEach((d) => { d.open = fq.matches; });
  syncFooter(); fq.addEventListener("change", syncFooter);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const hdr = $(".site-header");
  const onScroll = () => hdr.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // Mobile menu
  const mm = $(".mobile-menu");
  const openMenu = (o) => { mm.classList.toggle("is-open", o); $(".menu-btn").setAttribute("aria-expanded", o); document.documentElement.style.overflow = o ? "hidden" : ""; };
  $(".menu-btn").addEventListener("click", () => openMenu(true));
  $(".menu-close").addEventListener("click", () => openMenu(false));

  // Designs dropdown
  const ddBtn = $(".nav__drop > button"), dd = $("#designs-dd");
  const openDD = (o) => { dd.classList.toggle("is-open", o); ddBtn.setAttribute("aria-expanded", o); };
  ddBtn.addEventListener("click", () => openDD(!dd.classList.contains("is-open")));
  document.addEventListener("click", (e) => { if (!e.target.closest(".nav__drop, .dropdown")) openDD(false); });

  // Channel chooser
  const sheet = $(".sheet"), ov = $(".overlay");
  const openSheet = (o) => { sheet.classList.toggle("is-open", o); ov.classList.toggle("is-open", o); };
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-open-sheet]")) { e.preventDefault(); openSheet(true); }
    if (e.target.closest("[data-close-sheet]")) openSheet(false);
  });

  // Toast + copy design code
  const toast = $(".toast"); let tt;
  const showToast = (stay) => { toast.classList.add("is-open"); clearTimeout(tt); if (!stay) tt = setTimeout(() => toast.classList.remove("is-open"), 3200); };
  window.AKHI_TOAST = showToast;
  document.addEventListener("click", (e) => {
    const c = e.target.closest(".code-chip, [data-copy-first]");
    if (!c) return;
    if (c.matches("[data-copy-first]")) e.preventDefault();
    try { navigator.clipboard && navigator.clipboard.writeText(code || c.textContent.trim()); } catch (_) {}
    if (c.classList.contains("code-chip")) { c.classList.add("is-copied"); c.querySelector("use")?.setAttribute("href", "#i-check"); }
    showToast();
  });

  // Sticky bar hides while the footer is in view
  const sb = $(".sticky-bar"), ft = $(".site-footer");
  if (sb && ft && "IntersectionObserver" in window) new IntersectionObserver(([en]) => sb.classList.toggle("is-hidden", en.isIntersecting)).observe(ft);

  // Filter chips (single select per group; mockup only)
  $$(".chips[data-group]").forEach((g) => g.addEventListener("click", (e) => {
    const c = e.target.closest(".chip"); if (!c) return;
    $$(".chip", g).forEach((x) => x.setAttribute("aria-pressed", x === c));
  }));

  // Testimonial translation toggle
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-translate]"); if (!b) return;
    const card = b.closest(".quote-card"); const on = card.classList.toggle("is-translated");
    b.querySelector("span").textContent = on ? b.dataset.hide : b.dataset.show;
  });

  // Gallery: counter, dots, thumbs, lightbox
  $$(".gallery").forEach((g) => {
    const track = $(".gallery__track", g), slides = $$(".gallery__track > *", g), n = slides.length;
    const count = $(".gallery__count", g), dots = $$(".swipe-dots i", g), thumbs = $$(".gallery__thumbs button", g);
    const set = (i) => { if (count) count.textContent = `${i + 1} / ${n}`; dots.forEach((d, k) => d.classList.toggle("is-on", k === i)); thumbs.forEach((t, k) => t.setAttribute("aria-current", k === i)); g.dataset.index = i; };
    track.addEventListener("scroll", () => set(Math.round(track.scrollLeft / track.clientWidth)), { passive: true });
    thumbs.forEach((t, k) => t.addEventListener("click", () => { track.scrollTo({ left: k * track.clientWidth, behavior: "smooth" }); set(k); }));
    slides.forEach((s, k) => s.addEventListener("click", () => openLB(g, k)));
    $(".gallery__zoom", g)?.addEventListener("click", () => openLB(g, +g.dataset.index || 0));
    set(0);
  });
  let lb;
  function openLB(g, i) {
    const slides = $$(".gallery__track > *", g), labels = slides.map((s) => s.dataset.caption || "");
    if (!lb) {
      body.insertAdjacentHTML("beforeend", `<div class="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer"><div class="lightbox__top"><span class="t-num lb-count"></span><button class="btn-icon lb-close" aria-label="${T.close}">${I("x")}</button></div><div class="lightbox__stage"><div class="ph ph--scene r-4x5 lb-img"></div><div class="lightbox__nav"><button class="btn-icon lb-prev" aria-label="Previous">${I("chev-left")}</button><button class="btn-icon lb-next" aria-label="Next">${I("chev-right")}</button></div></div><div class="lightbox__foot"><span class="lb-cap"></span><small class="lightbox__hint-touch">${T.lbHint}</small></div></div>`);
      lb = $(".lightbox");
      $(".lb-close", lb).onclick = () => { lb.classList.remove("is-open"); document.documentElement.style.overflow = ""; };
    }
    const show = (k) => { i = (k + slides.length) % slides.length; $(".lb-count", lb).textContent = `${i + 1} / ${slides.length}`; $(".lb-cap", lb).textContent = labels[i]; const im = slides[i].dataset.img; const box = $(".lb-img", lb);
      if (im) { box.innerHTML = ""; box.className = "lb-img lb-photo"; box.style.backgroundImage = `url(../assets/photos/${im}.jpg)`; }
      else box.innerHTML = `<span class="ph__label">${I("image")}${BN ? "AKHI ছবি" : "AKHI photo"} · ${labels[i]}, ${BN ? "পূর্ণ আকার" : "full size"}</span>`; };
    $(".lb-prev", lb).onclick = () => show(i - 1); $(".lb-next", lb).onclick = () => show(i + 1);
    show(i); lb.classList.add("is-open"); document.documentElement.style.overflow = "hidden";
  }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { openSheet(false); openMenu(false); openDD(false); lb?.classList.remove("is-open"); document.documentElement.style.overflow = ""; } });

  // Before / after slider
  $$(".ba").forEach((b) => { const r = $("input", b); const u = () => b.style.setProperty("--pos", r.value + "%"); r.addEventListener("input", u); u(); });

  // Swipe-row dots
  $$("[data-dots-for]").forEach((d) => {
    const row = document.getElementById(d.dataset.dotsFor); if (!row) return;
    const n = row.children.length; d.innerHTML = Array.from({ length: Math.min(n, 8) }, () => "<i></i>").join("");
    const set = () => { const k = Math.round(row.scrollLeft / (row.scrollWidth / n)); $$("i", d).forEach((x, j) => x.classList.toggle("is-on", j === k)); };
    row.addEventListener("scroll", set, { passive: true }); set();
  });

  // Design Brief helper
  $$(".brief").forEach((br) => {
    const steps = $$(".brief__step", br), bars = $$(".progress__bar i", br), txt = $(".progress__step", br);
    let cur = 0;
    const go = (k) => {
      cur = Math.max(0, Math.min(steps.length - 1, k));
      steps.forEach((s, j) => s.classList.toggle("is-current", j === cur));
      bars.forEach((b, j) => { b.classList.toggle("is-done", j < cur); b.classList.toggle("is-current", j === cur); });
      if (txt) txt.textContent = BN ? `ধাপ ${["১","২","৩","৪"][cur]} / ৪` : `Step ${cur + 1} of 4`;
      $(".brief-back", br).disabled = cur === 0;
      $(".brief-next", br).hidden = cur === steps.length - 1;
      $(".brief-send", br).hidden = cur !== steps.length - 1;
      render();
    };
    const pick = (q) => $$(`[data-q="${q}"] .chip[aria-pressed="true"]`, br).map((c) => c.textContent.trim());
    const val = (q) => ($(`[data-field="${q}"]`, br)?.value || "").trim();
    function render() {
      const f = pick("what"), w = pick("where"), r = pick("room"), m = pick("material");
      const lines = [BN ? "হ্যালো আখি ফার্নিচার! ওয়েবসাইট থেকে একটি কাস্টম অর্ডার নিয়ে কথা বলতে চাই।" : "Hello Akhi Furniture! I'd like to discuss a custom piece from your website.", ""];
      if (f.length) lines.push(`<b>${BN ? "আসবাব" : "Furniture"}:</b> ${f.join(", ")}`);
      if (w.length || r.length) lines.push(`<b>${BN ? "কোথায়" : "For"}:</b> ${[...w, ...r].join(", ")}`);
      if (val("size")) lines.push(`<b>${BN ? "মাপ" : "Size"}:</b> ${val("size")}`);
      if (m.length) lines.push(`<b>${BN ? "ম্যাটেরিয়াল" : "Material"}:</b> ${m.join(", ")}`);
      if (val("area")) lines.push(`<b>${BN ? "এলাকা" : "Area"}:</b> ${val("area")}`);
      if (val("when")) lines.push(`<b>${BN ? "কবে দরকার" : "Needed by"}:</b> ${val("when")}`);
      lines.push("", BN ? "akhifurniture.com থেকে পাঠানো" : "Sent from akhifurniture.com");
      const bub = $(".bubble", br); if (bub) bub.innerHTML = lines.join("\n") + "<small>12:04</small>";
    }
    br.addEventListener("click", (e) => {
      const c = e.target.closest(".chip"); if (c) { const multi = c.closest("[data-multi]"); if (!multi) $$(".chip", c.parentElement).forEach((x) => x.setAttribute("aria-pressed", "false")); c.setAttribute("aria-pressed", c.getAttribute("aria-pressed") !== "true"); render(); }
      if (e.target.closest(".brief-next")) go(cur + 1);
      if (e.target.closest(".brief-back")) go(cur - 1);
      if (e.target.closest(".brief-skip")) go(cur + 1);
    });
    br.addEventListener("input", render);
    br.goTo = go; go(0);
  });

  /* ---------- v1.1 Shortlist (mockup of a later feature) ----------
     Heart on each design card, a count in the header, and a drawer that sends
     the whole list in one WhatsApp message. Stored in the browser only. */
  function openShortlist() {
    const S = BN ? { t: "আপনার শর্টলিস্ট", s: "শুধু এই ব্রাউজারে সেভ থাকে। কোনো অ্যাকাউন্ট লাগে না।", note: "একটি নোট যোগ করুন", opt: "(ঐচ্ছিক)", ph: "যেমন: খাটটি ৬ × ৭ ফুট মাপে চাই", send: "শর্টলিস্টটি হোয়াটসঅ্যাপে পাঠান", hint: "মেসেজে ৩টি ডিজাইন কোড ও লিংক থাকবে।", clear: "তালিকা মুছুন", rm: "সরান", lbl: "শর্টলিস্ট, ৩টি ডিজাইন", n: "৩" }
                 : { t: "Your shortlist", s: "Saved in this browser only. No account needed.", note: "Add a note", opt: "(optional)", ph: "e.g. I need the bed in 6 × 7 ft", send: "Send my shortlist on WhatsApp", hint: "Your message lists the 3 design codes with links.", clear: "Clear list", rm: "Remove", lbl: "Shortlist, 3 designs", n: "3" };
    $$("[data-cards] .d-card").forEach((c, i) => {
      if (!c.querySelector(".d-card__heart")) c.querySelector(".d-card__media").insertAdjacentHTML("beforeend", `<span class="btn-icon d-card__heart" role="button" aria-pressed="${i < 3}" aria-label="Save">${I("heart")}</span>`);
    });
    const anchorEl = $(".header-wa");
    anchorEl.insertAdjacentHTML("beforebegin", `<button class="btn-icon btn-icon--bare shortlist-btn" type="button" aria-label="${S.lbl}">${I("heart")}<span class="count-badge">${S.n}</span></button>`);
    const items = DESIGNS.slice(0, 3).map(([c, en, bn, , , , img]) => `<li class="drawer__item"><div class="ph has-img" style="background-image:url(../assets/photos/${img}.jpg)"></div><div><b>${BN ? bn : en}</b><span class="d-card__code">${c}</span></div><button class="btn-icon btn-icon--bare" aria-label="${S.rm}">${I("x")}</button></li>`).join("");
    body.insertAdjacentHTML("beforeend", `<div class="overlay is-open" data-close-drawer></div>
<aside class="drawer is-open" role="dialog" aria-modal="true" aria-labelledby="sl-title">
  <div class="sheet__grab"></div>
  <div class="drawer__head"><div><span class="verify-tag">LATER · v1.1</span><h2 class="t-h2" id="sl-title" style="margin-top:6px">${S.t} (${S.n})</h2><p>${S.s}</p></div><button class="btn-icon btn-icon--bare" data-close-drawer aria-label="${T.close}">${I("x")}</button></div>
  <div class="drawer__body"><ul class="drawer__list">${items}</ul>
    <div class="field"><label for="sl-note">${S.note} <small>${S.opt}</small></label><textarea class="textarea" id="sl-note" placeholder="${S.ph}" style="min-height:72px"></textarea></div></div>
  <div class="drawer__foot"><a class="btn btn--primary btn--lg btn--block" href="${FACT.wa}">${I("whatsapp")}${S.send}</a><div class="row"><span class="t-caption">${S.hint}</span><button class="text-btn" style="white-space:nowrap">${S.clear}</button></div></div>
</aside>`);
    document.addEventListener("click", (e) => { if (e.target.closest("[data-close-drawer]")) $$(".drawer, .overlay[data-close-drawer]").forEach((x) => x.classList.remove("is-open")); });
  }

  /* ---------- Mockup states via ?state= ---------- */
  const st = new URLSearchParams(location.search).get("state");
  if (st === "menu") openMenu(true);
  if (st === "dropdown") openDD(true);
  if (st === "sheet") openSheet(true);
  if (st === "toast") showToast(true);
  if (st === "copied") { const c = $(".code-chip"); c?.click(); showToast(true); }
  if (st === "lightbox") { const g = $(".gallery"); if (g) openLB(g, 2); }
  if (st && st.startsWith("brief")) { const br = $(".brief"); const k = +st.slice(5) - 1; br?.goTo(k); if (br) { document.documentElement.style.scrollBehavior = "auto"; window.scrollTo(0, br.getBoundingClientRect().top + window.scrollY - hdr.offsetHeight - 16); } }
  if (st === "shortlist") openShortlist();
  if (st === "hover") $$(".d-card").slice(0, 1).forEach((c) => c.classList.add("is-hover"));
})();
