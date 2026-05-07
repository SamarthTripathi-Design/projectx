import { useState } from "react";
import "./SearchableSelect.css";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SearchableSelectProps {
  options: SelectOption[]; // The data array
  placeholder?: string; // Optional text
  containerClass?: string; // Class for the wrapper (row styling)
  inputClass?: string; // Class for the text box
  listClass?: string; // Class for the floating dropdown
  onSelect: (option: SelectOption) => void; // How you send the choice back to the Form
}

export const SearchableSelect = ({
  options,
  onSelect,
  containerClass,
  inputClass,
  listClass,
  placeholder,
}: SearchableSelectProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filtereddData, setfiltereddata] = useState<string>("");

  return (
    <div className={`select-wrapper ${containerClass}`}>
      <input
        type="text"
        className={inputClass}
        placeholder={placeholder}
        // Logic for filtering goes here later
      />

      {/* This list will be hidden/shown based on your logic */}
      <ul className={`suggestions-list ${listClass}`}>
        {options.map((opt) => (
          <li key={opt.value} onClick={() => onSelect(opt)}>
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
