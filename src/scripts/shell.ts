/**
 * Shared page behaviour (design/README §7). Small, dependency-free, progressive:
 * every link still works without JavaScript.
 */
import { $, $$, copyText, lockScroll, showToast, trapFocus } from "./dom";

document.documentElement.classList.add("js");

/* Header hairline after 8px of scroll ------------------------------------- */
const header = $<HTMLElement>("[data-header]");
if (header) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* Dialogs: mobile menu and channel chooser -------------------------------- */
type Dialog = { open: (opener?: HTMLElement | null) => void; close: () => void; isOpen: () => boolean };

function makeDialog(panel: HTMLElement, extra: HTMLElement[] = [], onToggle?: (open: boolean) => void): Dialog {
  let release: (() => void) | undefined;
  let unlock: (() => void) | undefined;
  let returnTo: HTMLElement | null = null;
  const isOpen = () => panel.classList.contains("is-open");
  return {
    isOpen,
    open(opener) {
      if (isOpen()) return;
      returnTo = opener ?? (document.activeElement as HTMLElement | null);
      for (const el of [panel, ...extra]) {
        el.hidden = false;
        el.classList.add("is-open");
      }
      unlock = lockScroll();
      release = trapFocus(panel);
      onToggle?.(true);
    },
    close() {
      if (!isOpen()) return;
      for (const el of [panel, ...extra]) {
        el.classList.remove("is-open");
        el.hidden = true;
      }
      release?.();
      unlock?.();
      onToggle?.(false);
      returnTo?.focus();
    },
  };
}

const dialogs: Dialog[] = [];

const menu = $<HTMLElement>("[data-menu]");
if (menu) {
  const buttons = $$<HTMLButtonElement>("[data-menu-open]");
  const dialog = makeDialog(menu, [], (open) => buttons.forEach((b) => b.setAttribute("aria-expanded", String(open))));
  dialogs.push(dialog);
  buttons.forEach((b) => b.addEventListener("click", () => dialog.open(b)));
  $$("[data-menu-close]").forEach((b) => b.addEventListener("click", () => dialog.close()));
  // Close when a link inside the menu is followed to an anchor on this page
  menu.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest("a")) dialog.close();
  });
  // The menu is for narrow screens only; close it if the window grows past the nav breakpoint
  matchMedia("(min-width: 1200px)").addEventListener("change", (mq) => mq.matches && dialog.close());
}

const sheet = $<HTMLElement>("[data-sheet]");
const overlay = $<HTMLElement>(".overlay[data-sheet-close]");
if (sheet && overlay) {
  const dialog = makeDialog(sheet, [overlay]);
  dialogs.push(dialog);
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const opener = target.closest<HTMLElement>("[data-sheet-open]");
    if (opener) {
      e.preventDefault();
      dialog.open(opener);
    } else if (target.closest("[data-sheet-close]")) dialog.close();
  });
}

/* Designs dropdown: opens on click (touch laptops, keyboards), closes outside or on Escape */
const ddToggle = $<HTMLButtonElement>("[data-dropdown-toggle]");
const dropdown = $<HTMLElement>("[data-dropdown]");
const setDropdown = (open: boolean) => {
  if (!ddToggle || !dropdown) return;
  dropdown.classList.toggle("is-open", open);
  ddToggle.setAttribute("aria-expanded", String(open));
};
ddToggle?.addEventListener("click", () => setDropdown(!dropdown?.classList.contains("is-open")));
document.addEventListener("click", (e) => {
  if (!(e.target as HTMLElement).closest(".nav__drop, [data-dropdown]")) setDropdown(false);
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (dropdown?.classList.contains("is-open")) {
    setDropdown(false);
    ddToggle?.focus();
  }
  dialogs.forEach((d) => d.isOpen() && d.close());
});

/* Footer: accordions on phones, open columns from 768px ------------------ */
const wide = matchMedia("(min-width: 768px)");
const footerCols = $$<HTMLDetailsElement>(".f-col");
const syncFooter = () => footerCols.forEach((col) => (col.open = wide.matches));
syncFooter();
wide.addEventListener("change", syncFooter);
footerCols.forEach((col) =>
  col.querySelector("summary")?.addEventListener("click", (e) => {
    if (wide.matches) e.preventDefault();
  }),
);

/* Sticky contact bar slides away while the footer is on screen ------------- */
const bar = $<HTMLElement>("[data-sticky-bar]");
const footer = $<HTMLElement>("[data-footer]");
if (bar && footer && "IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => bar.classList.toggle("is-hidden", Boolean(entry?.isIntersecting))).observe(footer);
}

/* Copy the design code first, then open Messenger / Instagram (Master Plan §8.2) */
document.addEventListener("click", async (e) => {
  const link = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-copy]");
  if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  const ok = await copyText(link.dataset.copy ?? "");
  showToast(ok ? (link.dataset.toast ?? "") : (link.dataset.toastFail ?? link.dataset.toast ?? ""));
  window.setTimeout(() => (window.location.href = link.href), 900);
});

/* Design code chip: tap copies the code; the icon becomes a check -------- */
document.addEventListener("click", async (e) => {
  const chip = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-copy-code]");
  if (!chip) return;
  const ok = await copyText(chip.dataset.copyCode ?? "");
  chip.classList.toggle("is-copied", ok);
  showToast(ok ? (chip.dataset.toast ?? "") : (chip.dataset.toastFail ?? ""));
});

/* Swipe rows: dots follow the scroll position (phones) ------------------- */
$$<HTMLElement>("[data-dots-for]").forEach((dots) => {
  const row = document.getElementById(dots.dataset.dotsFor ?? "");
  if (!row) return;
  const count = Math.min(row.children.length, 8);
  dots.replaceChildren(...Array.from({ length: count }, () => document.createElement("i")));
  const update = () => {
    const step = row.scrollWidth / row.children.length;
    const index = Math.min(count - 1, Math.round(row.scrollLeft / step));
    Array.from(dots.children).forEach((dot, i) => dot.classList.toggle("is-on", i === index));
  };
  row.addEventListener("scroll", update, { passive: true });
  update();
});

/* Reviews: original language first, translation on tap ------------------- */
document.addEventListener("click", (e) => {
  const button = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-translate]");
  if (!button) return;
  const card = button.closest(".quote-card");
  const on = card?.classList.toggle("is-translated") ?? false;
  button.setAttribute("aria-expanded", String(on));
  const label = button.querySelector("span");
  if (label) label.textContent = (on ? button.dataset.hide : button.dataset.show) ?? "";
});
