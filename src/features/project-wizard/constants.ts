export const HOTEL_STYLES = [
  {
    id: "iconic",
    label: "아이코닉 랜드마크",
    inspiration: "버즈 알 아랍 (두바이)",
    description: "도시를 대표하는 상징적 외관",
  },
  {
    id: "minimal",
    label: "미니멀 럭셔리",
    inspiration: "아만 · 파크하얏트 (도쿄)",
    description: "절제된 선과 고급 마감",
  },
  {
    id: "biophilic",
    label: "바이오필릭 그린",
    inspiration: "파크로얄 (싱가포르)",
    description: "녹지·테라스 중심의 친환경",
  },
  {
    id: "futurist",
    label: "미래주의 하이테크",
    inspiration: "자하 하디드 영감",
    description: "곡선·파라메트릭·첨단 소재",
  },
  {
    id: "heritage",
    label: "헤리티지 모던",
    inspiration: "포시즌스 조지 5세 (파리)",
    description: "클래식 비례에 현대 디테일",
  },
  {
    id: "resort",
    label: "럭셔리 리조트",
    inspiration: "포 시즌스 사얀 (발리)",
    description: "수공간·자연 소재 중심 리조트",
  },
] as const;

export type HotelStyleId = (typeof HOTEL_STYLES)[number]["id"];

export const BUILDING_USES = [
  { id: "hotel", label: "호텔", enabled: true },
  { id: "officetel", label: "오피스텔", enabled: false },
  { id: "commercial", label: "상업시설", enabled: false },
  { id: "residential", label: "주거복합", enabled: false },
  { id: "office", label: "오피스빌딩", enabled: false },
  { id: "cultural", label: "문화시설", enabled: false },
] as const;

export type BuildingUse = (typeof BUILDING_USES)[number]["id"];

export const SURROUNDING_TAGS = [
  { id: "mountain", label: "산" },
  { id: "river", label: "하천" },
  { id: "sea", label: "바다" },
  { id: "park", label: "공원" },
  { id: "subway", label: "지하철역 인근" },
  { id: "commercial", label: "상업가" },
  { id: "office", label: "오피스 밀집" },
  { id: "market", label: "재래시장" },
  { id: "tourist", label: "관광지" },
  { id: "school", label: "학교 인근" },
] as const;

export type SurroundingTagId = (typeof SURROUNDING_TAGS)[number]["id"];

export const ZONE_TYPES = [
  { id: "residential_1", label: "1종 일반주거지역" },
  { id: "residential_2", label: "2종 일반주거지역" },
  { id: "residential_3", label: "3종 일반주거지역" },
  { id: "semi_residential", label: "준주거지역" },
  { id: "neighborhood_commercial", label: "근린상업지역" },
  { id: "general_commercial", label: "일반상업지역" },
  { id: "central_commercial", label: "중심상업지역" },
  { id: "quasi_industrial", label: "준공업지역" },
] as const;

export type ZoneTypeId = (typeof ZONE_TYPES)[number]["id"];

export const MAX_UPLOAD_MB = 10;
export const FLUX_TIMEOUT_MS = 60_000;
export const GENERATION_POLL_INTERVAL_MS = 2_000;
export const GENERATION_MAX_WAIT_MS = 90_000;

export const PYEONG_TO_SQM = 3.305785;
