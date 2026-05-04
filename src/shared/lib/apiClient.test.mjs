import assert from "node:assert/strict";
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
