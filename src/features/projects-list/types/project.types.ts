import type { ComponentType } from "react";

export type ProjectStatus = "done" | "work" | "draft";

export type ProjectFilter = "all" | "work" | "done" | "draft";

export type Project = {
  id: string; // UP-2604-09
  name: string;
  address: string;
  category: string; // "HOTEL · ICONIC"
  areaLabel: string; // "1,240㎡"
  floors: string; // "18F/B3"
  updatedLabel: string; // "3일 전"
  status: ProjectStatus;
  Thumbnail: ComponentType;
};
