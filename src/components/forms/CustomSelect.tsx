import React from "react";

// Generic type to handle any dictionary matching your Record structure
interface SelectProps<T extends string> {
  label?: string;
  name: string;
  value: T | "";
  options: Record<T, { label: string }>;
  onChange: (value: T) => void;
  placeholder?: string;
  id?: string;
  allowEmptyOption?: boolean;
}

export default function CustomSelect<T extends string>({
  label,
  name,
  value,
  options,
  onChange,
  placeholder,
  id,
  allowEmptyOption: emptyOption = false,
}: SelectProps<T>) {
  // Convert the Record keys into an array for mapping
  const keys = Object.keys(options) as T[];

  return (
    <div className="flex flex-col gap-2 w-full font-sans">
      {label && (
        <label htmlFor={name} className="text-2xl font-medium text-black">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          id={id || name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          required
          className="w-full px-3 py-2 text-lg text-gray-600 bg-transparent border border-[#707070] appearance-none cursor-pointer focus:outline-none focus:border-black transition-colors"
        >
          <option value="" disabled={!emptyOption}>
            {placeholder || "Seleccione una opción"}
          </option>

          {keys.map((key) => (
            <option key={key} value={key}>
              {options[key].label}
            </option>
          ))}
        </select>

        {/* Tailwind-styled Custom Chevron */}
        <div className="absolute right-4 pointer-events-none text-gray-500">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
