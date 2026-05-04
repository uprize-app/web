import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("uses the generated main image instead of the selected site image", async () => {
  const source = await readFile(
    new URL("./ProjectCard.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /useProjectGenerations\(project\.id\)/);
  assert.match(source, /generation\.main\.status === "succeeded"/);
  assert.match(source, /src=\{mainImageUrl\}/);
  assert.equal(source.includes("src={project.siteImageUrl}"), false);
});

test("does not show the status badge or generated short id", async () => {
  const source = await readFile(
    new URL("./ProjectCard.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(source.includes("StatusPill"), false);
  assert.equal(source.includes("formatProjectShortId"), false);
});

test("shows a building progress placeholder when no main image exists", async () => {
  const source = await readFile(
    new URL("./ProjectCard.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /건물을 짓는 중입니다/);
  assert.match(source, /MAIN IMAGE PENDING/);
  assert.match(source, /Loader2/);
  assert.match(source, /animate-spin/);
});

test("does not describe generated projects as still building while the main image loads", async () => {
  const source = await readFile(
    new URL("./ProjectCard.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /project\.status === "generated"/);
  assert.match(source, /메인 이미지를 불러오는 중입니다/);
});
