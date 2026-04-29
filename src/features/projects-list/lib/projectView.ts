import type {
  DesignStyle,
  Project,
  ProjectStatus,
} from "@/shared/types/api.types";

/** 카드 상단 status pill 변환 (백엔드 status → UI 종류) */
export type UiStatus = "done" | "work" | "draft";

const STATUS_MAP: Record<ProjectStatus, UiStatus> = {
  generated: "done",
  ready: "work",
  draft: "draft",
};

export const toUiStatus = (status: ProjectStatus): UiStatus => STATUS_MAP[status];

const STYLE_LABEL: Record<DesignStyle, string> = {
  iconic: "ICONIC",
  futurist: "FUTURIST",
  biophilic: "BIOPHILIC",
  heritage: "HERITAGE",
  curtainwall: "CURTAINWALL",
  darkstone: "DARKSTONE",
};

/** "HOTEL · ICONIC" 형태 카테고리 라벨 */
export const formatCategory = (project: Project) =>
  `${project.buildingType.toUpperCase()} · ${STYLE_LABEL[project.designStyle]}`;

/** 짧은 ID — 디자인의 "UP-2604-09" 패턴은 백엔드에 없어서 UUID 앞 6자 사용 */
export const formatProjectShortId = (id: string) =>
  `UP-${id.slice(0, 6).toUpperCase()}`;

/** 대지면적 포맷 (백엔드는 평 단위) */
export const formatSiteArea = (areaPyeong: number) =>
  `${new Intl.NumberFormat("ko-KR").format(Math.round(areaPyeong))}평`;

/** "18F/B3" 형태 */
export const formatFloors = (above: number, below: number) =>
  below > 0 ? `${above}F/B${below}` : `${above}F`;

const RELATIVE_DAY = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });

/** "3일 전", "방금 전" 같은 상대시간 */
export const formatRelativeTime = (iso: string, now = new Date()) => {
  const then = new Date(iso);
  const diffMs = now.getTime() - then.getTime();
  const diffMin = Math.round(diffMs / 60_000);
  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}시간 전`;
  const diffDay = Math.round(diffHr / 24);
  if (diffDay < 7) return `${diffDay}일 전`;
  const diffWk = Math.round(diffDay / 7);
  if (diffWk < 5) return `${diffWk}주 전`;
  return RELATIVE_DAY.format(-Math.round(diffDay / 30), "month");
};

/** 주소 한 줄 — roadAddress 가 있으면 우선, 없으면 address */
export const formatAddress = (project: Project) =>
  project.roadAddress ?? project.address;

/** 프로젝트명 — 백엔드에 별도 name 필드 없음. 주소 기반으로 임시 생성. */
export const formatProjectName = (project: Project) => {
  const parts = project.address.split(/\s+/);
  // "서울 강남구 역삼동 123-4" → "역삼 ..." 같은 친숙한 이름이 백엔드에 들어오면 우선
  return parts[2] ?? parts[1] ?? parts[0] ?? "프로젝트";
};
