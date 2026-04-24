import { PlaceholderCard } from "@/shared/components/PlaceholderCard";

type StudioSitePageProps = {
  params: Promise<{ projectId: string }>;
};

const StudioSitePage = async ({ params }: StudioSitePageProps) => {
  const { projectId } = await params;
  return (
    <PlaceholderCard tag="Phase D" title="부지 · 주변환경 편집">
      <p>
        프로젝트 ID: <code className="rounded bg-bg-2 px-1.5 py-0.5 text-xs">{projectId}</code>
      </p>
    </PlaceholderCard>
  );
};

export default StudioSitePage;
