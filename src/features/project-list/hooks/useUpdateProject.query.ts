import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/features/project-list/api/project.api";
import { projectDetailQueryKey } from "@/features/project-list/hooks/useProjectDetail.query";
import { projectListQueryKey } from "@/features/project-list/hooks/useProjectList.query";
import type { Project, UpdateProjectPayload } from "@/shared/types/project.types";

type UpdateProjectVariables = {
  id: string;
  payload: UpdateProjectPayload;
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, UpdateProjectVariables>({
    mutationFn: ({ id, payload }) => updateProject(id, payload),
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: projectListQueryKey });
      queryClient.setQueryData(projectDetailQueryKey(project.id), project);
    },
  });
};
