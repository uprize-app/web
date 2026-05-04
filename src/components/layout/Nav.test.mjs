import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("does not show wizard cancel or temporary-save header actions", async () => {
  const source = await readFile(new URL("./Nav.tsx", import.meta.url), "utf8");

  assert.equal(source.includes('pathname.startsWith("/studio")'), false);
  assert.equal(source.includes('pathname === "/studio/new"'), false);
  assert.equal(source.includes("취소"), false);
  assert.equal(source.includes("임시저장"), false);
});
