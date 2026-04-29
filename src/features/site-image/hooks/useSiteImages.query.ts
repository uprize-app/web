"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchSiteImages } from "../api/siteImage.api";
import type { SiteImageCategory } from "@/shared/types/api.types";

export const SITE_IMAGE_KEYS = {
  all: ["site-images"] as const,
  list: (category?: SiteImageCategory) =>
    [...SITE_IMAGE_KEYS.all, "list", category ?? null] as const,
};

export const useSiteImages = (category?: SiteImageCategory) =>
  useQuery({
    queryKey: SITE_IMAGE_KEYS.list(category),
    queryFn: () => fetchSiteImages({ category }),
    staleTime: 5 * 60_000, // 카탈로그는 자주 안 바뀜
  });
