import type { SelectHTMLAttributes, ReactNode } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  label?: string;
}

export const Select = ({
  children,
  label,
  className = "",
  ...props
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm text-gray-600 dark:text-gray-400">
          {label}
        </label>
      )}
      <select
        className={`
          px-3 py-2 rounded-lg
          bg-gray-50 dark:bg-gray-800
          text-gray-900 dark:text-white
          border border-gray-200 dark:border-gray-700
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};
