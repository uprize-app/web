import type { ComponentType } from "react";

import {
  AerialSvg,
  ExteriorDaySvg,
  ExteriorDuskSvg,
  LobbySvg,
  SectionSvg,
} from "../components/svg/GallerySvgs";

export type GallerySlide = {
  index: string; // "01"
  label: string; // "EXTERIOR DAY"
  Svg: ComponentType;
};

export const GALLERY_SLIDES: ReadonlyArray<GallerySlide> = [
  { index: "01", label: "EXTERIOR DAY",     Svg: ExteriorDaySvg },
  { index: "02", label: "EXTERIOR DUSK",    Svg: ExteriorDuskSvg },
  { index: "03", label: "AERIAL · SITE PLAN", Svg: AerialSvg },
  { index: "04", label: "LOBBY · INTERIOR", Svg: LobbySvg },
  { index: "05", label: "SECTION · EAST-WEST", Svg: SectionSvg },
];
