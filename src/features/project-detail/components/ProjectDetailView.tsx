"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Download,
  ImageIcon,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ResultGallery } from "@/shared/components/ResultGallery";
import {
  useExportGenerationPdf,
  useGeneration,
  useProjectGenerations,
} from "@/features/generation/hooks/useGeneration.query";
import { useProject } from "@/features/projects-list/hooks/useProjectList.query";
import {
  formatAddress,
  formatCategory,
  formatFloors,
  formatProjectName,
  formatRelativeTime,
  formatSiteArea,
} from "@/features/projects-list/lib/projectView";
import { cn } from "@/lib/utils";

import {
  calculateGenerationProgressPercent,
  countSucceededSlides,
  formatGenerationStatus,
  formatProjectCoordinates,
  generationToSlides,
  getLatestGeneration,
} from "../lib/projectDetailView";

import { DesignReportDeck } from "./DesignReportDeck";

type Props = {
  projectId: string;
};

export const ProjectDetailView = ({ projectId }: Props) => {
  const projectQuery = useProject(projectId);
  const generationsQuery = useProjectGenerations(projectId);
  const exportPdf = useExportGenerationPdf();

  const project = projectQuery.data;
  const latestGeneration = getLatestGeneration(generationsQuery.data);
  const generationQuery = useGeneration(latestGeneration?.id ?? null);
  const activeGeneration = generationQuery.data ?? latestGeneration;
  const slides = activeGeneration ? generationToSlides(activeGeneration) : null;
  const completedSlides = countSucceededSlides(activeGeneration);
  const progressPercent = calculateGenerationProgressPercent(activeGeneration);
  const canDownloadPdf = activeGeneration?.status === "completed";

  const handleDownloadPdf = async () => {
    if (!activeGeneration) return;
    try {
      const result = await exportPdf.mutateAsync(activeGeneration.id);
      window.open(result.downloadUrl, "_blank", "noopener");
    } catch {
      // useMutation error state renders the message below.
    }
  };

  if (projectQuery.isLoading) return <ProjectDetailSkeleton />;

  if (projectQuery.isError) {
    return (
      <ProjectDetailShell>
        <div className="rounded-md border border-burn-200 bg-burn-50 px-5 py-4 text-[13px] text-burn-700">
          프로젝트를 불러오지 못했습니다. {projectQuery.error.message}
        </div>
      </ProjectDetailShell>
    );
  }

  if (!project) {
    return (
      <ProjectDetailShell>
        <div className="rounded-md border border-line bg-white px-5 py-4 text-[13px] text-ink-50">
          프로젝트 정보를 찾을 수 없습니다.
        </div>
      </ProjectDetailShell>
    );
  }

  const title = formatProjectName(project);
  const address = formatAddress(project);

  return (
    <>
      <section className="border-b border-line py-10">
        <div className="mx-auto max-w-[1280px] px-8">
          <Link
            href="/projects"
            className="mb-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-50 transition hover:text-burn-500"
          >
            <ArrowLeft size={13} strokeWidth={1.5} />
            프로젝트 목록
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-50">
                  {formatCategory(project)}
                </span>
              </div>
              <h1 className="display-italic m-0 break-words text-[42px] leading-none sm:text-[56px]">
                {title}
                <em className="display-italic not-italic text-burn-500">.</em>
              </h1>
              <div className="mt-4 flex flex-wrap gap-4 text-[13px] text-ink-50">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={14} strokeWidth={1.5} />
                  {address}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={14} strokeWidth={1.5} />
                  {formatRelativeTime(project.updatedAt)}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="accent"
                size="sm"
                onClick={handleDownloadPdf}
                disabled={!canDownloadPdf || exportPdf.isPending}
              >
                <Download size={14} strokeWidth={1.6} />
                {exportPdf.isPending ? "PDF 발행 중" : "PDF 다운로드"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-[1280px] gap-7 px-8 py-10 pb-[120px] lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.6fr)]">
        <section className="h-[520px] lg:h-[640px]">
          {slides ? (
            <ResultGallery slides={slides} />
          ) : (
            <SiteImagePanel imageUrl={project.siteImageUrl} title={title} />
          )}
        </section>

        <aside className="flex flex-col gap-5">
          {activeGeneration ? (
            <Panel title="생성 상황">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[13px] font-medium text-ink">
                  {formatGenerationStatus(activeGeneration.status)}
                </span>
                <span className="font-mono text-[11px] tracking-[0.08em] text-burn-500">
                  {progressPercent}%
                </span>
              </div>
              <Progress value={progressPercent} className="mt-3" />
              <div className="mt-2 font-mono text-[10px] tracking-[0.08em] text-ink-50">
                IMAGE {completedSlides} / 5
              </div>
              <p className="mt-3 text-[12px] leading-5 text-ink-50">
                {activeGeneration.status === "completed"
                  ? "건물 이미지와 PDF 다운로드가 준비되었습니다."
                  : activeGeneration.status === "failed"
                    ? "생성에 실패했습니다. 프로젝트 정보를 확인한 뒤 다시 시도해주세요."
                    : "생성에는 몇 분 정도 걸릴 수 있습니다. 이 화면에서 자동으로 상태를 확인합니다."}
              </p>
            </Panel>
          ) : null}

          <Panel title="프로젝트 정보">
            <InfoRow label="주소" value={address} />
            <InfoRow label="좌표" value={formatProjectCoordinates(project)} mono />
            <InfoRow label="용도지역" value={project.zoning} />
            <InfoRow label="대지면적" value={formatSiteArea(project.siteArea)} />
            <InfoRow label="용적률" value={`${project.far}%`} />
            <InfoRow label="건폐율" value={`${project.bcr}%`} />
            <InfoRow
              label="층수"
              value={formatFloors(project.floorsAbove, project.floorsBelow)}
            />
          </Panel>

          {generationsQuery.isError ? (
            <div className="rounded-md border border-burn-200 bg-burn-50 px-4 py-3 text-[13px] text-burn-700">
              생성 이력을 불러오지 못했습니다. {generationsQuery.error.message}
            </div>
          ) : null}

          {exportPdf.isError ? (
            <div className="rounded-md border border-burn-200 bg-burn-50 px-4 py-3 text-[13px] text-burn-700">
              PDF를 발행하지 못했습니다. {exportPdf.error.message}
            </div>
          ) : null}
        </aside>

        {activeGeneration?.designText ? (
          <div className="lg:col-span-2">
            <DesignReportDeck designText={activeGeneration.designText} />
          </div>
        ) : null}
      </main>
    </>
  );
};

const ProjectDetailShell = ({ children }: { children: React.ReactNode }) => (
  <main className="mx-auto max-w-[900px] px-8 py-12">
    <Link
      href="/projects"
      className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-50 transition hover:text-burn-500"
    >
      <ArrowLeft size={13} strokeWidth={1.5} />
      프로젝트 목록
    </Link>
    {children}
  </main>
);

const ProjectDetailSkeleton = () => (
  <>
    <section className="border-b border-line py-10">
      <div className="mx-auto max-w-[1280px] px-8">
        <div className="mb-7 h-4 w-28 animate-pulse rounded bg-paper-2" />
        <div className="h-14 w-64 animate-pulse rounded bg-paper-2" />
        <div className="mt-4 h-4 w-80 animate-pulse rounded bg-paper-2" />
      </div>
    </section>
    <main className="mx-auto grid max-w-[1280px] gap-7 px-8 py-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.6fr)]">
      <div className="h-[520px] animate-pulse rounded-md border border-line bg-paper-2 lg:h-[640px]" />
      <div className="flex flex-col gap-5">
        <div className="h-64 animate-pulse rounded-md border border-line bg-white" />
        <div className="h-48 animate-pulse rounded-md border border-line bg-white" />
      </div>
    </main>
  </>
);

const SiteImagePanel = ({
  imageUrl,
  title,
}: {
  imageUrl: string;
  title: string;
}) => (
  <div className="relative h-full min-h-[520px] overflow-hidden rounded-md border border-line bg-paper-2">
    <Image
      src={imageUrl}
      alt={title}
      fill
      sizes="(min-width: 1024px) 70vw, 100vw"
      className="object-cover"
      unoptimized
    />
    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-sm border border-line bg-paper/90 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink">
      <ImageIcon size={12} strokeWidth={1.5} />
      SITE IMAGE
    </div>
  </div>
);

const Panel = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="rounded-md border border-line bg-white px-6 py-5">
    <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-50">
      {title}
    </h2>
    {children}
  </section>
);

const InfoRow = ({
  label,
  value,
  mono,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) => (
  <div className="flex items-start justify-between gap-4 border-t border-line py-3 first:border-t-0 first:pt-0 last:pb-0">
    <span className="shrink-0 text-[13px] text-ink-50">{label}</span>
    <span
      className={cn(
        "min-w-0 text-right text-[13px] font-medium text-ink",
        mono ? "break-all font-mono text-[11px] tracking-[0.02em]" : "",
      )}
    >
      {value}
    </span>
  </div>
);
