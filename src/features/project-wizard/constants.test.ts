import { describe, expect, it } from "vitest";
import { BUILDING_USES, HOTEL_STYLES, SURROUNDING_TAGS, ZONE_TYPES } from "./constants";

describe("project-wizard constants", () => {
  it("호텔 스타일은 기획서 기준 6종", () => {
    expect(HOTEL_STYLES).toHaveLength(6);
    const ids = HOTEL_STYLES.map((s) => s.id);
    expect(ids).toEqual(["iconic", "minimal", "biophilic", "futurist", "heritage", "resort"]);
  });

  it("MVP 에서는 호텔만 enabled", () => {
    const enabled = BUILDING_USES.filter((u) => u.enabled);
    expect(enabled).toHaveLength(1);
    expect(enabled[0]?.id).toBe("hotel");
  });

  it("주변환경/용도지역 상수는 비어있지 않다", () => {
    expect(SURROUNDING_TAGS.length).toBeGreaterThan(0);
    expect(ZONE_TYPES.length).toBeGreaterThan(0);
  });
});
