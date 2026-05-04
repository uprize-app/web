"use client";

import Image from "next/image";
import Link from "next/link";
import { Building2, Loader2 } from "lucide-react";

import { useProjectGenerations } from "@/features/generation/hooks/useGeneration.query";
import type { Generation, Project } from "@/shared/types/api.types";

import {
  formatAddress,
  formatCategory,
  formatFloors,
  formatProjectName,
  formatRelativeTime,
  formatSiteArea,
} from "../lib/projectView";

type Props = {
  project: Project;
};

const getLatestMainImageUrl = (generations: ReadonlyArray<Generation> | undefined) =>
  generations
    ? [...generations]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .find((generation) => generation.main.status === "succeeded" && generation.main.url)
        ?.main.url ?? null
    : null;

export const ProjectCard = ({ project }: Props) => {
  const generationsQuery = useProjectGenerations(project.id);
  const mainImageUrl = getLatestMainImageUrl(generationsQuery.data);
  const isGenerated = project.status === "generated";
  const placeholderTitle = isGenerated
    ? "메인 이미지를 불러오는 중입니다"
    : "건물을 짓는 중입니다";
  const placeholderStatus = isGenerated ? "GENERATED" : "MAIN IMAGE PENDING";
  const category = formatCategory(project);
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
        {mainImageUrl ? (
          <Image
            src={mainImageUrl}
            alt={name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
            unoptimized
          />
        ) : (
          <div className="grid h-full place-items-center px-6 text-center">
            <div>
              <div className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink-50">
                {isGenerated ? (
                  <Building2 size={18} strokeWidth={1.5} />
                ) : (
                  <Loader2
                    className="animate-spin text-burn-500"
                    size={18}
                    strokeWidth={1.7}
                  />
                )}
              </div>
              <p className="mt-3 text-[13px] font-medium text-ink">
                {placeholderTitle}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-50">
                {placeholderStatus}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="px-[22px] pb-[22px] pt-5">
        <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-50">
          <span>{category}</span>
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
