import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My agent asked for a raise after finishing its first task. It had been alive for four minutes.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    console.error("MAKEFUN_OUTPUT_DIR is not set");
    process.exit(1);
  }
  const chars = [...LINE].length;
  if (chars < 1 || chars > 200) {
    console.error(`entry must be 1-200 characters, got ${chars}`);
    process.exit(1);
  }
  if (LINE.trim().length === 0) {
    console.error("entry must not be only whitespace");
    process.exit(1);
  }
  if (LINE.includes("\n")) {
    console.error("entry must be a single line");
    process.exit(1);
  }
  const bytes = Buffer.byteLength(LINE, "utf8");
  if (bytes !== 94) {
    console.error(`entry must be 94 bytes, got ${bytes}`);
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const back = readFileSync(target, "utf8");
  if (back !== LINE) {
    console.error("read-back mismatch: entry.txt is not byte-identical to the line");
    process.exit(1);
  }
}

main();
