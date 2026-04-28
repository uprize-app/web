import type { ComponentType } from "react";

import {
  CitySvg,
  MountainSvg,
  OceanSvg,
  ParkSvg,
  RiverSvg,
  RuralSvg,
} from "../components/svg/BackgroundSvgs";

import type { BackgroundId } from "../types/wizard.types";

export type BackgroundOption = {
  id: BackgroundId;
  name: string;
  tag: string;
  Svg: ComponentType;
  recommended?: boolean;
};

export const BACKGROUND_OPTIONS: ReadonlyArray<BackgroundOption> = [
  { id: "city", name: "도시 / Urban", tag: "RECOMMENDED · 도심", Svg: CitySvg, recommended: true },
  { id: "ocean", name: "바다 / Ocean", tag: "자연 · 바다", Svg: OceanSvg },
  { id: "mountain", name: "산 / Mountain", tag: "자연 · 산악", Svg: MountainSvg },
  { id: "rural", name: "시골 / Rural", tag: "자연 · 농촌", Svg: RuralSvg },
  { id: "river", name: "강변 / Riverside", tag: "자연 · 강변", Svg: RiverSvg },
  { id: "park", name: "공원 / Park", tag: "자연 · 공원", Svg: ParkSvg },
];

export const BACKGROUND_BY_ID = new Map<BackgroundId, BackgroundOption>(
  BACKGROUND_OPTIONS.map((b) => [b.id, b]),
);
