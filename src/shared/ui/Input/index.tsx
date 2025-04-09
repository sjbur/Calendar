import { InputHTMLAttributes, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, className = '', id, ...props }: InputProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        {...props}
        className={`block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
          focus:outline-none focus:ring-1 focus:ring-calendar-blue focus:border-calendar-blue
          ${className}`}
      />
    </div>
  );
};
