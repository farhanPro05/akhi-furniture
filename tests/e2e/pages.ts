import fs from "node:fs";
import path from "node:path";

/** Every built page under /en/ and /bn/, as site paths ("/en/designs/"). */
export function builtPages(): string[] {
  const dist = path.resolve("dist");
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name === "index.html") out.push("/" + path.relative(dist, dir).split(path.sep).join("/") + "/");
    }
  };
  for (const lang of ["en", "bn"]) walk(path.join(dist, lang));
  return out.sort();
}

/** Build Plan M12 test widths, with a matching height. */
export const WIDTHS = [
  [360, 780],
  [390, 844],
  [430, 932],
  [768, 1024],
  [834, 1194],
  [1024, 768],
  [1280, 800],
  [1440, 900],
  [1920, 1080],
] as const;
