import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset shadow-professional hover:shadow-professional-lg",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-hover/90 shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80 focus-visible:ring-destructive/30",
        outline:
          "border border-border bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground active:bg-secondary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-hover/90",
        ghost:
          "hover:bg-secondary hover:text-secondary-foreground active:bg-secondary/80",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-hover shadow-none",
        success: "bg-success text-success-foreground hover:bg-success/90 active:bg-success/80",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 active:bg-warning/80",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-12 rounded-lg px-8 text-base has-[>svg]:px-6",
        icon: "size-10 rounded-md",
        "icon-sm": "size-8 rounded-md",
        "icon-lg": "size-12 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
