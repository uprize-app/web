import { apiClient } from "@/shared/lib/apiClient";
import type {
  CreateProjectRequest,
  Project,
} from "@/shared/types/api.types";

export const fetchProjectList = () =>
  apiClient.get<Project[]>("/api/projects");

export const fetchProject = (id: string) =>
  apiClient.get<Project>(`/api/projects/${id}`);

export const createProject = (body: CreateProjectRequest) =>
  apiClient.post<Project>("/api/projects", body);

export const deleteProject = (id: string) =>
  apiClient.delete<null>(`/api/projects/${id}`);
