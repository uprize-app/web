import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "@/features/project-list/api/project.api";
import { projectListQueryKey } from "@/features/project-list/hooks/useProjectList.query";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation<{ id: string }, Error, string>({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectListQueryKey });
    },
  });
};
