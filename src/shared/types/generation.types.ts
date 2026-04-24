export type GenerationStatus = "pending" | "running" | "succeeded" | "failed";

export type Generation = {
  id: string;
  projectId: string;
  userId: string;
  imageUrl: string | null;
  imageStatus: GenerationStatus;
  imageError: string | null;
  designText: string | null;
  textStatus: GenerationStatus;
  textError: string | null;
  createdAt: string;
  updatedAt: string;
};
