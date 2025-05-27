import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface DatePickerProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  min,
  max,
  className = "",
  required = false,
  placeholder,
}) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Apply custom styles to the calendar button via CSS variables
  useEffect(() => {
    if (inputRef.current) {
      // Add a custom class to help target the input
      inputRef.current.classList.add('custom-date-input');
      
      // Set the color-scheme property directly on the input element
      // This helps browsers know which theme to use for built-in UI elements
      const htmlElement = document.documentElement;
      
      const updateColorScheme = () => {
        const isDarkMode = htmlElement.classList.contains('dark');
        inputRef.current?.style.setProperty('color-scheme', isDarkMode ? 'dark' : 'light');
      };
      
      // Initial setup
      updateColorScheme();
      
      // Set up a mutation observer to watch for class changes on the html element
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            updateColorScheme();
          }
        });
      });
      
      observer.observe(htmlElement, { attributes: true });
      
      return () => {
        observer.disconnect();
      };
    }
  }, []);
  
  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          required={required}
          placeholder={placeholder || t("selectDate")}
          aria-label={placeholder || t("selectDate")}
          className={`w-full px-4 py-2 
                     bg-gray-100 dark:bg-gray-800 rounded-lg 
                     text-gray-900 dark:text-gray-100 border border-gray-300 
                     dark:border-gray-600 
                     hover:border-gray-400 dark:hover:border-gray-500 
                     focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:focus:ring-blue-400 
                     focus:border-blue-500 dark:focus:border-blue-400 
                     active:ring-blue-600 dark:active:ring-blue-300 
                     disabled:opacity-70 disabled:cursor-not-allowed 
                     transition-all duration-200 ease-in-out 
                     shadow-sm dark:shadow-gray-900/30 
                     backdrop-blur-sm dark:backdrop-blur-sm 
                     appearance-none
                     custom-date-input ${className}`}
          style={{ colorScheme: 'auto' }}
        />

      </div>
    </div>
  );
};

// Add custom styles to fix the calendar button and picker dialog in both light and dark mode
const styles = `
  /* Force dark mode for date inputs when in dark mode */
  .dark input[type="date"] {
    color-scheme: dark;
  }
  
  /* Force light mode for date inputs when in light mode */
  :not(.dark) input[type="date"] {
    color-scheme: light;
  }
  /* Default (Light Mode) - Calendar icon should be BLACK SVG */
  .custom-date-input::-webkit-calendar-picker-indicator {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black' width='18px' height='18px'%3e%3cpath d='M0 0h24v24H0z' fill='none'/%3e%3cpath d='M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.8;
    cursor: pointer;
    filter: none !important; /* Remove any inherited filter */
  }
  
  /* Dark Mode - Calendar icon should be WHITE SVG */
  .dark .custom-date-input::-webkit-calendar-picker-indicator {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' width='18px' height='18px'%3e%3cpath d='M0 0h24v24H0z' fill='none'/%3e%3cpath d='M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.8;
    filter: none !important; /* Remove any inherited filter */
  }
  
  /* Hover states */
  input[type="date"]::-webkit-calendar-picker-indicator:hover,
  .dark input[type="date"]::-webkit-calendar-picker-indicator:hover {
    opacity: 1;
  }
  
  /* Style the date picker dialog for Webkit browsers */
  ::-webkit-datetime-edit { padding: 0; }
  ::-webkit-datetime-edit-fields-wrapper { background: transparent; }
  ::-webkit-datetime-edit-text { color: currentColor; opacity: 0.8; }
  ::-webkit-datetime-edit-month-field { color: currentColor; }
  ::-webkit-datetime-edit-day-field { color: currentColor; }
  ::-webkit-datetime-edit-year-field { color: currentColor; }
  
  /* Calendar popup styles - this works in some browsers that support the ::-webkit-calendar-picker */
  ::-webkit-calendar-picker {
    background-color: var(--background-color, #ffffff);
    color: var(--text-color, #000000);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  /* Dark mode calendar popup */
  .dark ::-webkit-calendar-picker {
    --background-color: #1f2937;
    --text-color: #f3f4f6;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }
  
  /* Firefox specific styles */
  @-moz-document url-prefix() {
    .custom-date-input {
      position: relative;
      color-scheme: light dark;
    }
    
    .dark .custom-date-input {
      color-scheme: dark;
    }
  }
`;

// Add the styles to the document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}

export default DatePicker;
