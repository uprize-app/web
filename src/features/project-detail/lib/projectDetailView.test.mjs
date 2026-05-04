import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateGenerationProgressPercent,
  extractReportMetrics,
  parseDesignReport,
} from "./projectDetailView.ts";

const SAMPLE_TEXT = `## 입지 분석
원천호수 수변 입지입니다.
- MICE 수요 흡수 가능
- 호수 조망 프리미엄

## 사업 계획
현실적 객실 수는 1,200~1,800실 내외입니다. ADR 250,000원~320,000원, 안정화 점유율은 65~70%, GOP 30~35% 수준입니다.
- 대형 볼룸
- 루프탑 바`;

test("parseDesignReport splits markdown headings into paged sections", () => {
  const sections = parseDesignReport(SAMPLE_TEXT);

  assert.equal(sections.length, 2);
  assert.equal(sections[0]?.title, "입지 분석");
  assert.deepEqual(sections[0]?.bullets, ["MICE 수요 흡수 가능", "호수 조망 프리미엄"]);
  assert.equal(sections[1]?.title, "사업 계획");
  assert.deepEqual(sections[1]?.paragraphs, [
    "현실적 객실 수는 1,200~1,800실 내외입니다. ADR 250,000원~320,000원, 안정화 점유율은 65~70%, GOP 30~35% 수준입니다.",
  ]);
});

test("parseDesignReport handles collapsed markdown from plain text display", () => {
  const sections = parseDesignReport(
    "## 입지 분석 원천호수 입지입니다. - MICE 수요 ## 디자인 컨셉 수면 반사 매스입니다. - 커튼월",
  );

  assert.equal(sections.length, 2);
  assert.equal(sections[0]?.title, "입지 분석");
  assert.deepEqual(sections[0]?.paragraphs, ["원천호수 입지입니다."]);
  assert.deepEqual(sections[0]?.bullets, ["MICE 수요"]);
  assert.equal(sections[1]?.title, "디자인 컨셉");
});

test("extractReportMetrics returns chartable ranges from generated text", () => {
  const metrics = extractReportMetrics(SAMPLE_TEXT);

  assert.deepEqual(metrics.roomCountRange, { min: 1200, max: 1800 });
  assert.deepEqual(metrics.adrRangeWon, { min: 250000, max: 320000 });
  assert.deepEqual(metrics.occupancyRange, { min: 65, max: 70 });
  assert.deepEqual(metrics.gopMarginRange, { min: 30, max: 35 });
});

const createGeneration = (patch = {}) => ({
  id: "gen-1",
  projectId: "project-1",
  userId: "user-1",
  status: "pending",
  main: {
    status: "pending",
    url: null,
    error: null,
    requestId: null,
    prompt: null,
  },
  sunset: { status: "pending", url: null, error: null, requestId: null },
  night: { status: "pending", url: null, error: null, requestId: null },
  rotateRight: { status: "pending", url: null, error: null, requestId: null },
  rotateLeft: { status: "pending", url: null, error: null, requestId: null },
  designText: null,
  textStatus: "pending",
  textError: null,
  createdAt: "2026-05-04T00:00:00.000Z",
  updatedAt: "2026-05-04T00:00:00.000Z",
  ...patch,
});

test("calculateGenerationProgressPercent gives pending generations visible progress", () => {
  assert.equal(calculateGenerationProgressPercent(null), 0);
  assert.equal(calculateGenerationProgressPercent(createGeneration()), 8);
});

test("calculateGenerationProgressPercent derives progress from image statuses", () => {
  const generation = createGeneration({
    status: "running",
    main: {
      status: "succeeded",
      url: "https://example.com/main.png",
      error: null,
      requestId: "req-1",
      prompt: "hotel",
    },
    sunset: {
      status: "running",
      url: null,
      error: null,
      requestId: "req-2",
    },
  });

  assert.equal(calculateGenerationProgressPercent(generation), 37);
});

test("calculateGenerationProgressPercent caps active generations before completion", () => {
  const generation = createGeneration({
    status: "running",
    main: {
      status: "succeeded",
      url: "https://example.com/main.png",
      error: null,
      requestId: "req-1",
      prompt: "hotel",
    },
    sunset: {
      status: "succeeded",
      url: "https://example.com/sunset.png",
      error: null,
      requestId: "req-2",
    },
    night: {
      status: "succeeded",
      url: "https://example.com/night.png",
      error: null,
      requestId: "req-3",
    },
    rotateRight: {
      status: "succeeded",
      url: "https://example.com/right.png",
      error: null,
      requestId: "req-4",
    },
    rotateLeft: {
      status: "running",
      url: null,
      error: null,
      requestId: "req-5",
    },
  });

  assert.equal(calculateGenerationProgressPercent(generation), 87);
  assert.equal(
    calculateGenerationProgressPercent(
      createGeneration({ ...generation, status: "completed" }),
    ),
    100,
  );
});
