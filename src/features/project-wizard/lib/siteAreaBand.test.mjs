import assert from "node:assert/strict";
import test from "node:test";

import {
  formatPyeongRange,
  getAreaBandViolation,
  pyeongToSqm,
  sqmToPyeong,
} from "./siteAreaBand.ts";

test("converts pyeong and square meters without drifting visible input values", () => {
  assert.equal(sqmToPyeong(pyeongToSqm(9000)), 9000);
});

test("formats site image ranges with practical lower and upper bounds", () => {
  assert.equal(formatPyeongRange("small"), "100~3,000평");
  assert.equal(formatPyeongRange("medium"), "3,001~24,999평");
  assert.equal(formatPyeongRange("large"), "25,000~99,999평");
});

test("asks users to choose large when medium site image area is 25,000 pyeong or more", () => {
  assert.deepEqual(getAreaBandViolation("medium", 25000), {
    kind: "too-large",
    message: "25,000평 이상 부지는 대형 현장 이미지를 고르세요.",
  });
});

test("asks users to choose small when medium site image area is too small", () => {
  assert.deepEqual(getAreaBandViolation("medium", 3000), {
    kind: "too-small",
    message: "3,000평 이하는 소형 현장 이미지를 고르세요.",
  });
});

test("blocks areas below the minimum supported small site image area", () => {
  assert.deepEqual(getAreaBandViolation("small", 99), {
    kind: "too-small",
    message: "최소 100평 이상이어야 합니다.",
  });
});

test("blocks large site image areas at 100,000 pyeong or more", () => {
  assert.deepEqual(getAreaBandViolation("large", 100000), {
    kind: "too-large",
    message: "최대 평수를 넘었습니다. 100,000평 이상은 아직 지원하지 않습니다.",
  });
});
