import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Panel } from "../Panel";
import { SectionHeader } from "../SectionHeader";

type Invoice = {
  id: string;
  item: string;
  date: string;
  amount: string;
  emphasized?: boolean;
};

const INVOICES: ReadonlyArray<Invoice> = [
  { id: "UP-INV-2604-0412", item: "Studio 플랜 · 2026.04", date: "2026.04.15", amount: "₩ 990,000", emphasized: true },
  { id: "UP-INV-2603-0312", item: "Studio 플랜 · 2026.03", date: "2026.03.15", amount: "₩ 990,000" },
  { id: "UP-INV-2602-0212", item: "Studio 플랜 · 2026.02", date: "2026.02.15", amount: "₩ 990,000" },
  { id: "UP-INV-2601-0112", item: "Sketch → Studio 업그레이드", date: "2026.01.15", amount: "₩ 990,000" },
  { id: "UP-INV-2512-1212", item: "Sketch 플랜 · 2025.12", date: "2025.12.15", amount: "₩ 290,000" },
];

export const BillingTab = () => (
  <div>
    <SectionHeader
      title={<>결제 &amp; <em className="not-italic display-italic text-burn-500">인보이스.</em></>}
      sub="자동 갱신 · 2026.05.15 · ₩ 990,000"
    />

    <div className="mb-9 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
      <Panel title="결제 수단">
        <div className="flex flex-col gap-3">
          <PaymentCard
            icon="VISA"
            title="**** **** **** 4827"
            sub="박상호 · 만료 09/28 · 기본 결제수단"
            action={<Button variant="ghost" size="sm">변경</Button>}
          />
          <PaymentCard
            icon="CORP"
            iconAccent
            title="한울개발 법인카드"
            sub="**** 1209 · 만료 03/27"
            action={<Button variant="ghost" size="sm">기본 설정</Button>}
          />
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-md border border-dashed border-ink-30 bg-white px-5 py-5 text-sm text-ink-50 transition hover:border-burn-500 hover:text-burn-500"
          >
            <span className="inline-flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 3v8M3 7h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              결제 수단 추가
            </span>
          </button>
        </div>
      </Panel>

      <Panel title="청구 정보">
        <dl className="m-0 flex flex-col gap-3.5 text-[13px]">
          <Row dt="상호" dd="한울개발 (주)" />
          <Row dt="사업자 번호" dd={<span className="font-mono">220-88-12047</span>} />
          <Row dt="대표자" dd="박상호" />
          <Row dt="세금계산서" dd={<span className="text-burn-500">자동 발행 ON</span>} />
          <Row dt="이메일 수신" dd="accounting@hanwool.kr" />
        </dl>
        <Button variant="ghost" size="sm" className="mt-5 w-full justify-center">
          청구 정보 수정
        </Button>
      </Panel>
    </div>

    <h3 className="display-italic m-0 mb-4 text-[22px] tracking-[-0.01em] not-italic">
      최근 인보이스
    </h3>
    <div className="rounded-lg border border-line bg-white">
      <div className="flex flex-col divide-y divide-line lg:hidden">
        {INVOICES.map((inv) => (
          <div key={inv.id} className="px-4 py-4">
            <div className="mb-3 flex flex-col gap-1">
              <span className="break-all font-semibold">{inv.id}</span>
              <span className="text-[13px] text-ink-50">{inv.item}</span>
            </div>
            <div className="grid gap-2 text-[13px]">
              <InvoiceRow label="결제일" value={inv.date} />
              <InvoiceRow
                label="금액"
                value={
                  inv.emphasized ? (
                    <em className="display-italic text-burn-500">{inv.amount}</em>
                  ) : (
                    inv.amount
                  )
                }
              />
              <InvoiceRow
                label="상태"
                value={
                  <span className="inline-flex items-center rounded-full border border-[#B8D9C5] bg-[#ECF6F0] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#2E6F50]">
                    ● 결제완료
                  </span>
                }
              />
            </div>
            <a className="mt-4 inline-flex text-[12px] text-burn-500" href="#">
              PDF ↓
            </a>
          </div>
        ))}
      </div>
      <table className="hidden w-full text-[13px] lg:table">
        <thead className="bg-paper-2">
          <tr>
            {["인보이스", "항목", "결제일", "금액", "상태", ""].map((h) => (
              <th
                key={h}
                className="px-6 py-4 text-left font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink-50"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {INVOICES.map((inv) => (
            <tr key={inv.id} className="border-t border-line transition-colors hover:bg-paper">
              <td className="px-6 py-4 font-semibold">{inv.id}</td>
              <td className="px-6 py-4">{inv.item}</td>
              <td className="px-6 py-4">{inv.date}</td>
              <td className={cn("px-6 py-4 display-italic text-[17px] not-italic")}>
                {inv.emphasized ? (
                  <em className="display-italic text-burn-500">{inv.amount}</em>
                ) : (
                  inv.amount
                )}
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full border border-[#B8D9C5] bg-[#ECF6F0] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#2E6F50]">
                  ● 결제완료
                </span>
              </td>
              <td className="px-6 py-4">
                <a className="text-[12px] text-burn-500" href="#">
                  PDF ↓
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Row = ({ dt, dd }: { dt: string; dd: React.ReactNode }) => (
  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
    <dt className="text-ink-50">{dt}</dt>
    <dd className="m-0 break-words font-medium sm:text-right">{dd}</dd>
  </div>
);

const InvoiceRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-start justify-between gap-4">
    <span className="font-mono text-[11px] text-ink-50">{label}</span>
    <span className="text-right">{value}</span>
  </div>
);

const PaymentCard = ({
  icon,
  iconAccent,
  title,
  sub,
  action,
}: {
  icon: string;
  iconAccent?: boolean;
  title: string;
  sub: string;
  action: React.ReactNode;
}) => (
  <div className="flex flex-col gap-4 rounded-md border border-line bg-white p-4 transition-colors hover:border-ink sm:flex-row sm:items-center sm:gap-5 sm:p-5">
    <div
      className={cn(
        "grid h-10 w-14 shrink-0 place-items-center rounded-sm font-mono text-[10px] tracking-[0.08em] text-paper",
        iconAccent
          ? "bg-gradient-to-br from-burn-600 to-burn-500"
          : "bg-gradient-to-br from-ink-90 to-ink-70",
      )}
    >
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <div className="font-mono text-sm">{title}</div>
      <div className="mt-1 break-words text-xs text-ink-50">{sub}</div>
    </div>
    <div className="sm:ml-auto">{action}</div>
  </div>
);
