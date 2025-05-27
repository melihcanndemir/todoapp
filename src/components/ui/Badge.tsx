import type { ButtonHTMLAttributes, ReactNode } from "react";

interface BadgeProps extends ButtonHTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  children: ReactNode;
}

const variants = {
  default: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200",
  success: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
  warning:
    "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
  danger: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
  info: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
};

const sizes = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
};

export const Badge = ({
  variant = "default",
  size = "sm",
  className = "",
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={`
        ${variants[variant]}
        ${sizes[size]}
        inline-flex items-center justify-center
        rounded-md font-medium
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};
