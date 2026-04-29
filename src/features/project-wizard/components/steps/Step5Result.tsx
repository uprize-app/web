"use client";

import { useState } from "react";
import { Download, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { useExportGenerationPdf, useGeneration, useStartGeneration } from "@/features/generation/hooks/useGeneration.query";
import { useCreateProject } from "@/features/projects-list/hooks/useProjectList.query";

import { DESIGN_STYLE_BY_ID } from "../../constants/designStyles";
import { buildCreatePayload } from "../../lib/buildCreatePayload";
import {
  computeMaxFloorArea,
  estimateBudgetEokWon,
  formatNumber,
} from "../../lib/format";
import { useWizardDraftStore } from "../../stores/wizardDraft.store";

import type { Generation } from "@/shared/types/api.types";

import { ResultGallery, type GallerySlide } from "../result/ResultGallery";
import { WizardStepHead } from "../WizardStepHead";

const generationToSlides = (gen: Generation | undefined): GallerySlide[] => {
  if (!gen) {
    // generation 시작 전에 보여줄 placeholder
    return [
      { index: "01", label: "MAIN VIEW",    url: null, status: "pending" },
      { index: "02", label: "SUNSET",       url: null, status: "pending" },
      { index: "03", label: "NIGHT",        url: null, status: "pending" },
      { index: "04", label: "ROTATE RIGHT", url: null, status: "pending" },
      { index: "05", label: "ROTATE LEFT",  url: null, status: "pending" },
    ];
  }
  return [
    { index: "01", label: "MAIN VIEW",    url: gen.main.url,        status: gen.main.status,        error: gen.main.error },
    { index: "02", label: "SUNSET",       url: gen.sunset.url,      status: gen.sunset.status,      error: gen.sunset.error },
    { index: "03", label: "NIGHT",        url: gen.night.url,       status: gen.night.status,       error: gen.night.error },
    { index: "04", label: "ROTATE RIGHT", url: gen.rotateRight.url, status: gen.rotateRight.status, error: gen.rotateRight.error },
    { index: "05", label: "ROTATE LEFT",  url: gen.rotateLeft.url,  status: gen.rotateLeft.status,  error: gen.rotateLeft.error },
  ];
};

const succeededCount = (gen: Generation | undefined): number => {
  if (!gen) return 0;
  return [gen.main, gen.sunset, gen.night, gen.rotateRight, gen.rotateLeft]
    .filter((s) => s.status === "succeeded").length;
};

export const Step5Result = () => {
  const draft = useWizardDraftStore();
  const { lot, designStyle, siteInfo, projectName } = draft;

  const [projectId, setProjectId] = useState<string | null>(null);
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createProject = useCreateProject();
  const startGen = useStartGeneration();
  const generation = useGeneration(generationId);
  const exportPdf = useExportGenerationPdf();

  const gen = generation.data;
  const slides = generationToSlides(gen);
  const done = succeededCount(gen);
  const total = 5;
  const isRunning = gen?.status === "pending" || gen?.status === "running";
  const isCompleted = gen?.status === "completed";
  const isFailed = gen?.status === "failed";
  const hasStarted = !!generationId;

  const styleName = designStyle
    ? DESIGN_STYLE_BY_ID.get(designStyle)?.name.split(" ")[0]
    : "—";
  const totalFloor = computeMaxFloorArea(siteInfo.areaSqm, siteInfo.far);
  const budget = estimateBudgetEokWon(totalFloor);

  const handleStart = async () => {
    setError(null);
    try {
      let pid = projectId;
      if (!pid) {
        const result = buildCreatePayload(draft);
        if (!result.ok) {
          setError(result.reason);
          return;
        }
        const project = await createProject.mutateAsync(result.payload);
        pid = project.id;
        setProjectId(pid);
      }
      const startedGen = await startGen.mutateAsync(pid);
      setGenerationId(startedGen.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "AI 생성 시작 실패");
    }
  };

  const handleDownloadPdf = async () => {
    if (!generationId) return;
    setError(null);
    try {
      const result = await exportPdf.mutateAsync(generationId);
      window.open(result.downloadUrl, "_blank", "noopener");
    } catch (e) {
      setError(e instanceof Error ? e.message : "PDF 발행 실패");
    }
  };

  return (
    <div className="animate-fade-up">
      <WizardStepHead
        step={5}
        title={
          <>
            AI가 <em className="not-italic display-italic text-burn-500">생성</em>
            합니다.
          </>
        }
        description="평균 4~6분. 완료되면 5장 패키지와 설계 제안 PDF가 준비됩니다."
      />

      {/* 시작 전 — 시작 버튼 */}
      {!hasStarted ? (
        <div className="mb-8 rounded-md border border-dashed border-line bg-paper-2 px-6 py-7 text-center">
          <Sparkles
            size={28}
            strokeWidth={1.4}
            className="mx-auto mb-3 text-burn-500"
          />
          <p className="mb-4 text-[14px] text-ink-50">
            준비가 끝났어요. 아래 버튼을 누르면 프로젝트가 저장되고 AI 생성이 시작됩니다.
          </p>
          <Button
            variant="accent"
            size="sm"
            onClick={handleStart}
            disabled={createProject.isPending || startGen.isPending}
          >
            {createProject.isPending
              ? "프로젝트 저장 중…"
              : startGen.isPending
                ? "생성 시작 중…"
                : "AI 생성 시작"}
          </Button>
        </div>
      ) : null}

      {/* 진행률 */}
      {hasStarted && !isCompleted ? (
        <div className="mb-6 rounded-md border border-line bg-white px-6 py-4">
          <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em]">
            <span className="text-ink-50">
              {isFailed ? "GENERATION FAILED" : "GENERATING"}
            </span>
            <span className="text-burn-500">
              {done} / {total}
            </span>
          </div>
          <Progress value={(done / total) * 100} />
          <div className="mt-2 font-mono text-[11px] tracking-[0.04em] text-ink-50">
            {isRunning
              ? "5초 간격으로 결과를 확인하고 있어요…"
              : isFailed
                ? gen?.main.error ?? "다시 시도해주세요."
                : null}
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="mb-6 rounded-md border border-burn-200 bg-burn-50 px-4 py-2.5 text-[13px] text-burn-700">
          {error}
        </div>
      ) : null}

      <div className="@container/result">
        <div className="grid gap-7 @[820px]/result:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.6fr)] @[820px]/result:items-stretch">
          <div className="aspect-[16/10] @[820px]/result:aspect-auto">
            <ResultGallery slides={slides} />
          </div>

          <aside className="flex flex-col gap-4">
            <div className="flex flex-1 flex-col rounded-md border border-line bg-white p-6">
              <h5 className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-50">
                요약
              </h5>
              <dl className="flex flex-col gap-2.5 text-[13px]">
                <Row dt="프로젝트명" dd={projectName} />
                <Row dt="주소" dd={lot?.jibun ?? "—"} />
                <Row dt="스타일" dd={styleName ?? "—"} />
                <Row
                  dt="대지면적"
                  dd={`${formatNumber(Math.round(siteInfo.areaSqm))}㎡`}
                />
                <Row dt="층수" dd={`${siteInfo.floorsAbove}F / B${siteInfo.floorsBelow}`} />
                <Row
                  dt="예상 사업비"
                  dd={
                    <em className="display-italic text-[18px] not-italic text-burn-500">
                      {formatNumber(budget)} 억원
                    </em>
                  }
                />
              </dl>
            </div>

            <div className="rounded-md border border-line bg-white p-6">
              <h5 className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-50">
                다운로드
              </h5>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={!isCompleted || exportPdf.isPending}
                  className="flex items-center justify-between rounded-sm border border-line px-4 py-3 text-[13px] transition hover:border-ink hover:bg-paper disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="rounded-sm bg-paper-2 px-1.5 py-0.5 font-mono text-[10px] text-ink-50">
                      PDF
                    </span>
                    {exportPdf.isPending
                      ? "PDF 발행 중…"
                      : isCompleted
                        ? "설계 제안서 (3p)"
                        : "완료 후 다운로드 가능"}
                  </span>
                  <Download size={14} strokeWidth={1.4} />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const Row = ({ dt, dd }: { dt: string; dd: React.ReactNode }) => (
  <div className="flex justify-between gap-3">
    <span className="text-ink-50">{dt}</span>
    <span className="whitespace-nowrap font-medium">{dd}</span>
  </div>
);
