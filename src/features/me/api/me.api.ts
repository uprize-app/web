import { apiClient } from "@/shared/lib/apiClient";
import type {
  Profile,
  UpdateProfileRequest,
} from "@/shared/types/api.types";

export const fetchMe = () => apiClient.get<Profile>("/api/me");

export const updateMe = (body: UpdateProfileRequest) =>
  apiClient.patch<Profile>("/api/me", body);
