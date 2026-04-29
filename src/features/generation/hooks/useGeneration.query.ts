"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  CreateExportResponse,
  Generation,
} from "@/shared/types/api.types";

import {
  exportGenerationPdf,
  fetchGeneration,
  startGeneration,
} from "../api/generation.api";

export const GENERATION_KEYS = {
  all: ["generations"] as const,
  detail: (id: string) => [...GENERATION_KEYS.all, "detail", id] as const,
};

export const useStartGeneration = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (projectId: string) => startGeneration(projectId),
    onSuccess: (gen) => {
      qc.setQueryData<Generation>(GENERATION_KEYS.detail(gen.id), gen);
    },
  });
};

const POLL_INTERVAL_MS = 5_000;

const isTerminal = (g: Generation | undefined) =>
  g?.status === "completed" || g?.status === "failed";

/** 5초 간격 폴링 — completed/failed 시 자동 중단 */
export const useGeneration = (id: string | null) =>
  useQuery({
    queryKey: GENERATION_KEYS.detail(id ?? ""),
    queryFn: () => fetchGeneration(id!),
    enabled: !!id,
    refetchInterval: (q) => (isTerminal(q.state.data) ? false : POLL_INTERVAL_MS),
    refetchIntervalInBackground: false,
  });

export const useExportGenerationPdf = () =>
  useMutation<CreateExportResponse, Error, string>({
    mutationFn: (generationId: string) => exportGenerationPdf(generationId),
  });
