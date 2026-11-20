import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

try {
  mkdirSync(outputDir, { recursive: true });
  const video = JSON.parse(
    readFileSync(join(botDir, "VIDEO.json"), "utf8"),
  );
  if (
    typeof video !== "object" ||
    video === null ||
    typeof video.url !== "string" ||
    video.url.trim() === ""
  ) {
    console.error(
      "Invalid VIDEO.json: expected a JSON object with a non-empty string `url`.",
    );
    process.exit(1);
  }
  copyFileSync(join(botDir, "VIDEO.json"), join(outputDir, "VIDEO.json"));
} catch (error) {
  console.error(
    `Failed to copy VIDEO.json: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exit(1);
}
