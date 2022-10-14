import { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";

const variantStyles = {
  contained: "bg-green-500 hover:bg-green-600",
  warning: "bg-rose-500 hover:bg-rose-600",
  error: "bg-gray-500 hover:bg-gray-600"
};

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  loading?: boolean;
  variant?: "container" | "warning" | "error";
  fullWidth?: boolean;
}

const Button = ({
  type = "button",
  disabled = false,
  className,
  children,
  variant = "container",
  fullWidth,
  ...props
}: ButtonProps) => {
  const defaultStyles = clsx(
    "px-6 py-[7px] rounded-md leading-6 cursor-pointer text-white text-sm font-medium",
    "inline-flex align-middle items-center justify-center",
    "focus-visible:outline-2 focus-visible:outline-orange-secondary",
    fullWidth ? "w-full" : "max-w-fit",

    variant === "container" && `${variantStyles.contained}`,
    variant === "error" && `${variantStyles.error}`,
    variant === "warning" && `${variantStyles.warning}`,

    className
  );

  return (
    <button type={type} className={defaultStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
