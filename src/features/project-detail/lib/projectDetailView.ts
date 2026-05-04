import type {
  Generation,
  GenerationPackageStatus,
  ImageStatus,
  Project,
  ProjectStatus,
} from "@/shared/types/api.types";

export type ProjectDetailSlide = {
  index: string;
  label: string;
  url: string | null;
  status: ImageStatus;
  error?: string | null;
};

export type DesignReportSection = {
  title: string;
  paragraphs: string[];
  bullets: string[];
};

export type ReportRange = {
  min: number;
  max: number;
};

export type ReportMetrics = {
  roomCountRange: ReportRange | null;
  adrRangeWon: ReportRange | null;
  occupancyRange: ReportRange | null;
  gopMarginRange: ReportRange | null;
};

const DATE_FORMAT = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export const getLatestGeneration = (
  generations: ReadonlyArray<Generation> | undefined,
) =>
  generations
    ? [...generations].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )[0] ?? null
    : null;

export const generationToSlides = (
  generation: Generation,
): ProjectDetailSlide[] => [
  {
    index: "01",
    label: "MAIN VIEW",
    url: generation.main.url,
    status: generation.main.status,
    error: generation.main.error,
  },
  {
    index: "02",
    label: "SUNSET",
    url: generation.sunset.url,
    status: generation.sunset.status,
    error: generation.sunset.error,
  },
  {
    index: "03",
    label: "NIGHT",
    url: generation.night.url,
    status: generation.night.status,
    error: generation.night.error,
  },
  {
    index: "04",
    label: "ROTATE RIGHT",
    url: generation.rotateRight.url,
    status: generation.rotateRight.status,
    error: generation.rotateRight.error,
  },
  {
    index: "05",
    label: "ROTATE LEFT",
    url: generation.rotateLeft.url,
    status: generation.rotateLeft.status,
    error: generation.rotateLeft.error,
  },
];

export const countSucceededSlides = (generation: Generation | null) =>
  generation
    ? [
        generation.main,
        generation.sunset,
        generation.night,
        generation.rotateRight,
        generation.rotateLeft,
      ].filter((image) => image.status === "succeeded").length
    : 0;

const IMAGE_PROGRESS_WEIGHT: Record<ImageStatus, number> = {
  pending: 0,
  running: 0.5,
  succeeded: 1,
  failed: 1,
};

export const calculateGenerationProgressPercent = (
  generation: Generation | null,
) => {
  if (!generation) return 0;
  if (generation.status === "completed") return 100;

  const imageScore =
    [
      generation.main.status,
      generation.sunset.status,
      generation.night.status,
      generation.rotateRight.status,
      generation.rotateLeft.status,
    ].reduce((total, status) => total + IMAGE_PROGRESS_WEIGHT[status], 0) / 5;

  if (generation.status === "failed") {
    return Math.max(5, Math.round(imageScore * 100));
  }

  const baseProgress = generation.status === "pending" ? 8 : 12;
  return Math.min(
    95,
    Math.max(
      baseProgress,
      Math.round(baseProgress + imageScore * (95 - baseProgress)),
    ),
  );
};

const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  draft: "초안",
  ready: "생성 대기",
  generated: "생성 완료",
};

const GENERATION_STATUS_LABEL: Record<GenerationPackageStatus, string> = {
  pending: "대기 중",
  running: "생성 중",
  completed: "완료",
  failed: "실패",
};

export const formatProjectStatus = (status: ProjectStatus) =>
  PROJECT_STATUS_LABEL[status];

export const formatGenerationStatus = (status: GenerationPackageStatus) =>
  GENERATION_STATUS_LABEL[status];

export const formatDateTime = (iso: string) => DATE_FORMAT.format(new Date(iso));

export const formatProjectCoordinates = (project: Project) =>
  `${project.latitude.toFixed(5)}, ${project.longitude.toFixed(5)}`;

const REPORT_SECTION_TITLE_PATTERN =
  "입지 분석|디자인 컨셉|사업 계획|투자 매력 포인트";

const normalizeDesignReportText = (text: string) =>
  text
    .replace(
      new RegExp(`\\s*##\\s*(${REPORT_SECTION_TITLE_PATTERN})\\s*`, "g"),
      "\n## $1\n",
    )
    .replace(/\s+-\s+/g, "\n- ")
    .trim();

export const parseDesignReport = (text: string): DesignReportSection[] => {
  const sections: DesignReportSection[] = [];
  let title = "설계 리포트";
  let paragraphs: string[] = [];
  let bullets: string[] = [];

  const flush = () => {
    const hasContent = paragraphs.length > 0 || bullets.length > 0;
    if (!hasContent) return;
    sections.push({ title, paragraphs, bullets });
    paragraphs = [];
    bullets = [];
  };

  normalizeDesignReportText(text)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const heading = line.match(/^##\s+(.+)$/);
      if (heading?.[1]) {
        flush();
        title = heading[1].trim();
        return;
      }

      const bullet = line.match(/^-\s+(.+)$/);
      if (bullet?.[1]) {
        bullets.push(bullet[1].trim());
        return;
      }

      paragraphs.push(line);
    });

  flush();

  return sections.length > 0 ? sections : [];
};

const toNumber = (value: string) => Number(value.replaceAll(",", ""));

const parseRange = (source: string, pattern: RegExp): ReportRange | null => {
  const match = source.match(pattern);
  const min = match?.[1];
  const max = match?.[2];
  if (!min || !max) return null;
  return {
    min: toNumber(min),
    max: toNumber(max),
  };
};

export const extractReportMetrics = (text: string): ReportMetrics => ({
  roomCountRange: parseRange(text, /(\d[\d,]*)\s*~\s*(\d[\d,]*)\s*실/),
  adrRangeWon: parseRange(
    text,
    /(?:ADR|객실 평균 단가)[^\d]*(\d[\d,]*)\s*원?\s*~\s*(\d[\d,]*)\s*원/,
  ),
  occupancyRange: parseRange(
    text,
    /(?:점유율|가동률)[^\d]*(\d{1,3})\s*~\s*(\d{1,3})\s*%/,
  ),
  gopMarginRange: parseRange(
    text,
    /(?:GOP|영업이익률)[^\d]*(\d{1,3})\s*~\s*(\d{1,3})\s*%/,
  ),
});
