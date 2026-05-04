import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("keeps project filters to all, in progress, and completed", async () => {
  const toolbarSource = await readFile(
    new URL("./ProjectsToolbar.tsx", import.meta.url),
    "utf8",
  );
  const viewSource = await readFile(
    new URL("./ProjectsView.tsx", import.meta.url),
    "utf8",
  );

  assert.match(toolbarSource, /all: "전체"/);
  assert.match(toolbarSource, /work: "생성중"/);
  assert.match(toolbarSource, /done: "완료"/);
  assert.equal(toolbarSource.includes("초안"), false);
  assert.equal(toolbarSource.includes('"draft"'), false);
  assert.equal(viewSource.includes("draft:"), false);
});

test("uses generation state when counting and filtering project status", async () => {
  const source = await readFile(
    new URL("./ProjectsView.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /useQueries/);
  assert.match(source, /fetchProjectGenerations/);
  assert.match(source, /resolveProjectListStatus/);
  assert.match(source, /generationByProjectId\.get\(p\.id\)/);
});

test("removes duplicate header actions from the projects page", async () => {
  const source = await readFile(
    new URL("./ProjectsView.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(source.includes("최근 수정순"), false);
  assert.equal(source.includes("신규 프로젝트"), false);
  assert.equal(source.includes('href="/studio/new"'), false);
});

test("removes the summary stats band from the projects page", async () => {
  const source = await readFile(
    new URL("./ProjectsView.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(source.includes("전체 프로젝트"), false);
  assert.equal(source.includes("생성 완료"), false);
  assert.equal(source.includes("총 합성 면적"), false);
  assert.equal(source.includes("이번 달 신규"), false);
  assert.equal(source.includes("const Stat ="), false);
});
