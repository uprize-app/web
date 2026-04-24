"use client";

import { ProjectCard } from "@/features/project-list/components/ProjectCard";
import type { Project } from "@/shared/types/project.types";

type ProjectListGridProps = {
  projects: Project[];
  onOpen: (project: Project) => void;
  onCreate: () => void;
};

export const ProjectListGrid = ({ projects, onOpen, onCreate }: ProjectListGridProps) => (
  <div className="proj-grid">
    {projects.map((project) => (
      <ProjectCard key={project.id} project={project} onOpen={onOpen} />
    ))}
    <button type="button" className="proj-card-add" onClick={onCreate} aria-label="새 프로젝트 시작">
      <span className="plus" aria-hidden="true">+</span>
      <span className="lbl">새 프로젝트</span>
    </button>
  </div>
);
