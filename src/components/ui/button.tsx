import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[10px] whitespace-nowrap rounded-md text-sm font-medium tracking-tight transition-all duration-200 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-ink text-paper border border-ink hover:bg-burn-500 hover:border-burn-500",
        accent:
          "bg-burn-500 text-white border border-burn-500 hover:bg-burn-600 hover:border-burn-600",
        outline:
          "bg-transparent text-ink border border-line hover:border-ink",
        ghost:
          "bg-transparent text-ink border border-line hover:border-ink",
        link:
          "h-auto p-0 border-0 rounded-none text-ink font-medium border-b border-ink pb-[2px] hover:text-burn-500 hover:border-burn-500",
        destructive:
          "bg-burn-600 text-paper border border-burn-600 hover:bg-burn-700",
        secondary:
          "bg-paper-2 text-ink border border-line hover:border-ink",
      },
      size: {
        default: "h-11 px-[22px] py-[14px]",
        sm: "h-9 px-[14px] py-[9px] text-[13px]",
        lg: "h-[52px] px-7 text-[15px]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
