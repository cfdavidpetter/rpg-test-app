import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  options: SelectOption[];
  register: UseFormRegister<any>;
  error?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  classDiv?: string;
  classLabel?: string;
  classSelect?: string;
  defaultValue?: string;
}

const FormSelectField: React.FC<SelectFieldProps> = ({ name, label, options, register, error, required, placeholder, onChange, classDiv, classLabel, classSelect, defaultValue }) => {
  return (
    <div className={classDiv}>
      <label htmlFor={name} className={(error ? 'text-red-900' : 'text-gray-900') + " block mb-2 text-sm font-medium dark:text-white " + classLabel}>
        {label}
      </label>
      <select
        className={(error ? 'bg-red-50 border border-red-300 text-red-900' : 'bg-gray-50 border border-gray-300 text-gray-900') + " focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-sm rounded-lg " + classSelect}
        id={name}
        {...register(name, { required })}
        required={required}
        onChange={onChange}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(option => (
          <option key={option.value} value={option.value} selected={(option.label === defaultValue)}>{option.label}</option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>}
    </div>
  );
};

export default FormSelectField;