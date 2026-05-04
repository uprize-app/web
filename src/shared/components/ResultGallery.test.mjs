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
  assert.match(
    source,
    /overflow-x-auto border-t border-line bg-paper p-2\.5 sm:p-3\.5/,
  );
  assert.match(source, /mx-auto flex w-max gap-2/);
});

test("uses mobile-safe gallery image and thumbnail sizing", async () => {
  const source = await readFile(
    new URL("./ResultGallery.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /className="object-contain"/);
  assert.match(source, /aspect-square w-full flex-none/);
  assert.match(source, /w-\[72px\].*sm:w-\[92px\]/s);
  assert.match(source, /max-w-\[calc\(100%-7rem\)\] truncate/);
  assert.match(source, /left-2 h-10 w-10 sm:left-4 sm:h-11 sm:w-11/);
});
