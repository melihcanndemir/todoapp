import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const variants = {
  primary:
    "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600",
  secondary:
    "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600",
  danger: "bg-red-500 text-white hover:bg-red-600",
  ghost:
    "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 bg-transparent",
};

const sizes = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

export const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-lg transition-all duration-200
        shadow-md hover:shadow-lg active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
