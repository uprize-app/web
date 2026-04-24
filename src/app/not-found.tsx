import Link from "next/link";
import { PlaceholderCard } from "@/shared/components/PlaceholderCard";

const NotFound = () => (
  <PlaceholderCard
    tag="404"
    title="페이지를 찾을 수 없어요."
    action={
      <Link
        href="/"
        className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-paper transition hover:bg-ink-2"
      >
        홈으로 <span aria-hidden="true">↗</span>
      </Link>
    }
  >
    <p>주소를 다시 확인해 주세요.</p>
  </PlaceholderCard>
);

export default NotFound;
