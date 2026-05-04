import { cn } from "@/lib/utils";

type Props = {
  title?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export const Panel = ({ title, action, className, children }: Props) => (
  <div className={cn("min-w-0 rounded-lg border border-line bg-white px-4 py-5 sm:px-8 sm:py-7", className)}>
    {title ? (
      <h3 className="display-italic mb-5 flex flex-wrap items-center justify-between gap-2 text-[20px] tracking-normal not-italic sm:text-[22px]">
        <span className="min-w-0">{title}</span>
        {action ? <span className="shrink-0 text-[12px] text-burn-500">{action}</span> : null}
      </h3>
    ) : null}
    {children}
  </div>
);
