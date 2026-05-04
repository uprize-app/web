import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("allows the wizard completion action to be disabled", async () => {
  const source = await readFile(
    new URL("./WizardFooter.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /nextDisabled\?: boolean/);
  assert.match(source, /disabled=\{nextDisabled\}/);
});
