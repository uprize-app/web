"use client";

type DashboardHeaderProps = {
  count: number;
  onCreate: () => void;
};

export const DashboardHeader = ({ count, onCreate }: DashboardHeaderProps) => (
  <div className="dash-head">
    <div>
      <div className="dash-meta">워크스페이스</div>
      <h1 className="dash-h">
        프로젝트 <em>{count}건</em>
      </h1>
    </div>
    <div className="flex gap-2">
      <button type="button" className="btn-cta" onClick={onCreate}>
        새 프로젝트 <span className="arrow" aria-hidden="true">↗</span>
      </button>
    </div>
  </div>
);
