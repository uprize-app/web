export type SiteImageCategory =
  | "ocean"
  | "mountain"
  | "city"
  | "park"
  | "market"
  | "river"
  | "countryside";

export type SiteImage = {
  id: string;
  name: string;
  imageUrl: string;
  category: SiteImageCategory;
  displayOrder: number;
};

export const SITE_IMAGE_CATEGORIES: { id: SiteImageCategory; label: string }[] = [
  { id: "ocean", label: "바다" },
  { id: "mountain", label: "산" },
  { id: "city", label: "시티" },
  { id: "park", label: "공원" },
  { id: "market", label: "시장" },
  { id: "river", label: "강변" },
  { id: "countryside", label: "근교" },
];
