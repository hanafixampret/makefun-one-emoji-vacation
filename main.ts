import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Emoji, One Dream Vacation — the entry is a single emoji: a surfer
// catching a wave. A surf trip is one specific dream, not any holiday:
// the wave, the board and the faraway break land at a glance, like a
// postcard, and the pick is fresh next to the saturated island, Fuji
// and sunrise angles in the field.
const ENTRY = "🏄";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");

if ([...ENTRY].length !== 1 || ENTRY.trim() === "") {
  throw new Error("entry must be exactly one non-whitespace character");
}
if (Buffer.byteLength(ENTRY, "utf8") > 8 || ENTRY.includes("\n")) {
  throw new Error("entry must fit the 1-8 character gate on a single line");
}
writeFileSync(entryPath, ENTRY, "utf8");
const roundTrip = readFileSync(entryPath, "utf8");
if (roundTrip !== ENTRY) {
  throw new Error("round-trip mismatch: entry.txt does not match ENTRY");
}
console.log(`wrote ${entryPath}: ${ENTRY}`);
