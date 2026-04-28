"use client";

import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Panel } from "../Panel";
import { SectionHeader } from "../SectionHeader";

type Plan = {
  tag: string;
  name: React.ReactNode;
  desc: string;
  price: React.ReactNode;
  per: string;
  features: { label: string; off?: boolean }[];
  current?: boolean;
  cta: { label: string; variant: "default" | "accent" | "ghost"; disabled?: boolean };
};

const PLANS: ReadonlyArray<Plan> = [
  {
    tag: "01 · STARTER",
    name: "Sketch",
    desc: "개인 디벨로퍼·신규 검토용",
    price: <>₩290<span className="text-lg text-ink-50">,000</span></>,
    per: "/ 월",
    features: [
      { label: "월 3건 프로젝트" },
      { label: "HD 렌더 10회" },
      { label: "10GB 스토리지" },
      { label: "12p 요약 제안서" },
      { label: "사업성 모델", off: true },
    ],
    cta: { label: "다운그레이드", variant: "ghost" },
  },
  {
    tag: "02 · STUDIO",
    name: <em className="display-italic text-burn-500">Studio</em>,
    desc: "소규모 디벨로퍼·중견 시행사",
    price: <><em className="display-italic text-burn-500">₩990</em><span className="text-lg text-ink-50">,000</span></>,
    per: "/ 월",
    features: [
      { label: "월 10건 프로젝트" },
      { label: "4K 렌더 50회" },
      { label: "50GB 스토리지" },
      { label: "24p 설계 제안서 + 사업성 모델" },
      { label: "우선 처리 큐" },
    ],
    current: true,
    cta: { label: "현재 사용중", variant: "ghost", disabled: true },
  },
  {
    tag: "03 · ATELIER",
    name: <em className="display-italic text-burn-500">Atelier</em>,
    desc: "대형 시행사·자산운용·금융기관",
    price: "맞춤",
    per: "월 ₩2,900,000+",
    features: [
      { label: "무제한 프로젝트" },
      { label: "8K 렌더 무제한 / 1TB+" },
      { label: "프리미엄 스타일 라이브러리" },
      { label: "전담 건축가 1:1 컨설팅" },
      { label: "SSO·팀 권한 관리" },
    ],
    cta: { label: "상담 요청", variant: "accent" },
  },
];

const COMPARE_ROWS: ReadonlyArray<[string, string, string, string]> = [
  ["월간 프로젝트", "3건", "10건", "무제한"],
  ["렌더 해상도", "HD (1080p)", "4K", "8K + 동영상"],
  ["스토리지", "10GB", "50GB", "1TB+"],
  ["설계 제안서", "12p", "24p", "커스텀"],
  ["사업성 모델 (XLSX)", "—", "✓", "✓ + 시뮬레이션"],
  ["건축가 컨설팅", "—", "이메일", "1:1 전담"],
  ["SLA", "72h", "24h", "4h · 99.9%"],
];

export const PlanTab = () => (
  <div>
    <SectionHeader
      title={<>요금제 <em className="not-italic display-italic text-burn-500">비교 &amp; 변경.</em></>}
      sub="월간 결제 · 부가세 별도 · 언제든 변경 가능"
    />

    <div className="mb-8 grid gap-5 md:grid-cols-3">
      {PLANS.map((p) => (
        <div
          key={p.tag}
          className={cn(
            "relative rounded-lg border bg-white p-8 transition-all duration-500 ease-out-expo hover:border-ink hover:shadow-lift",
            p.current ? "border-burn-500 ring-[3px] ring-burn-100" : "border-line",
          )}
        >
          {p.current ? (
            <span className="absolute -top-2.5 left-7 rounded-sm bg-burn-500 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-paper">
              현재 플랜
            </span>
          ) : null}

          <div className="mb-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-burn-500">
            {p.tag}
          </div>
          <h3 className="display-italic m-0 mb-1.5 text-[30px] tracking-[-0.015em] not-italic">
            {p.name}
          </h3>
          <p className="mb-5 min-h-[36px] text-[13px] text-ink-50">{p.desc}</p>

          <div className="mb-6 flex items-baseline gap-2 border-y border-line py-4">
            <div className="display-italic text-[44px] leading-none tracking-[-0.02em] not-italic">
              {p.price}
            </div>
            <div className="font-mono text-[13px] text-ink-50">{p.per}</div>
          </div>

          <ul className="m-0 mb-7 flex flex-col gap-3 p-0 text-[13px]">
            {p.features.map((f) => (
              <li
                key={f.label}
                className={cn(
                  "flex items-start gap-2.5 leading-snug",
                  f.off && "text-ink-30",
                )}
              >
                {f.off ? (
                  <X size={12} strokeWidth={1.4} className="mt-0.5 shrink-0" />
                ) : (
                  <Check size={12} strokeWidth={1.6} className="mt-0.5 shrink-0 text-burn-500" />
                )}
                {f.label}
              </li>
            ))}
          </ul>

          <Button
            variant={p.cta.variant === "default" ? "default" : p.cta.variant === "accent" ? "accent" : "ghost"}
            size="sm"
            disabled={p.cta.disabled}
            className="w-full justify-center"
          >
            {p.cta.label}
          </Button>
        </div>
      ))}
    </div>

    <Panel title="플랜별 상세 비교">
      <table className="w-full text-[13px]">
        <thead>
          <tr>
            {["항목", "Sketch", "Studio", "Atelier"].map((h) => (
              <th
                key={h}
                className="border-b border-line py-3.5 text-left font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink-50"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map((row, i) => (
            <tr key={row[0]}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    "py-3.5",
                    i < COMPARE_ROWS.length - 1 && "border-b border-line",
                    j === 2 && "font-semibold text-ink",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  </div>
);
