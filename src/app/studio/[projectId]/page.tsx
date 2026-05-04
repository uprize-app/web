import { Suspense } from "react";

import { ProjectDetailView } from "@/features/project-detail/components/ProjectDetailView";

type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

const StudioProjectPage = async ({ params }: Props) => {
  const { projectId } = await params;

  return (
    <Suspense fallback={null}>
      <ProjectDetailView projectId={projectId} />
    </Suspense>
  );
};

export default StudioProjectPage;
