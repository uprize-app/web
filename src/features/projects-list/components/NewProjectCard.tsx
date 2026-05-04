import Link from "next/link";
import { Plus } from "lucide-react";

export const NewProjectCard = () => (
  <Link
    href="/studio/new"
    className="group block overflow-hidden rounded-lg border border-dashed border-ink-30 bg-transparent text-center transition-all hover:border-burn-500 hover:border-solid hover:bg-burn-50"
  >
    <div className="grid aspect-[4/3] place-items-center border-b border-dashed border-ink-30 bg-paper-2 px-8 transition-colors group-hover:border-burn-200 group-hover:bg-burn-50">
      <div className="grid h-14 w-14 place-items-center rounded-full border border-ink-30 text-ink transition-all duration-500 ease-out-expo group-hover:rotate-90 group-hover:border-burn-500 group-hover:bg-burn-500 group-hover:text-paper">
        <Plus size={20} strokeWidth={1.6} />
      </div>
    </div>
    <div className="px-[22px] pb-[22px] pt-5">
      <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-50">
        새 프로젝트
      </div>
      <div className="display-italic mb-1.5 text-[24px] leading-tight tracking-[-0.015em] not-italic">
        <em className="display-italic text-burn-500">새</em> 프로젝트
      </div>
      <p className="mb-[18px] text-[13px] text-ink-50">필지에서 시작 · 약 10분</p>
      <div className="flex justify-center border-t border-line pt-4 font-mono text-[11px] text-ink-50">
        시작하기
      </div>
    </div>
  </Link>
);
