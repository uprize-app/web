import { apiClient } from "@/shared/lib/apiClient";
import type {
  SiteImage,
  SiteImageCategory,
} from "@/shared/types/api.types";

type ListParams = {
  category?: SiteImageCategory;
};

export const fetchSiteImages = (params?: ListParams) =>
  apiClient.get<SiteImage[]>("/api/site-images", {
    params: params?.category ? { category: params.category } : undefined,
  });
