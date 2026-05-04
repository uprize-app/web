"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  Profile,
  UpdateProfileRequest,
} from "@/shared/types/api.types";

import { fetchMe, updateMe } from "../api/me.api";

export const ME_KEYS = {
  all: ["me"] as const,
};

type UseMeOptions = {
  enabled?: boolean;
};

export const useMe = (options: UseMeOptions = {}) =>
  useQuery({
    queryKey: ME_KEYS.all,
    queryFn: fetchMe,
    enabled: options.enabled ?? true,
    staleTime: 60_000,
  });

export const useUpdateMe = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateProfileRequest) => updateMe(body),
    onSuccess: (next: Profile) => {
      qc.setQueryData<Profile>(ME_KEYS.all, next);
    },
  });
};
