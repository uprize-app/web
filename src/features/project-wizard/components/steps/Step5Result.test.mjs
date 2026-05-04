import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("starts building and moves result review to the project detail page", async () => {
  const source = await readFile(
    new URL("./Step5Result.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /useRouter/);
  assert.match(source, /await startGen\.mutateAsync\(pid\)/);
  assert.match(source, /router\.push\(`\/studio\/\$\{pid\}`\)/);
  assert.equal(source.includes("AI 생성 시작"), false);
  assert.equal(source.includes("<ResultGallery"), false);
  assert.equal(source.includes("useGeneration("), false);
  assert.equal(source.includes("useExportGenerationPdf"), false);
  assert.equal(source.includes("완료 후 다운로드 가능"), false);
  assert.match(source, /건물 지어보기/);
  assert.match(source, /프로젝트 화면에서 생성 상황과 결과를 확인할 수 있습니다/);
});

test("does not render the step five project summary card", async () => {
  const source = await readFile(
    new URL("./Step5Result.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(source.includes(">요약<"), false);
  assert.equal(source.includes('dt="프로젝트명"'), false);
  assert.equal(source.includes('dt="예상 사업비"'), false);
});

test("lets the step five action panel occupy the full content column", async () => {
  const source = await readFile(
    new URL("./Step5Result.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(source.includes("max-w-[720px] rounded-md"), false);
  assert.match(source, /className="w-full rounded-md border border-dashed/);
});
