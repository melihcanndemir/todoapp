import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = ({
  label,
  error,
  className = "",
  ...props
}: TextAreaProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm text-gray-600 dark:text-gray-400">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-2 rounded-lg
          bg-gray-50 dark:bg-gray-800
          text-gray-900 dark:text-white
          border border-gray-200 dark:border-gray-700
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
          ${error ? "border-red-500 dark:border-red-500" : ""}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500 dark:text-red-400">{error}</span>
      )}
    </div>
  );
};
