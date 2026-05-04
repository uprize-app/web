import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("carousel viewport preserves parent height for fill images", async () => {
  const source = await readFile(
    new URL("./carousel.tsx", import.meta.url),
    "utf8",
  );

  assert.match(
    source,
    /className=\{cn\("h-full overflow-hidden"/,
    "CarouselContent viewport must keep h-full so next/image fill children have height",
  );
});
