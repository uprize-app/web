import { apiGet } from "@/shared/lib/apiClient";
import type { SiteImage, SiteImageCategory } from "@/shared/types/siteImage.types";

export const fetchSiteImageList = (category?: SiteImageCategory) =>
  apiGet<SiteImage[]>("/api/site-images", category ? { category } : undefined);
