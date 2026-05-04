import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("shows step validation errors as a top-right auto-dismiss toast", async () => {
  const source = await readFile(
    new URL("./NewProjectWizard.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(source.includes("submitError"), false);
  assert.equal(source.includes("mt-6 rounded-md border border-burn-200 bg-burn-50"), false);
  assert.match(source, /const TOAST_DISMISS_MS = 5000;/);
  assert.match(
    source,
    /setTimeout\(\s*\(\) => setToastMessage\(null\),\s*TOAST_DISMISS_MS,\s*\)/,
  );
  assert.match(source, /className="[^"]*fixed[^"]*top-20[^"]*sm:right-6[^"]*"/s);
});

test("disables the bottom completion action on step five", async () => {
  const source = await readFile(
    new URL("./NewProjectWizard.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /nextDisabled=\{step === 5\}/);
});
