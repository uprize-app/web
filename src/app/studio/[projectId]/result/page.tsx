import { PlaceholderCard } from "@/shared/components/PlaceholderCard";

type StudioResultPageProps = {
  params: Promise<{ projectId: string }>;
};

const StudioResultPage = async ({ params }: StudioResultPageProps) => {
  const { projectId } = await params;
  return (
    <PlaceholderCard tag="Phase E · F" title="결과 · PDF · 이메일">
      <p>
        프로젝트 ID: <code className="rounded bg-bg-2 px-1.5 py-0.5 text-xs">{projectId}</code>
      </p>
    </PlaceholderCard>
  );
};

export default StudioResultPage;
