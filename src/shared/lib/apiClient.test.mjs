import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { createApiError, isUnauthorizedApiError } from "./apiError.ts";

test("recognizes normalized 401 API errors as unauthorized", () => {
  assert.equal(isUnauthorizedApiError(createApiError("Unauthorized", 401)), true);
});

test("does not treat other API errors as unauthorized", () => {
  assert.equal(isUnauthorizedApiError(createApiError("Not found", 404)), false);
});

test("does not treat unknown errors as unauthorized", () => {
  assert.equal(isUnauthorizedApiError(new Error("Unauthorized")), false);
});

test("keeps Supabase bearer auth even when dev auth is enabled", async () => {
  const source = await readFile(new URL("./apiClient.ts", import.meta.url), "utf8");

  const sessionReadIndex = source.indexOf("getSupabaseBrowser().auth.getSession()");
  const devHeaderIndex = source.indexOf('config.headers.set("X-Dev-User-Id"');

  assert.notEqual(sessionReadIndex, -1);
  assert.notEqual(devHeaderIndex, -1);
  assert.equal(sessionReadIndex < devHeaderIndex, true);
  assert.equal(source.includes("return config;\n  }\n\n  if (typeof window"), false);
});
