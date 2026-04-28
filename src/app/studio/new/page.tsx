import { Suspense } from "react";

import { NewProjectWizard } from "@/features/project-wizard/components/NewProjectWizard";

const StudioNewPage = () => (
  <Suspense fallback={null}>
    <NewProjectWizard />
  </Suspense>
);

export default StudioNewPage;
