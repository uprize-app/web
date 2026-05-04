import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("uses a five-second auto-dismiss timeout for site info toasts", async () => {
  const source = await readFile(
    new URL("./Step3SiteInfo.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(source.includes("3200"), false);
  assert.match(source, /const TOAST_DISMISS_MS = 5000;/);
  assert.match(
    source,
    /setTimeout\(\s*\(\) => setToastMessage\(null\),\s*TOAST_DISMISS_MS,\s*\)/,
  );
});
