"use client";

import Image from "next/image";
import { HOTEL_STYLES } from "@/features/project-wizard/constants";
import { isAllowedImageUrl } from "@/shared/lib/imageHost";
import type { Project } from "@/shared/types/project.types";

const STATUS_LABEL: Record<Project["status"], string> = {
  draft: "초안",
  ready: "준비",
  generated: "완료",
};

const formatUpdatedAt = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const now = new Date();
  const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();
  return sameDay
    ? `오늘 ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
    : `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date
        .getDate()
        .toString()
        .padStart(2, "0")}`;
};

const styleLabel = (designStyle: Project["designStyle"]): string =>
  HOTEL_STYLES.find((s) => s.id === designStyle)?.label ?? designStyle;

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

export const ProjectCard = ({ project, onOpen }: ProjectCardProps) => {
  const status = project.status;
  const statusLabel = STATUS_LABEL[status];
  const subtitle = [project.address, "호텔", `${project.floorsAbove}F`].filter(Boolean).join(" · ");
  const canShowImage = isAllowedImageUrl(project.siteImageUrl);

  return (
    <button
      type="button"
      className="proj-card"
      onClick={() => onOpen(project)}
      aria-label={`${project.address} · ${statusLabel}`}
    >
      <div className="proj-thumb">
        {canShowImage ? (
          <Image
            src={project.siteImageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover"
          />
        ) : (
          <>
            <div className="b" style={{ left: "22%", right: "22%", top: "18%", bottom: "32%" }} />
            <div className="ground" />
          </>
        )}
        <div className={`badge ${status === "generated" ? "done" : ""}`}>{statusLabel}</div>
      </div>
      <div className="proj-info min-w-0">
        <div className="proj-name truncate">{project.address}</div>
        <div className="proj-meta truncate">{subtitle}</div>
        <div className="proj-foot">
          <span className="truncate">{formatUpdatedAt(project.updatedAt)}</span>
          <span className="proj-tag truncate">{styleLabel(project.designStyle)}</span>
        </div>
      </div>
    </button>
  );
};
