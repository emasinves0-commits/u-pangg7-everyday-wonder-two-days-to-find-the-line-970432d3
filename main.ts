import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_FILE_NAME = "entry.txt";
const MAX_LENGTH = 200;

// The turn-signal click is for the bird, not the driver: a non-human witness
// to human machinery. The punch lands in the last words ("flinches each time").
const ENTRY =
  "The bus's turn signal clicks not for the driver, but for a bird perched on a wire who flinches each time.";

// Throws unless the text is 1-200 characters, not only whitespace, and has no
// trailing newline (the contest requires the bytes written to be exact).
function guard(text: string): string {
  if (text.length < 1 || text.length > MAX_LENGTH) {
    throw new Error(`entry must be 1-${MAX_LENGTH} characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/[\r\n]$/.test(text)) {
    throw new Error("entry must not end with a newline");
  }
  return text;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, OUTPUT_FILE_NAME), guard(ENTRY), "utf8");
