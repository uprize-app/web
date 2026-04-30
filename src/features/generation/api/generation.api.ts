import { apiClient } from "@/shared/lib/apiClient";
import type {
  CreateExportResponse,
  Export,
  Generation,
} from "@/shared/types/api.types";

export const startGeneration = (projectId: string) =>
  apiClient.post<Generation>(`/api/projects/${projectId}/generations`);

export const fetchGeneration = (id: string) =>
  apiClient.get<Generation>(`/api/generations/${id}`);

export const fetchProjectGenerations = (projectId: string) =>
  apiClient.get<Generation[]>(`/api/projects/${projectId}/generations`);

export const fetchGenerationExports = (generationId: string) =>
  apiClient.get<Export[]>(`/api/generations/${generationId}/exports`);

export const exportGenerationPdf = (id: string) =>
  apiClient.post<CreateExportResponse>(
    `/api/generations/${id}/export/pdf`,
  );
