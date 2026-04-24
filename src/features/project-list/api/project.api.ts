import { apiDelete, apiGet, apiPatch, apiPost } from "@/shared/lib/apiClient";
import type {
  CreateProjectPayload,
  Project,
  UpdateProjectPayload,
} from "@/shared/types/project.types";

export const fetchProjectList = () => apiGet<Project[]>("/api/projects");

export const fetchProjectDetail = (id: string) => apiGet<Project>(`/api/projects/${id}`);

export const createProject = (payload: CreateProjectPayload) =>
  apiPost<Project, CreateProjectPayload>("/api/projects", payload);

export const updateProject = (id: string, payload: UpdateProjectPayload) =>
  apiPatch<Project, UpdateProjectPayload>(`/api/projects/${id}`, payload);

export const deleteProject = (id: string) => apiDelete<{ id: string }>(`/api/projects/${id}`);
