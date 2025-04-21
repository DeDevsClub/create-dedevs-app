import React from "react";
import { type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/cn";
import { buttonVariants } from "@/components/ui/button";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  color?: 'primary' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'icon' | 'icon-sm';
}

const Button = (
  { className, color, size, asChild = false, ...props }: ButtonProps
) => {  
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ color, size, className }))}
      {...props}
    />
  );
};

export default Button;
