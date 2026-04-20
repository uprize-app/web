"use client";

type Step = { label: string; pct: number };

const STEPS: Step[] = [
  { label: "법규 분석", pct: 18 },
  { label: "매스 구성", pct: 38 },
  { label: "외장 디자인", pct: 62 },
  { label: "4각도 렌더링", pct: 88 },
  { label: "품질 검증", pct: 100 },
];

type Props = {
  show: boolean;
  progress: number;
};

export function LoadingOverlay({ show, progress }: Props) {
  const currentStep = STEPS.find((s) => progress < s.pct)?.label ?? "완료";

  return (
    <div
      className={`loading-overlay ${show ? "show" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="loading-title"
      aria-describedby="loading-progress"
      aria-hidden={!show}
    >
      <div className="loading-card">
        <div className="loading-meta">생성중 · UPRIZE A.I.</div>
        <h2 className="loading-h" id="loading-title">
          당신의 건물을
          <br />
          <em>그리고 있습니다.</em>
        </h2>
        <div
          className="loading-bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          aria-valuetext={`${Math.round(progress)}% · ${currentStep}`}
          id="loading-progress"
        >
          <div className="loading-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="loading-steps" aria-live="polite" aria-atomic="false">
          {STEPS.map((s, i) => {
            const done = progress >= s.pct;
            const active = !done && (i === 0 || progress >= STEPS[i - 1].pct);
            return (
              <div
                key={i}
                className={`loading-step ${active ? "active" : ""} ${done ? "done" : ""}`}
              >
                <div className="marker" aria-hidden="true" />
                {s.label}
                {active ? <span className="sr-only"> · 진행중</span> : null}
                {done ? <span className="sr-only"> · 완료</span> : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
