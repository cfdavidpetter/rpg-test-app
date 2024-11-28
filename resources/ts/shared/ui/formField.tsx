import { UseFormRegister } from "react-hook-form";
import InputMask from 'react-input-mask';


interface FormFieldProps {
  name: string;
  label: string;
  type: string;
  register: UseFormRegister<any>;
  error?: string;
  required?: boolean;
  placeholder?: string;
  mask?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classDiv?: string;
  classLabel?: string;
  classInput?: string;
}

const FormField: React.FC<FormFieldProps> = ({ name, label, type, register, error, required, placeholder, mask, onChange, classDiv, classLabel, classInput }) => {
  return (
    <div className={classDiv}>
      { type !== 'hidden' &&
        <label htmlFor={name} className={(error ? 'text-red-900' : 'text-gray-900') + " block mb-2 text-sm font-medium dark:text-white " + classLabel}>
          {label}
        </label>
      }
      {mask ? (
        <InputMask
          mask={mask}
          maskPlaceholder=""
          className={(error ? 'bg-red-50 border border-red-300 text-red-900' : 'bg-gray-50 border border-gray-300 text-gray-900') + " focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-sm rounded-lg " + classInput}
          id={name}
          {...register(name, { required })}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
        />
      ) : 
        type === 'checkbox' ? (
          <div className="checkbox-wrapper">
            <input
              className={(error ? 'bg-red-50 border border-red-300 text-red-900' : 'bg-gray-50 border border-gray-300 text-gray-900') + " focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-sm rounded-lg checkbox-field " + classInput}
              type={type}
              id={name}
              {...register(name, { required })}
              placeholder={placeholder}
              required={required}
              onChange={onChange}
            />
          </div>
        ) : (
          <input
            className={(error ? 'bg-red-50 border border-red-300 text-red-900' : 'bg-gray-50 border border-gray-300 text-gray-900') + " focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-sm rounded-lg " + classInput}
            type={type}
            id={name}
            {...register(name, { required })}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
          />
        )
      }
      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;