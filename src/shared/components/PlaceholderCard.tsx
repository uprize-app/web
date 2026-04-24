import type { ReactNode } from "react";

type PlaceholderCardProps = {
  tag: string;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
};

export const PlaceholderCard = ({ tag, title, children, action }: PlaceholderCardProps) => (
  <>
    <div aria-hidden="true" style={{ height: "var(--topbar-h)" }} />
    <main
      className="flex min-h-[calc(100vh-var(--topbar-h))] items-center justify-center px-6 py-16"
      aria-labelledby="placeholder-title"
    >
      <section className="w-full max-w-xl rounded-[28px] border border-line bg-paper p-10 text-center shadow-[0_18px_50px_-30px_rgba(21,20,15,0.35)]">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ink-soft">{tag}</p>
        <h1
          id="placeholder-title"
          className="mb-4 font-display text-3xl leading-tight text-ink md:text-4xl"
        >
          {title}
        </h1>
        {children ? (
          <div className="space-y-3 text-sm leading-relaxed text-ink-2">{children}</div>
        ) : null}
        {action ? <div className="mt-8 flex justify-center">{action}</div> : null}
      </section>
    </main>
  </>
);
