import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { build } from "esbuild";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = resolve(projectRoot, "extension", "vendor");

await mkdir(outputDirectory, { recursive: true });
await build({
  entryPoints: [resolve(projectRoot, "tools", "webawesome-entry.js")],
  bundle: true,
  outdir: outputDirectory,
  entryNames: "webawesome",
  format: "esm",
  target: ["chrome114"],
  minify: true,
  sourcemap: false,
  legalComments: "inline",
});

await copyFile(
  resolve(projectRoot, "node_modules", "@awesome.me", "webawesome", "LICENSE.md"),
  resolve(outputDirectory, "LICENSE-Web-Awesome.md"),
);
