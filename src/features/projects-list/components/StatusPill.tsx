import { cn } from "@/lib/utils";

import type { ProjectStatus } from "../types/project.types";

const STYLES: Record<ProjectStatus, { className: string; label: string }> = {
  done:  { className: "border-[#B8D9C5] bg-[#ECF6F0] text-[#2E6F50]", label: "● 완료" },
  work:  { className: "border-burn-200 bg-burn-50 text-burn-700",     label: "◐ 생성중" },
  draft: { className: "border-line bg-white text-ink-50",             label: "● 초안" },
};

type Props = {
  status: ProjectStatus;
  className?: string;
};

export const StatusPill = ({ status, className }: Props) => {
  const { className: cls, label } = STYLES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]",
        cls,
        className,
      )}
    >
      {label}
    </span>
  );
};
