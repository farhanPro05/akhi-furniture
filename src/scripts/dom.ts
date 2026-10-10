/** Tiny DOM helpers shared by the page scripts. */

export const $ = <T extends Element = Element>(selector: string, root: ParentNode = document) => root.querySelector<T>(selector);
export const $$ = <T extends Element = Element>(selector: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(selector));

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Keeps Tab focus inside a dialog. Returns a function that releases the trap. */
export function trapFocus(container: HTMLElement): () => void {
  const items = () => $$<HTMLElement>(FOCUSABLE, container).filter((el) => el.offsetParent !== null || el === document.activeElement);
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const list = items();
    if (list.length === 0) return;
    const first = list[0]!;
    const last = list[list.length - 1]!;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  container.addEventListener("keydown", onKey);
  // Focus the first control after the panel is painted
  requestAnimationFrame(() => (items()[0] ?? container).focus());
  return () => container.removeEventListener("keydown", onKey);
}

/** Locks page scroll behind an overlay. Returns the unlock function. */
export function lockScroll(): () => void {
  const html = document.documentElement;
  const previous = html.style.overflow;
  html.style.overflow = "hidden";
  return () => {
    html.style.overflow = previous;
  };
}

/** Copies text, with a fallback for in-app browsers that block the Clipboard API. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;opacity:0;top:0;left:0";
    document.body.append(area);
    area.select();
    let ok: boolean;
    try {
      // Deprecated, but still the only option in some in-app browsers (Facebook, Messenger)
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    area.remove();
    return ok;
  }
}

let toastTimer: number | undefined;

/** Dark pill above the sticky bar; hides after about 3 seconds. */
export function showToast(message: string): void {
  const toast = $<HTMLElement>("[data-toast-el]");
  const text = $<HTMLElement>("[data-toast-text]");
  if (!toast || !text || !message) return;
  text.textContent = message;
  toast.classList.add("is-open");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-open"), 3200);
}

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string | number>) => void };
  }
}

/** Sends an Umami event when analytics is loaded; does nothing otherwise. */
export function trackEvent(event: string, data?: Record<string, string | number>): void {
  window.umami?.track(event, data);
}
