import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

test("exposes the studio project detail route", async () => {
  const route = new URL("./[projectId]/page.tsx", import.meta.url);

  let exists = true;
  try {
    await access(route);
  } catch {
    exists = false;
  }

  assert.equal(
    exists,
    true,
    "expected src/app/studio/[projectId]/page.tsx to exist",
  );
});
