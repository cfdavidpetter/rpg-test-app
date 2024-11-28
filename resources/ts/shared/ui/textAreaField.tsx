import { UseFormRegister } from "react-hook-form";
import React from "react";

interface TextAreaFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  error?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  classDiv?: string;
  classLabel?: string;
  classTextarea?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ name, label, register, error, required, placeholder, onChange, classDiv, classLabel, classTextarea }) => {
  return (
    <div className={classDiv}>
      <label htmlFor={name} className={(error ? 'text-red-900' : 'text-gray-900') + " block mb-2 text-sm font-medium dark:text-white " + classLabel}>
        {label}
      </label>
      <textarea
        className={(error ? 'bg-red-50 border border-red-300 text-red-900' : 'bg-gray-50 border border-gray-300 text-gray-900') + " focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-sm rounded-lg " + classTextarea}
        id={name}
        {...register(name, { required })}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
      />
      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>}
    </div>
  );
};

export default TextAreaField;