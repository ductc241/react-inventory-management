import { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";
import { Spinner } from "../index";

const colorTypeStyles = {
  primary: {
    contained:
      "bg-orange-500 hover:bg-orange-500-hover border-orange-500 hover:border-orange-500-hover",
    outlined:
      "text-orange-500 border-orange-500 hover:text-orange-500-hover hover:border-orange-500-hover"
  },
  secondary: {
    contained: "bg-secondary border-secondary",
    outlined: "text-secondary border-secondary"
  },
  success: {
    contained: "bg-success border-success",
    outlined: "text-success border-success"
  },
  warning: {
    contained: "bg-warning border-warning",
    outlined: "text-warning border-warning"
  },
  error: {
    contained: "bg-error border-error",
    outlined: "text-error border-error"
  }
};

const variantStyles = {
  contained:
    "border border-solid text-white disabled:bg-disabled disabled:text-black disabled:cursor-auto disabled:border-disabled",
  outlined:
    "border border-solid disabled:text-disabled disabled:border disabled:border-solid disabled:border-disabled disabled:cursor-auto"
};

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  loading?: boolean;
  variant?: "contained" | "outlined";
  colorType?: "primary" | "secondary" | "success" | "warning" | "error";
  fullWidth?: boolean;
}

const Button = ({
  type = "button",
  disabled = false,
  className,
  loading = false,
  children,
  variant = "contained",
  colorType = "primary",
  fullWidth,
  ...props
}: ButtonProps) => {
  const defaultStyles = clsx(
    "px-8 py-3 h-12 rounded-lg leading-6 cursor-pointer relative",
    "inline-flex align-middle items-center justify-center",
    "focus-visible:outline-2 focus-visible:outline-orange-secondary",
    fullWidth ? "w-full" : "max-w-fit",
    variant === "contained"
      ? `${colorTypeStyles[colorType].contained} ${variantStyles.contained}`
      : `${colorTypeStyles[colorType].outlined} ${variantStyles.outlined}`,
    className
  );

  return (
    <button
      type={type}
      className={defaultStyles}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
