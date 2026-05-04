"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  CreateExportResponse,
  Generation,
} from "@/shared/types/api.types";

import {
  exportGenerationPdf,
  fetchGeneration,
  fetchProjectGenerations,
  startGeneration,
} from "../api/generation.api";

export const GENERATION_KEYS = {
  all: ["generations"] as const,
  detail: (id: string) => [...GENERATION_KEYS.all, "detail", id] as const,
  projectList: (projectId: string) =>
    [...GENERATION_KEYS.all, "project", projectId, "list"] as const,
};

export const useStartGeneration = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (projectId: string) => startGeneration(projectId),
    onSuccess: (gen) => {
      qc.setQueryData<Generation>(GENERATION_KEYS.detail(gen.id), gen);
      qc.setQueryData<Generation[]>(
        GENERATION_KEYS.projectList(gen.projectId),
        (prev) =>
          prev
            ? [gen, ...prev.filter((item) => item.id !== gen.id)]
            : [gen],
      );
    },
  });
};

const POLL_INTERVAL_MS = 5_000;

const isTerminal = (g: Generation | undefined) =>
  g?.status === "completed" || g?.status === "failed";

const hasActiveGeneration = (generations: Generation[] | undefined) =>
  generations?.some((generation) => !isTerminal(generation)) ?? false;

/** 5초 간격 폴링 — completed/failed 시 자동 중단 */
export const useGeneration = (id: string | null) =>
  useQuery({
    queryKey: GENERATION_KEYS.detail(id ?? ""),
    queryFn: () => fetchGeneration(id!),
    enabled: !!id,
    refetchInterval: (q) => (isTerminal(q.state.data) ? false : POLL_INTERVAL_MS),
    refetchIntervalInBackground: false,
  });

export const useProjectGenerations = (projectId: string | undefined) =>
  useQuery({
    queryKey: GENERATION_KEYS.projectList(projectId ?? ""),
    queryFn: () => fetchProjectGenerations(projectId!),
    enabled: !!projectId,
    refetchInterval: (q) =>
      hasActiveGeneration(q.state.data) ? POLL_INTERVAL_MS : false,
    refetchIntervalInBackground: false,
    staleTime: 15_000,
  });

export const useExportGenerationPdf = () =>
  useMutation<CreateExportResponse, Error, string>({
    mutationFn: (generationId: string) => exportGenerationPdf(generationId),
  });
