// REACT HOOKS
import { useState, useEffect, useRef } from "react";

// INTERFACES
import { FieldInputProps, FormikProps } from "formik";

// COMPONENTS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
// OPTIONS INTERFACE
interface Option {
  value: string;
  label: string;
}

// PROPS INTERFACE
interface DropdownProps {
  options: Array<Option>;
  field: FieldInputProps<string[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik?: FormikProps<any>;
  label?: string;
  multiple?: boolean;
}

export default function Dropdown({
  options,
  field,
  formik,
  label,
  multiple = true,
}: DropdownProps) {
  // STATES
  const [isOpen, setIsOpen] = useState(false);

  // DROPDOWN LIST REFERENCE
  const dropdownRef = useRef<HTMLDivElement>(null);

  // OPTIONS FUNCTIONS
  const handleCheckboxChange = (value: string) => {
    const selectedValues = formik?.values[field.name];
    if (multiple) {
      const updatedValues = selectedValues.includes(value)
        ? selectedValues.filter((v: string) => v !== value)
        : [...selectedValues, value];
      formik?.setFieldValue(field.name, updatedValues);
    } else {
      formik?.setFieldValue(
        field.name,
        selectedValues.includes(value) ? [] : [value]
      );
    }
  };

  // CLOSING DROPDOWN LIST FUNCTION
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="border border-blue p-2 rounded-md cursor-pointer relative flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {formik?.values[field.name].length > 0
          ? options
              .filter((option) =>
                formik?.values[field.name].includes(option.value)
              )
              .map((option) => option.label)
              .join(", ")
          : `Sélectionnez ${label}`}

        <FontAwesomeIcon
          size="sm"
          icon={faAngleDown}
          className={`transition-transform absolute duration-200 right-3 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full bg-white border mt-2 rounded shadow-lg max-h-48 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center p-2 hover:bg-gray-100"
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                className="mr-2"
                checked={formik?.values[field.name].includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
