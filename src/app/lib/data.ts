export type ParcelId = "p1" | "p2" | "p3" | "p4" | "p5" | "p6" | "p7" | "p8";

export type Parcel = {
  addr: string;
  area: number;
  zone: string;
  far: number;
  bcr: number;
  roads: string;
  maxF: number;
};

export const PARCELS: Record<ParcelId, Parcel> = {
  p1: { addr: "역삼동 717-1", area: 412, zone: "3종일반", far: 300, bcr: 60, roads: "8m + 6m", maxF: 8 },
  p2: { addr: "역삼동 727-3", area: 372, zone: "3종일반", far: 450, bcr: 60, roads: "12m + 8m", maxF: 15 },
  p3: { addr: "역삼동 740-2", area: 286, zone: "준주거", far: 400, bcr: 60, roads: "6m", maxF: 9 },
  p4: { addr: "논현동 158-2", area: 512, zone: "상업", far: 800, bcr: 80, roads: "20m", maxF: 18 },
  p5: { addr: "논현동 162-7", area: 328, zone: "상업", far: 600, bcr: 80, roads: "12m", maxF: 8 },
  p6: { addr: "대치동 901-3", area: 445, zone: "3종일반", far: 300, bcr: 60, roads: "10m", maxF: 10 },
  p7: { addr: "대치동 905-1", area: 298, zone: "준주거", far: 400, bcr: 60, roads: "8m", maxF: 8 },
  p8: { addr: "삼성동 142-1", area: 680, zone: "상업", far: 800, bcr: 80, roads: "25m", maxF: 22 },
};

export type Project = {
  id: string;
  name: string;
  parcel: ParcelId;
  status: "done" | "progress";
  use: string;
  floors: number;
  style: string;
  updated: string;
  starred: boolean;
};

export const PROJECTS: Project[] = [
  { id: "pr1", name: "강남 오피스타워", parcel: "p2", status: "done", use: "오피스", floors: 15, style: "Minimal", updated: "2시간 전", starred: true },
  { id: "pr2", name: "논현 주상복합", parcel: "p4", status: "progress", use: "복합", floors: 18, style: "Modern", updated: "어제", starred: false },
  { id: "pr3", name: "대치 리테일", parcel: "p7", status: "done", use: "상업", floors: 8, style: "Glass", updated: "3일 전", starred: false },
];

export type GalleryItem = {
  n: string;
  type: string;
  spec: string;
  sky: "a" | "b" | "c" | "d" | "e" | "f";
  loc: string;
  prop: "tower" | "slab" | "podium";
};

export const GALLERY_ITEMS: GalleryItem[] = [
  { n: "SK 강남 타워", type: "오피스", spec: "15F · 4,320㎡", sky: "a", loc: "역삼동", prop: "tower" },
  { n: "논현 레지던스", type: "주거", spec: "22F · 11,800㎡", sky: "b", loc: "논현동", prop: "slab" },
  { n: "대치 리테일", type: "상업", spec: "8F · 2,100㎡", sky: "c", loc: "대치동", prop: "podium" },
  { n: "성수 복합", type: "복합", spec: "18F · 9,200㎡", sky: "d", loc: "성수동", prop: "tower" },
  { n: "이태원 호텔", type: "호텔", spec: "14F · 6,800㎡", sky: "e", loc: "이태원", prop: "slab" },
  { n: "가산 물류센터", type: "물류", spec: "5F · 18,000㎡", sky: "f", loc: "가산동", prop: "podium" },
  { n: "청담 오피스", type: "오피스", spec: "11F · 3,600㎡", sky: "a", loc: "청담동", prop: "slab" },
  { n: "서초 아파트", type: "주거", spec: "28F · 14,500㎡", sky: "d", loc: "서초동", prop: "tower" },
  { n: "용산 타워", type: "복합", spec: "32F · 22,000㎡", sky: "c", loc: "용산", prop: "tower" },
  { n: "홍대 플라자", type: "상업", spec: "6F · 2,800㎡", sky: "b", loc: "홍대", prop: "podium" },
  { n: "마곡 R&D", type: "오피스", spec: "10F · 5,400㎡", sky: "e", loc: "마곡", prop: "slab" },
  { n: "잠실 레이크뷰", type: "주거", spec: "35F · 18,200㎡", sky: "a", loc: "잠실", prop: "tower" },
  { n: "판교 스튜디오", type: "오피스", spec: "9F · 3,100㎡", sky: "f", loc: "판교", prop: "slab" },
  { n: "삼성동 호텔", type: "호텔", spec: "18F · 8,400㎡", sky: "c", loc: "삼성동", prop: "slab" },
];

export const PROPS: Record<GalleryItem["prop"], { left: string; right: string; top: string; bottom: string }> = {
  tower: { left: "34%", right: "34%", top: "14%", bottom: "22%" },
  slab: { left: "22%", right: "22%", top: "28%", bottom: "22%" },
  podium: { left: "16%", right: "16%", top: "42%", bottom: "22%" },
};

export const FAQ_ITEMS = [
  {
    n: "01",
    q: "생성된 이미지의 저작권은 누구에게 있나요?",
    a: "UPRIZE로 생성한 모든 외관 이미지·도면의 저작권은 전적으로 사용자(시행사·설계사무소)에게 귀속됩니다. 상업적 이용, 인허가 제출, 마케팅 자료 사용 모두 자유롭습니다. 다만 실제 인허가를 위해서는 등록 건축사의 날인이 필요하며, UPRIZE는 기획설계 보조 도구입니다.",
  },
  {
    n: "02",
    q: "구독을 중간에 해지하면 남은 포인트는 어떻게 되나요?",
    a: "구독 해지 시점까지 적립된 포인트는 유효기간 없이 계속 사용할 수 있습니다. 단, 해지 이후에는 월별 신규 포인트가 지급되지 않으므로 추가 충전 또는 재구독이 필요합니다.",
  },
  {
    n: "03",
    q: "스튜디오 프로에서 아틀리에로 업그레이드하려면?",
    a: "언제든 가능합니다. 영업팀에 문의 주시면 24시간 이내에 맞춤 견적과 마이그레이션 플랜을 전달드립니다. 기존 프로젝트와 포인트 잔액은 자동으로 이관됩니다.",
  },
  {
    n: "04",
    q: "생성 결과가 마음에 들지 않으면 환불되나요?",
    a: "재생성(1P)으로 조건을 조금씩 바꿔가며 원하는 결과를 찾는 것이 가장 빠른 방법입니다. 그럼에도 시스템 오류로 정상 생성되지 않았다면 해당 포인트는 자동으로 복구됩니다. 구독 첫 7일간은 전액 환불 가능합니다.",
  },
  {
    n: "05",
    q: "세금계산서 발행되나요?",
    a: "네, 모든 결제에 대해 전자세금계산서를 발행해 드립니다. 결제 후 영업일 기준 2일 이내에 등록하신 사업자 이메일로 발송됩니다.",
  },
];
