import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("matches the project card height model instead of using a fixed standalone height", async () => {
  const source = await readFile(
    new URL("./NewProjectCard.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /aspect-\[4\/3\]/);
  assert.match(source, /px-\[22px\] pb-\[22px\] pt-5/);
  assert.equal(source.includes("h-[360px]"), false);
  assert.equal(source.includes("md:h-[390px]"), false);
  assert.equal(source.includes("lg:h-[420px]"), false);
  assert.equal(source.includes("min-h-[360px]"), false);
  assert.equal(source.includes("min-h-full"), false);
});
