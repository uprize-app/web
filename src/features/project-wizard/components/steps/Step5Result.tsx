"use client";

import { Download } from "lucide-react";

import { DESIGN_STYLE_BY_ID } from "../../constants/designStyles";
import {
  computeMaxFloorArea,
  estimateBudgetEokWon,
  formatNumber,
} from "../../lib/format";
import { useWizardDraftStore } from "../../stores/wizardDraft.store";

import { ResultGallery } from "../result/ResultGallery";
import { WizardStepHead } from "../WizardStepHead";

const downloads = [
  { ext: "PDF", title: "설계 제안서 24p" },
  { ext: "PNG", title: "4K 렌더링" },
  { ext: "XLSX", title: "사업성 모델" },
] as const;

export const Step5Result = () => {
  const { projectName, lot, designStyle, siteInfo } = useWizardDraftStore();

  const styleName = designStyle
    ? DESIGN_STYLE_BY_ID.get(designStyle)?.name.split(" ")[0]
    : "—";
  const totalFloor = computeMaxFloorArea(siteInfo.areaSqm, siteInfo.far);
  const budget = estimateBudgetEokWon(totalFloor);

  return (
    <div className="animate-fade-up">
      <WizardStepHead
        step={5}
        title={
          <>
            AI가 <em className="not-italic display-italic text-burn-500">생성</em>
            합니다.
          </>
        }
        description="평균 8분. 완료되면 4K 렌더링과 24페이지 설계 제안서가 준비됩니다."
      />

      <div className="@container/result">
        <div className="grid gap-7 @[820px]/result:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.6fr)] @[820px]/result:items-stretch">
          <div className="aspect-[16/10] @[820px]/result:aspect-auto">
            <ResultGallery />
          </div>

          <aside className="flex flex-col gap-4 @[820px]/result:gap-4 @[820px]/result:flex-col">
            <SummaryCard
              projectName={projectName}
              jibun={lot?.jibun ?? "—"}
              styleName={styleName ?? "—"}
              areaSqm={siteInfo.areaSqm}
              floorsAbove={siteInfo.floorsAbove}
              floorsBelow={siteInfo.floorsBelow}
              budgetEok={budget}
            />

            <div className="rounded-md border border-line bg-white p-6">
              <h5 className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-50">
                다운로드
              </h5>
              <div className="flex flex-col gap-2">
                {downloads.map((d) => (
                  <a
                    key={d.ext}
                    href="#"
                    className="flex items-center justify-between rounded-sm border border-line px-4 py-3 text-[13px] transition hover:border-ink hover:bg-paper"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="rounded-sm bg-paper-2 px-1.5 py-0.5 font-mono text-[10px] text-ink-50">
                        {d.ext}
                      </span>
                      {d.title}
                    </span>
                    <Download size={14} strokeWidth={1.4} />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

type SummaryCardProps = {
  projectName: string;
  jibun: string;
  styleName: string;
  areaSqm: number;
  floorsAbove: number;
  floorsBelow: number;
  budgetEok: number;
};

const SummaryCard = ({
  projectName,
  jibun,
  styleName,
  areaSqm,
  floorsAbove,
  floorsBelow,
  budgetEok,
}: SummaryCardProps) => (
  <div className="flex flex-1 flex-col rounded-md border border-line bg-white p-6">
    <h5 className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-50">
      요약
    </h5>
    <dl className="flex flex-col gap-2.5 text-[13px]">
      <Row dt="프로젝트명" dd={projectName} />
      <Row dt="주소" dd={jibun} />
      <Row dt="스타일" dd={styleName} />
      <Row dt="대지면적" dd={`${formatNumber(Math.round(areaSqm))}㎡`} />
      <Row dt="층수" dd={`${floorsAbove}F / B${floorsBelow}`} />
      <Row
        dt="예상 사업비"
        dd={
          <em className="display-italic text-[18px] not-italic text-burn-500">
            {formatNumber(budgetEok)} 억원
          </em>
        }
      />
    </dl>
  </div>
);

const Row = ({ dt, dd }: { dt: string; dd: React.ReactNode }) => (
  <div className="flex justify-between gap-3">
    <span className="text-ink-50">{dt}</span>
    <span className="whitespace-nowrap font-medium">{dd}</span>
  </div>
);
