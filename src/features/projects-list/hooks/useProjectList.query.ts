"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createProject,
  deleteProject,
  fetchProject,
  fetchProjectList,
} from "../api/project.api";

import type {
  CreateProjectRequest,
  Project,
} from "@/shared/types/api.types";

export const PROJECT_KEYS = {
  all: ["projects"] as const,
  list: () => [...PROJECT_KEYS.all, "list"] as const,
  detail: (id: string) => [...PROJECT_KEYS.all, "detail", id] as const,
};

export const useProjectList = () =>
  useQuery({
    queryKey: PROJECT_KEYS.list(),
    queryFn: fetchProjectList,
    staleTime: 30_000,
  });

export const useProject = (id: string | undefined) =>
  useQuery({
    queryKey: PROJECT_KEYS.detail(id ?? ""),
    queryFn: () => fetchProject(id!),
    enabled: !!id,
  });

export const useCreateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateProjectRequest) => createProject(body),
    onSuccess: (project: Project) => {
      qc.setQueryData<Project[]>(PROJECT_KEYS.list(), (prev) =>
        prev ? [project, ...prev] : [project],
      );
      qc.setQueryData<Project>(PROJECT_KEYS.detail(project.id), project);
    },
  });
};

export const useDeleteProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: (_data, id) => {
      qc.setQueryData<Project[]>(PROJECT_KEYS.list(), (prev) =>
        prev ? prev.filter((p) => p.id !== id) : prev,
      );
    },
  });
};
