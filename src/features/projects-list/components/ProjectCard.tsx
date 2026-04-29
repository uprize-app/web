import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/shared/types/api.types";

import {
  formatAddress,
  formatCategory,
  formatFloors,
  formatProjectName,
  formatProjectShortId,
  formatRelativeTime,
  formatSiteArea,
  toUiStatus,
} from "../lib/projectView";

import { StatusPill } from "./StatusPill";

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props) => {
  const uiStatus = toUiStatus(project.status);
  const category = formatCategory(project);
  const shortId = formatProjectShortId(project.id);
  const name = formatProjectName(project);
  const address = formatAddress(project);
  const area = formatSiteArea(project.siteArea);
  const floors = formatFloors(project.floorsAbove, project.floorsBelow);
  const updated = formatRelativeTime(project.updatedAt);

  return (
    <Link
      href={`/studio/${project.id}`}
      className="group block overflow-hidden rounded-lg border border-line bg-white transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-ink hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-paper-2">
        <Image
          src={project.siteImageUrl}
          alt={name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
        <StatusPill status={uiStatus} className="absolute left-3 top-3" />
      </div>
      <div className="px-[22px] pb-[22px] pt-5">
        <div className="mb-2.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-ink-50">
          <span>{category}</span>
          <span>{shortId}</span>
        </div>
        <h3 className="display-italic mb-1.5 text-[24px] leading-tight tracking-[-0.015em] not-italic">
          {name}
        </h3>
        <p className="mb-[18px] text-[13px] text-ink-50">{address}</p>
        <div className="flex gap-4 border-t border-line pt-4 font-mono text-[11px] text-ink-50">
          <span>
            대지 <strong className="font-semibold text-ink">{area}</strong>
          </span>
          <span>
            층수 <strong className="font-semibold text-ink">{floors}</strong>
          </span>
          <span>{updated}</span>
        </div>
      </div>
    </Link>
  );
};
