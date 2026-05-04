import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("does not render internal generation and metadata panels", async () => {
  const source = await readFile(
    new URL("./ProjectDetailView.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(source.includes('Panel title="생성 패키지"'), false);
  assert.equal(source.includes('Panel title="메타"'), false);
  assert.equal(source.includes('label="프로젝트 ID"'), false);
});

test("keeps only the PDF download action on project detail", async () => {
  const source = await readFile(
    new URL("./ProjectDetailView.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(source.includes('href="/studio/new"'), false);
  assert.equal(source.includes(">새 프로젝트<"), false);
  assert.equal(source.includes("PDF 다운로드"), true);
  assert.match(source, /try \{\s*const result = await exportPdf\.mutateAsync\(activeGeneration\.id\)/s);
  assert.match(source, /catch \{\s*\/\/ useMutation error state renders the message below\./);
});

test("does not show project status or short id in the customer header", async () => {
  const source = await readFile(
    new URL("./ProjectDetailView.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(source.includes("<StatusTag"), false);
  assert.equal(source.includes("formatProjectShortId"), false);
});

test("polls the latest generation and shows progress on project detail", async () => {
  const source = await readFile(
    new URL("./ProjectDetailView.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /useGeneration\(latestGeneration\?\.id \?\? null\)/);
  assert.match(source, /const activeGeneration = generationQuery\.data \?\? latestGeneration/);
  assert.match(source, /countSucceededSlides\(activeGeneration\)/);
  assert.match(source, /calculateGenerationProgressPercent\(activeGeneration\)/);
  assert.match(source, /progressPercent/);
  assert.match(source, /formatGenerationStatus\(activeGeneration\.status\)/);
  assert.match(source, /생성 상황/);
});
