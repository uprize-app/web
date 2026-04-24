import { PlaceholderCard } from "@/shared/components/PlaceholderCard";

const LoginPage = () => (
  <PlaceholderCard tag="Phase G" title="로그인은 맨 마지막에 붙입니다.">
    <p>
      개발 중에는 <code className="rounded bg-bg-2 px-1.5 py-0.5 text-xs">NEXT_PUBLIC_USE_DEV_AUTH=true</code>{" "}
      로 모든 API 호출이 허용됩니다.
    </p>
    <p>카카오 OAuth 는 Phase G (Supabase Provider · 미들웨어 가드) 단계에서 연결할 예정입니다.</p>
  </PlaceholderCard>
);

export default LoginPage;
