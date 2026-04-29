import type { ComponentType } from "react";

import {
  BiophilicSvg,
  FuturistSvg,
  HeritageSvg,
  IconicSvg,
  MinimalSvg,
  ResortSvg,
} from "../components/svg/StyleSvgs";

import type { DesignStyleId } from "../types/wizard.types";

export type DesignStyleOption = {
  id: DesignStyleId;
  index: string; // "01"
  code: string; // "ICONIC"
  name: string;
  reference: string;
  Svg: ComponentType;
};

/**
 * 백엔드 DesignStyle 6종 매핑.
 * SVG 일러스트는 디자인 번들 자산을 재활용 (minimal→curtainwall, resort→darkstone).
 */
export const DESIGN_STYLE_OPTIONS: ReadonlyArray<DesignStyleOption> = [
  { id: "iconic",      index: "01", code: "ICONIC",      name: "아이코닉 랜드마크",   reference: "버즈 알 아랍",     Svg: IconicSvg },
  { id: "futurist",    index: "02", code: "FUTURIST",    name: "미래주의 하이테크",   reference: "Zaha Hadid",       Svg: FuturistSvg },
  { id: "biophilic",   index: "03", code: "BIOPHILIC",   name: "바이오필릭 그린",     reference: "파크로얄",         Svg: BiophilicSvg },
  { id: "heritage",    index: "04", code: "HERITAGE",    name: "헤리티지 모던",       reference: "George V Paris",   Svg: HeritageSvg },
  { id: "curtainwall", index: "05", code: "CURTAINWALL", name: "커튼월 글래스",       reference: "Aman 도쿄",        Svg: MinimalSvg },
  { id: "darkstone",   index: "06", code: "DARKSTONE",   name: "다크스톤 럭셔리",     reference: "Sayan, Bali",      Svg: ResortSvg },
];

export const DESIGN_STYLE_BY_ID = new Map<DesignStyleId, DesignStyleOption>(
  DESIGN_STYLE_OPTIONS.map((s) => [s.id, s]),
);
