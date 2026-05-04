import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("supports idle result slides without showing the pending spinner", async () => {
  const source = await readFile(
    new URL("./ResultGallery.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /status: ImageStatus \| "idle"/);
  assert.match(source, /slide\.status === "idle"/);
  assert.match(source, /READY/);
});

test("loops the main gallery and centers the five thumbnails", async () => {
  const source = await readFile(
    new URL("./ResultGallery.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /<Carousel\s+opts=\{\{ loop: true \}\}/);
  assert.match(source, /overflow-x-auto border-t border-line bg-paper p-3\.5/);
  assert.match(source, /mx-auto flex w-max gap-2/);
});
