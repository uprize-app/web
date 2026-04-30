"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSession } from "@/features/auth/hooks/useSession";

type StartCtaButtonProps = {
  variant?: "accent" | "default" | "ghost";
  size?: "sm" | "lg" | "default";
  iconSize?: number;
  label?: string;
  className?: string;
};

export const StartCtaButton = ({
  variant = "accent",
  size = "lg",
  iconSize = 16,
  label = "무료로 시작하기",
  className,
}: StartCtaButtonProps) => {
  const useDevAuth = process.env.NEXT_PUBLIC_USE_DEV_AUTH === "true";
  const { session, loading } = useSession();
  const isAuthed = useDevAuth || Boolean(session);

  const href = loading
    ? "/studio/new"
    : isAuthed
      ? "/studio/new"
      : "/login?next=/studio/new";

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link href={href}>
        {label}
        <ArrowRight size={iconSize} strokeWidth={1.6} />
      </Link>
    </Button>
  );
};
