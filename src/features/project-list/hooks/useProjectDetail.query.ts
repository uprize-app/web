import { useQuery } from "@tanstack/react-query";
import { fetchProjectDetail } from "@/features/project-list/api/project.api";
import type { Project } from "@/shared/types/project.types";

export const projectDetailQueryKey = (id: string) => ["projects", id] as const;

export const useProjectDetail = (id: string | null | undefined) =>
  useQuery<Project>({
    queryKey: projectDetailQueryKey(id ?? ""),
    queryFn: () => fetchProjectDetail(id!),
    enabled: Boolean(id),
  });
