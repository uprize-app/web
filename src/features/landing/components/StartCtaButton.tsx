"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSession } from "@/features/auth/hooks/useSession";
import { startHrefForSession } from "@/features/auth/lib/authNavigation";

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
  const { session } = useSession();
  const href = startHrefForSession(session);

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link href={href}>
        {label}
        <ArrowRight size={iconSize} strokeWidth={1.6} />
      </Link>
    </Button>
  );
};
