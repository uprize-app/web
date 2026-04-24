"use client";

type ProjectListEmptyProps = {
  onCreate: () => void;
};

export const ProjectListEmpty = ({ onCreate }: ProjectListEmptyProps) => (
  <div className="rounded-3xl border border-dashed border-line bg-paper p-12 text-center">
    <p className="mb-2 text-sm uppercase tracking-[0.3em] text-ink-soft">Empty</p>
    <h2 className="mb-2 text-xl font-semibold text-ink">아직 프로젝트가 없어요.</h2>
    <p className="mb-6 text-sm text-ink-2">
      지도에서 필지를 찍고 첫 프로젝트를 시작해보세요.
    </p>
    <button
      type="button"
      onClick={onCreate}
      className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper transition hover:bg-ink-2"
    >
      새 프로젝트 시작 <span aria-hidden="true">↗</span>
    </button>
  </div>
);

export const ProjectListLoading = () => (
  <div className="proj-grid" aria-busy="true" aria-live="polite">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="proj-card animate-pulse">
        <div className="proj-thumb bg-paper" />
        <div className="proj-info">
          <div className="mb-2 h-4 w-2/3 rounded bg-bg-2" />
          <div className="mb-3 h-3 w-1/2 rounded bg-paper" />
          <div className="h-3 w-1/3 rounded bg-paper" />
        </div>
      </div>
    ))}
  </div>
);

type ProjectListErrorProps = {
  message: string;
  onRetry: () => void;
};

export const ProjectListError = ({ message, onRetry }: ProjectListErrorProps) => (
  <div className="rounded-3xl border border-red-500/40 bg-red-50 p-10 text-center" role="alert">
    <p className="mb-2 text-sm uppercase tracking-[0.3em] text-red-700">Error</p>
    <h2 className="mb-2 text-xl font-semibold text-ink">프로젝트를 불러오지 못했어요.</h2>
    <p className="mb-6 text-sm text-ink-2">{message}</p>
    <button
      type="button"
      onClick={onRetry}
      className="rounded-full border border-line-strong bg-transparent px-5 py-2 text-sm font-semibold text-ink transition hover:bg-bg-2"
    >
      다시 시도
    </button>
  </div>
);
