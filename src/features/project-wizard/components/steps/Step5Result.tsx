"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useStartGeneration } from "@/features/generation/hooks/useGeneration.query";
import { useCreateProject } from "@/features/projects-list/hooks/useProjectList.query";

import { buildCreatePayload } from "../../lib/buildCreatePayload";
import { useWizardDraftStore } from "../../stores/wizardDraft.store";

import { WizardStepHead } from "../WizardStepHead";

export const Step5Result = () => {
  const router = useRouter();
  const draft = useWizardDraftStore();

  const [projectId, setProjectId] = useState<string | null>(null);
  const [generationRequested, setGenerationRequested] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProject = useCreateProject();
  const startGen = useStartGeneration();
  const isStarting = createProject.isPending || startGen.isPending;

  const handleStart = async () => {
    setError(null);
    setGenerationRequested(true);
    try {
      let pid = projectId;
      if (!pid) {
        const result = buildCreatePayload(draft);
        if (!result.ok) {
          setGenerationRequested(false);
          setError(result.reason);
          return;
        }
        const project = await createProject.mutateAsync(result.payload);
        pid = project.id;
        setProjectId(pid);
      }
      await startGen.mutateAsync(pid);
      router.push(`/studio/${pid}`);
    } catch (e) {
      setGenerationRequested(false);
      setError(e instanceof Error ? e.message : "건물 미리보기 준비 실패");
    }
  };

  return (
    <div className="animate-fade-up">
      <WizardStepHead
        step={5}
        title={
          <>
            건물을{" "}
            <em className="not-italic display-italic text-burn-500">미리</em>
            지어봅니다.
          </>
        }
        description="요청 후 프로젝트 화면에서 생성 상황과 결과를 확인할 수 있습니다."
      />

      <div className="w-full rounded-md border border-dashed border-line bg-paper-2 px-6 py-7 text-center">
        {!generationRequested ? (
          <>
            <Sparkles
              size={28}
              strokeWidth={1.4}
              className="mx-auto mb-3 text-burn-500"
            />
            <p className="mb-4 text-[14px] text-ink-50">
              준비가 끝났어요. 아래 버튼을 누르면 프로젝트를 저장하고 건물 이미지를 만들어봅니다.
            </p>
            <Button
              variant="accent"
              size="sm"
              onClick={handleStart}
              disabled={isStarting}
            >
              {createProject.isPending
                ? "프로젝트 저장 중…"
                : startGen.isPending
                  ? "건물 준비 중…"
                  : "건물 지어보기"}
            </Button>
          </>
        ) : (
          <div>
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full border border-line bg-white">
              {isStarting ? (
                <Loader2
                  size={20}
                  strokeWidth={1.7}
                  className="animate-spin text-burn-500"
                />
              ) : (
                <Building2
                  size={20}
                  strokeWidth={1.7}
                  className="text-burn-500"
                />
              )}
            </div>
            <p className="font-medium text-ink">건물 이미지를 준비하고 있어요.</p>
            <p className="mx-auto mt-2 max-w-[420px] text-[13px] leading-6 text-ink-50">
              프로젝트를 저장하고 생성 요청을 접수하는 중입니다. 잠시 후 프로젝트 화면으로 이동합니다.
            </p>
          </div>
        )}
      </div>

      {error ? (
        <div className="mt-6 rounded-md border border-burn-200 bg-burn-50 px-4 py-2.5 text-[13px] text-burn-700">
          {error}
        </div>
      ) : null}
    </div>
  );
};
