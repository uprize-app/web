"use client";

import { Gallery } from "@/components/Gallery";

const noopToast = (message: string) => {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.info("[toast]", message);
  }
};

const GalleryPage = () => <Gallery toast={noopToast} />;

export default GalleryPage;
