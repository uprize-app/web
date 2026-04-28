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

export const DESIGN_STYLE_OPTIONS: ReadonlyArray<DesignStyleOption> = [
  { id: "iconic",    index: "01", code: "ICONIC",    name: "아이코닉 랜드마크", reference: "버즈 알 아랍",     Svg: IconicSvg },
  { id: "minimal",   index: "02", code: "MINIMAL",   name: "미니멀 럭셔리",     reference: "아만 도쿄",        Svg: MinimalSvg },
  { id: "biophilic", index: "03", code: "BIOPHILIC", name: "바이오필릭 그린",   reference: "파크로얄",         Svg: BiophilicSvg },
  { id: "futurist",  index: "04", code: "FUTURIST",  name: "미래주의 하이테크", reference: "Zaha Hadid",       Svg: FuturistSvg },
  { id: "heritage",  index: "05", code: "HERITAGE",  name: "헤리티지 모던",     reference: "George V Paris",   Svg: HeritageSvg },
  { id: "resort",    index: "06", code: "RESORT",    name: "럭셔리 리조트",     reference: "Sayan, Bali",      Svg: ResortSvg },
];

export const DESIGN_STYLE_BY_ID = new Map<DesignStyleId, DesignStyleOption>(
  DESIGN_STYLE_OPTIONS.map((s) => [s.id, s]),
);
