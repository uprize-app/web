import assert from "node:assert/strict";
import test from "node:test";

import {
  getZoningDefaults,
  getZoningLimitWarning,
  getZoningRule,
} from "./zoningRules.ts";

test("returns midpoint defaults when zoning is selected", () => {
  assert.deepEqual(getZoningDefaults("일반상업지역"), {
    bcr: 40,
    far: 750,
  });
});

test("keeps zoning limits available for selected zoning", () => {
  assert.deepEqual(getZoningRule("제2종일반주거지역"), {
    zoning: "제2종일반주거지역",
    bcrMax: 60,
    farMin: 100,
    farMax: 250,
  });
});

test("warns when bcr exceeds zoning max but does not define blocking behavior", () => {
  assert.equal(
    getZoningLimitWarning("일반상업지역", "bcr", 81),
    "일반상업지역의 건폐율 법정 상한은 80%입니다. 초과 입력은 가능하지만 인허가 검토가 필요합니다.",
  );
});

test("warns when far exceeds zoning max", () => {
  assert.equal(
    getZoningLimitWarning("일반상업지역", "far", 1301),
    "일반상업지역의 용적률 법정 상한은 1,300%입니다. 초과 입력은 가능하지만 인허가 검토가 필요합니다.",
  );
});

test("does not warn for values within zoning max", () => {
  assert.equal(getZoningLimitWarning("일반상업지역", "bcr", 80), null);
  assert.equal(getZoningLimitWarning("일반상업지역", "far", 1300), null);
});
