import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Title: "The Bird Flinches"
const ENTRY =
  "The bus's turn signal clicks not for the driver, but for a bird perched on a wire who flinches each time.";

const MAX_LENGTH = 200;
const OUTPUT_FILE_NAME = "entry.txt";

function validate(text: string): void {
  if (text.length < 1 || text.length > MAX_LENGTH) {
    throw new Error(`Entry must be 1-${MAX_LENGTH} characters, got ${text.length}.`);
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
  if (/[\r\n]$/.test(text)) {
    throw new Error("Entry must not end with a newline.");
  }
}

function isValid(text: string): boolean {
  try {
    validate(text);
    return true;
  } catch {
    return false;
  }
}

// Returns true when every case behaves as expected.
function selfTest(): boolean {
  const cases: { name: string; text: string; shouldPass: boolean }[] = [
    { name: "entry", text: ENTRY, shouldPass: true },
    { name: "empty", text: "", shouldPass: false },
    { name: "whitespace-only", text: "   \t ", shouldPass: false },
    { name: "201 chars", text: "a".repeat(201), shouldPass: false },
    { name: "trailing newline", text: ENTRY + "\n", shouldPass: false },
  ];
  let allOk = true;
  for (const c of cases) {
    const ok = isValid(c.text) === c.shouldPass;
    allOk = allOk && ok;
    console.log(`${ok ? "PASS" : "FAIL"} ${c.name}`);
  }
  return allOk;
}

function main(): void {
  if (process.argv.includes("--self-test")) {
    process.exit(selfTest() ? 0 : 1);
  }
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, OUTPUT_FILE_NAME);
  writeFileSync(outPath, ENTRY, "utf8");
  console.error(`wrote ${ENTRY.length} chars to ${outPath}`);
}

main();
