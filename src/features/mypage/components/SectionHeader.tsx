type Props = {
  title: React.ReactNode;
  sub?: string;
};

export const SectionHeader = ({ title, sub }: Props) => (
  <div className="mb-8 flex items-end justify-between border-b border-line pb-5">
    <h2 className="display-italic m-0 text-[36px] tracking-[-0.015em]">{title}</h2>
    {sub ? (
      <span className="font-mono text-[13px] tracking-[0.04em] text-ink-50">{sub}</span>
    ) : null}
  </div>
);
