type Props = {
  title: React.ReactNode;
  sub?: string;
};

export const SectionHeader = ({ title, sub }: Props) => (
  <div className="mb-8 flex flex-col items-start gap-2 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
    <h2 className="display-italic m-0 text-[28px] tracking-normal sm:text-[36px]">{title}</h2>
    {sub ? (
      <span className="font-mono text-[12px] tracking-[0.04em] text-ink-50 sm:text-[13px]">{sub}</span>
    ) : null}
  </div>
);
