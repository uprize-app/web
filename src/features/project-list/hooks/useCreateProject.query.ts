import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "@/features/project-list/api/project.api";
import { projectListQueryKey } from "@/features/project-list/hooks/useProjectList.query";
import type { CreateProjectPayload, Project } from "@/shared/types/project.types";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, CreateProjectPayload>({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectListQueryKey });
    },
  });
};
