import { cn } from "@/lib/utils";

type Props = {
  title?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export const Panel = ({ title, action, className, children }: Props) => (
  <div className={cn("rounded-lg border border-line bg-white px-8 py-7", className)}>
    {title ? (
      <h3 className="display-italic mb-5 flex items-center justify-between text-[22px] tracking-[-0.01em] not-italic">
        <span>{title}</span>
        {action ? <span className="text-[12px] text-burn-500">{action}</span> : null}
      </h3>
    ) : null}
    {children}
  </div>
);
