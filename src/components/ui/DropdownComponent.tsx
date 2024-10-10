// REACT HOOKS
import { useState } from "react";

// TYPES
import { FieldInputProps, FormikProps } from "formik";

// COMPONENTS
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// DROPDOWN INTERFACE
interface DropdownProps {
  options: Array<string>;
  field: FieldInputProps<string[]>;
  formik: FormikProps<any>;
  label: string;
  multiple?: boolean;
}

export default function Dropdown({
  options,
  field,
  formik,
  label,
  multiple = true,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (option: string) => {
    const selectedValues = formik.values[field.name];

    if (multiple) {
      const updatedValues = selectedValues.includes(option)
        ? selectedValues.filter((value: string) => value !== option)
        : [...selectedValues, option];
      formik.setFieldValue(field.name, updatedValues);
    } else {
      formik.setFieldValue(
        field.name,
        selectedValues.includes(option) ? [] : [option]
      );
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="border border-blue p-2 rounded-md cursor-pointer relative flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {formik.values[field.name].length > 0
          ? formik.values[field.name].join(", ")
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
          {options.map((option: string) => (
            <label
              key={option}
              className="flex items-center p-2 hover:bg-gray-100"
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                className="mr-2"
                checked={formik.values[field.name].includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
