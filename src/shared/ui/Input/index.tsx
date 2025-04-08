import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, className = '', ...props }: InputProps) => {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        {...props}
        className={`block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
          focus:outline-none focus:ring-1 focus:ring-calendar-blue focus:border-calendar-blue
          ${className}`}
      />
    </div>
  );
};
