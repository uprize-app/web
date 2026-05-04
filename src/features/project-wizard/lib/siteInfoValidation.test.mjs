import assert from "node:assert/strict";
import test from "node:test";

import { validateSiteInfoForNext } from "./siteInfoValidation.ts";

const completeSiteInfo = {
  areaSqm: 3305.8,
  zoning: "일반상업지역",
  bcr: 40,
  far: 750,
  floorsAbove: 20,
  floorsBelow: 0,
  use: "hotel",
};

test("accepts complete site info and allows zero basement floors", () => {
  assert.deepEqual(validateSiteInfoForNext(completeSiteInfo), { ok: true });
});

test("requires site area", () => {
  assert.deepEqual(validateSiteInfoForNext({ ...completeSiteInfo, areaSqm: 0 }), {
    ok: false,
    reason: "대지면적을 입력해주세요.",
  });
});

test("requires zoning", () => {
  assert.deepEqual(validateSiteInfoForNext({ ...completeSiteInfo, zoning: "" }), {
    ok: false,
    reason: "용도지역을 선택해주세요.",
  });
});

test("requires bcr, far, and above-ground floors", () => {
  assert.deepEqual(validateSiteInfoForNext({ ...completeSiteInfo, bcr: 0 }), {
    ok: false,
    reason: "건폐율을 입력해주세요.",
  });
  assert.deepEqual(validateSiteInfoForNext({ ...completeSiteInfo, far: 0 }), {
    ok: false,
    reason: "용적률을 입력해주세요.",
  });
  assert.deepEqual(
    validateSiteInfoForNext({ ...completeSiteInfo, floorsAbove: 0 }),
    {
      ok: false,
      reason: "지상층을 입력해주세요.",
    },
  );
});
