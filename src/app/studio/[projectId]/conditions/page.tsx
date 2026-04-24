import { PlaceholderCard } from "@/shared/components/PlaceholderCard";

type StudioConditionsPageProps = {
  params: Promise<{ projectId: string }>;
};

const StudioConditionsPage = async ({ params }: StudioConditionsPageProps) => {
  const { projectId } = await params;
  return (
    <PlaceholderCard tag="Phase D" title="조건 입력 · 스타일 선택">
      <p>
        프로젝트 ID: <code className="rounded bg-bg-2 px-1.5 py-0.5 text-xs">{projectId}</code>
      </p>
    </PlaceholderCard>
  );
};

export default StudioConditionsPage;
