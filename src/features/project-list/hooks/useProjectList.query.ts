import { useQuery } from "@tanstack/react-query";
import { fetchProjectList } from "@/features/project-list/api/project.api";
import type { Project } from "@/shared/types/project.types";

export const projectListQueryKey = ["projects"] as const;

export const useProjectList = () =>
  useQuery<Project[]>({
    queryKey: projectListQueryKey,
    queryFn: fetchProjectList,
  });
