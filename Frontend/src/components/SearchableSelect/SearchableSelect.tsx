import { useState, useEffect } from "react";
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
  id?: string;
  value: string;
}

export const SearchableSelect = ({
  options,
  onSelect,
  containerClass,
  inputClass,
  listClass,
  placeholder,
  id,
  value,
}: SearchableSelectProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isListOpen, setIsListopen] = useState<boolean>(false);

  useEffect(() => {
    if (value !== undefined && value !== null && value !== "") {
      const matchedOption = options.find((opt) => opt.value === value);

      setSearchTerm(matchedOption ? matchedOption.label : String(value));
    } else {
      setSearchTerm("");
    }
  }, [value, options]);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsListopen(true); // Ensure list stays open while typing
  };

  const handleSelectOption = (opt: SelectOption) => {
    setSearchTerm(opt.label); // Update the input text to the selected label
    setIsListopen(false); // Close the dropdown
    onSelect(opt); // Execute the callback to update RHF
  };

  return (
    <div className={`select-wrapper ${containerClass}`}>
      <input
        id={id}
        type="text"
        className={inputClass}
        placeholder={placeholder}
        onChange={handleInputChange}
        onFocus={() => setIsListopen(true)}
        value={searchTerm}
      />

      {/* This list will be hidden/shown based on your logic */}
      {isListOpen && (
        <ul className={`suggestions-list ${listClass}`}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <li key={opt.value} onClick={() => handleSelectOption(opt)}>
                {opt.label}
              </li>
            ))
          ) : (
            <li className="no-results">No states found</li>
          )}
        </ul>
      )}
    </div>
  );
};
