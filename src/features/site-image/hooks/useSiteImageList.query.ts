import { useQuery } from "@tanstack/react-query";
import { fetchSiteImageList } from "@/features/site-image/api/siteImage.api";
import type { SiteImage, SiteImageCategory } from "@/shared/types/siteImage.types";

export const siteImageListQueryKey = (category?: SiteImageCategory) =>
  category ? (["site-images", category] as const) : (["site-images"] as const);

export const useSiteImageList = (category?: SiteImageCategory) =>
  useQuery<SiteImage[]>({
    queryKey: siteImageListQueryKey(category),
    queryFn: () => fetchSiteImageList(category),
    staleTime: 5 * 60_000,
  });
