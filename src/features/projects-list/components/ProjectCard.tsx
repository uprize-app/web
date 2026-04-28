import Link from "next/link";

import { StatusPill } from "./StatusPill";
import type { Project } from "../types/project.types";

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props) => {
  const Thumb = project.Thumbnail;
  return (
    <Link
      href="#"
      className="group block overflow-hidden rounded-lg border border-line bg-white transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-ink hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-paper-2">
        <Thumb />
        <StatusPill status={project.status} className="absolute left-3 top-3" />
      </div>
      <div className="px-[22px] pb-[22px] pt-5">
        <div className="mb-2.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-ink-50">
          <span>{project.category}</span>
          <span>{project.id}</span>
        </div>
        <h3 className="display-italic mb-1.5 text-[24px] leading-tight tracking-[-0.015em] not-italic">
          {project.name}
        </h3>
        <p className="mb-[18px] text-[13px] text-ink-50">{project.address}</p>
        <div className="flex gap-4 border-t border-line pt-4 font-mono text-[11px] text-ink-50">
          <span>
            대지 <strong className="font-semibold text-ink">{project.areaLabel}</strong>
          </span>
          <span>
            층수 <strong className="font-semibold text-ink">{project.floors}</strong>
          </span>
          <span>{project.updatedLabel}</span>
        </div>
      </div>
    </Link>
  );
};
