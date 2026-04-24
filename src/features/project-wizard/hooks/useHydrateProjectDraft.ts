"use client";

import { useEffect, useState } from "react";
import { useProjectDraftStore } from "@/features/project-wizard/stores/projectDraft.store";

export const useHydrateProjectDraft = (): boolean => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const result = useProjectDraftStore.persist.rehydrate();
    if (result && typeof (result as Promise<void>).finally === "function") {
      (result as Promise<void>).finally(() => setHydrated(true));
      return;
    }
    setHydrated(true);
  }, []);

  return hydrated;
};
