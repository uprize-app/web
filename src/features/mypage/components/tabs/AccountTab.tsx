"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useMe, useUpdateMe } from "@/features/me/hooks/useMe.query";
import { getSupabaseBrowser } from "@/shared/lib/supabase/client";

import { Panel } from "../Panel";
import { SectionHeader } from "../SectionHeader";

type Toggle = { id: string; name: string; desc: string; defaultOn: boolean };

const NOTIFICATIONS: ReadonlyArray<Toggle> = [
  { id: "n1", name: "프로젝트 생성 완료", desc: "렌더링이 완료되면 이메일 발송", defaultOn: true },
  { id: "n2", name: "결제 알림",          desc: "결제 7일 전 미리 알림",         defaultOn: true },
  { id: "n3", name: "주간 사용량 리포트", desc: "월요일 오전 9시 정기 발송",     defaultOn: false },
  { id: "n4", name: "신규 스타일 출시",   desc: "프리미엄 스타일 추가시 안내",    defaultOn: true },
];

const SECURITY: ReadonlyArray<Toggle> = [
  { id: "s1", name: "2단계 인증 (2FA)", desc: "SMS 또는 앱으로 본인 확인",      defaultOn: true },
  { id: "s2", name: "로그인 알림",      desc: "새 기기 접속시 이메일 발송",     defaultOn: true },
];

export const AccountTab = () => {
  const [toggles, setToggles] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    [...NOTIFICATIONS, ...SECURITY].forEach((t) => (init[t.id] = t.defaultOn));
    return init;
  });

  return (
    <div>
      <SectionHeader
        title={<>계정 <em className="not-italic display-italic text-burn-500">설정.</em></>}
        sub="개인 정보 · 알림 · 보안"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <ProfilePanel />

        <div className="flex flex-col gap-5">
          <Panel title="알림">
            {NOTIFICATIONS.map((t, i) => (
              <ToggleRow
                key={t.id}
                t={t}
                on={toggles[t.id]!}
                onChange={(v) => setToggles((s) => ({ ...s, [t.id]: v }))}
                last={i === NOTIFICATIONS.length - 1}
              />
            ))}
          </Panel>

          <Panel title="보안">
            {SECURITY.map((t, i) => (
              <ToggleRow
                key={t.id}
                t={t}
                on={toggles[t.id]!}
                onChange={(v) => setToggles((s) => ({ ...s, [t.id]: v }))}
                last={i === SECURITY.length - 1}
              />
            ))}
            <Button variant="ghost" size="sm" className="mt-4">
              비밀번호 변경
            </Button>
          </Panel>
        </div>
      </div>

      <SignOutPanel />

      <div className="mt-8 rounded-md border border-[#E5C2C0] bg-[#FBF4F3] px-7 py-6">
        <h4 className="display-italic m-0 mb-1.5 text-xl text-[#8A2F2A] not-italic">
          계정 삭제
        </h4>
        <p className="m-0 mb-3.5 text-[13px] text-ink-50">
          모든 프로젝트와 렌더링 자료가 영구히 삭제됩니다. 30일간 복구 가능합니다.
        </p>
        <button
          type="button"
          className="rounded-sm border border-[#C9554F] bg-transparent px-4 py-2 text-[13px] text-[#8A2F2A] transition hover:bg-[#C9554F] hover:text-paper"
        >
          계정 삭제 요청
        </button>
      </div>
    </div>
  );
};

const SignOutPanel = () => {
  const router = useRouter();
  const useDevAuth = process.env.NEXT_PUBLIC_USE_DEV_AUTH === "true";
  const [pending, setPending] = useState(false);

  if (useDevAuth) return null;

  const handleSignOut = async () => {
    setPending(true);
    await getSupabaseBrowser().auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="mt-8 flex items-center justify-between rounded-md border border-line bg-paper px-7 py-6">
      <div>
        <h4 className="display-italic m-0 mb-1.5 text-xl text-ink not-italic">
          로그아웃
        </h4>
        <p className="m-0 text-[13px] text-ink-50">
          현재 기기에서 세션을 종료합니다.
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignOut}
        disabled={pending}
      >
        {pending ? "로그아웃 중…" : "로그아웃"}
      </Button>
    </div>
  );
};

const ProfilePanel = () => {
  const { data: me, isLoading } = useMe();
  const updateMe = useUpdateMe();

  const [displayName, setDisplayName] = useState("");
  const [position, setPosition] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [savedToast, setSavedToast] = useState<"saved" | "error" | null>(null);

  // 서버 데이터 도착 시 폼에 반영
  useEffect(() => {
    if (me) {
      setDisplayName(me.displayName ?? "");
      setPosition(me.position ?? "");
      setCompanyName(me.companyName ?? "");
    }
  }, [me]);

  const handleSave = () => {
    setSavedToast(null);
    updateMe.mutate(
      {
        displayName: displayName.trim() || undefined,
        position: position.trim() || undefined,
        companyName: companyName.trim() || undefined,
      },
      {
        onSuccess: () => setSavedToast("saved"),
        onError: () => setSavedToast("error"),
      },
    );
  };

  return (
    <Panel title="프로필">
      <Field label="이름" value={displayName} onChange={setDisplayName} />
      <Field label="직책" value={position} onChange={setPosition} />
      <Field label="회사" value={companyName} onChange={setCompanyName} />
      <Field label="이메일" value={me?.email ?? ""} disabled />

      <div className="flex items-center gap-3">
        <Button
          variant="accent"
          size="sm"
          onClick={handleSave}
          disabled={updateMe.isPending || isLoading}
        >
          {updateMe.isPending ? "저장 중…" : "변경 사항 저장"}
        </Button>
        {savedToast === "saved" ? (
          <span className="font-mono text-[11px] tracking-[0.04em] text-[#4F8A6E]">
            ✓ 저장됨
          </span>
        ) : null}
        {savedToast === "error" ? (
          <span className="font-mono text-[11px] tracking-[0.04em] text-burn-500">
            저장 실패: {updateMe.error?.message ?? "알 수 없는 오류"}
          </span>
        ) : null}
      </div>
    </Panel>
  );
};

const Field = ({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
}) => (
  <div className="mb-[18px] flex flex-col gap-2">
    <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-50">
      {label}
    </label>
    <Input
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      disabled={disabled}
      readOnly={!onChange}
    />
  </div>
);

const ToggleRow = ({
  t,
  on,
  onChange,
  last,
}: {
  t: Toggle;
  on: boolean;
  onChange: (v: boolean) => void;
  last: boolean;
}) => (
  <div
    className={cn(
      "flex items-center justify-between py-4",
      !last && "border-b border-line",
    )}
  >
    <div>
      <div className="mb-1 text-sm font-medium">{t.name}</div>
      <div className="text-xs text-ink-50">{t.desc}</div>
    </div>
    <button
      type="button"
      onClick={() => onChange(!on)}
      aria-pressed={on}
      className={cn(
        "relative h-[22px] w-10 shrink-0 rounded-full transition-colors duration-300",
        on ? "bg-ink" : "bg-paper-2",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-all duration-300",
          on ? "left-[20px]" : "left-0.5",
        )}
      />
    </button>
  </div>
);
