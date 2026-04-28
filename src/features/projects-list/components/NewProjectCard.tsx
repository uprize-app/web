import Link from "next/link";
import { Plus } from "lucide-react";

export const NewProjectCard = () => (
  <Link
    href="/studio/new"
    className="group flex min-h-full items-center justify-center rounded-lg border border-dashed border-ink-30 bg-transparent px-8 py-16 text-center transition-all hover:border-burn-500 hover:border-solid hover:bg-burn-50"
  >
    <div>
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full border border-ink-30 text-ink transition-all duration-500 ease-out-expo group-hover:rotate-90 group-hover:border-burn-500 group-hover:bg-burn-500 group-hover:text-paper">
        <Plus size={20} strokeWidth={1.6} />
      </div>
      <div className="display-italic text-[26px] leading-tight not-italic">
        <em className="display-italic text-burn-500">새</em> 프로젝트
      </div>
      <div className="mt-1.5 text-[13px] text-ink-50">필지에서 시작 · 약 10분</div>
    </div>
  </Link>
);
