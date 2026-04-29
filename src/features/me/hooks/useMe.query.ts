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

export const useMe = () =>
  useQuery({
    queryKey: ME_KEYS.all,
    queryFn: fetchMe,
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
