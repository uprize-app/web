export type SiteAreaSizeBand = "small" | "medium" | "large";

type SiteAreaBandRange = {
  min: number;
  max: number;
};

type SiteAreaBandViolation = {
  kind: "too-small" | "too-large";
  message: string;
};

const PYEONG_FORMAT = new Intl.NumberFormat("ko-KR");

export const SQM_PER_PYEONG = 3.3058;

export const pyeongToSqm = (pyeong: number) => pyeong * SQM_PER_PYEONG;

export const sqmToPyeong = (sqm: number) => Math.round(sqm / SQM_PER_PYEONG);

export const SITE_AREA_BAND_RANGES: Record<
  SiteAreaSizeBand,
  SiteAreaBandRange
> = {
  small: { min: 100, max: 3000 },
  medium: { min: 3001, max: 24999 },
  large: { min: 25000, max: 99999 },
};

export const SITE_AREA_BAND_LABELS: Record<SiteAreaSizeBand, string> = {
  small: "소형",
  medium: "중형",
  large: "대형",
};

const SITE_AREA_BAND_ORDER: SiteAreaSizeBand[] = ["small", "medium", "large"];

const formatPyeong = (pyeong: number) => PYEONG_FORMAT.format(pyeong);

export const formatPyeongRange = (sizeBand: SiteAreaSizeBand) => {
  const range = SITE_AREA_BAND_RANGES[sizeBand];
  return `${formatPyeong(range.min)}~${formatPyeong(range.max)}평`;
};

const findSizeBandForArea = (areaPyeong: number): SiteAreaSizeBand | null =>
  SITE_AREA_BAND_ORDER.find((sizeBand) => {
    const range = SITE_AREA_BAND_RANGES[sizeBand];
    return areaPyeong >= range.min && areaPyeong <= range.max;
  }) ?? null;

export const getAreaBandViolation = (
  sizeBand: SiteAreaSizeBand,
  areaPyeong: number,
): SiteAreaBandViolation | null => {
  if (areaPyeong <= 0) return null;

  const selectedIndex = SITE_AREA_BAND_ORDER.indexOf(sizeBand);
  const recommended = findSizeBandForArea(areaPyeong);

  if (!recommended) {
    const min = SITE_AREA_BAND_RANGES.small.min;
    const max = SITE_AREA_BAND_RANGES.large.max;

    if (areaPyeong < min) {
      return {
        kind: "too-small",
        message: `최소 ${formatPyeong(min)}평 이상이어야 합니다.`,
      };
    }

    return {
      kind: "too-large",
      message: `최대 평수를 넘었습니다. ${formatPyeong(max + 1)}평 이상은 아직 지원하지 않습니다.`,
    };
  }

  if (recommended === sizeBand) return null;

  const recommendedIndex = SITE_AREA_BAND_ORDER.indexOf(recommended);
  const recommendedRange = SITE_AREA_BAND_RANGES[recommended];

  if (recommendedIndex < selectedIndex) {
    return {
      kind: "too-small",
      message: `${formatPyeong(recommendedRange.max)}평 이하는 ${SITE_AREA_BAND_LABELS[recommended]} 현장 이미지를 고르세요.`,
    };
  }

  return {
    kind: "too-large",
    message: `${formatPyeong(recommendedRange.min)}평 이상 부지는 ${SITE_AREA_BAND_LABELS[recommended]} 현장 이미지를 고르세요.`,
  };
};
