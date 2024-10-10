import { useState, useEffect, useRef } from "react";
import { FieldInputProps, FormikProps } from "formik";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const dropdownRef = useRef<HTMLDivElement>(null); // Référence pour la liste déroulante

  // Fonction pour gérer la sélection des options
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

  // Fermer la liste déroulante lorsque l'on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Fermer la liste si le clic est en dehors
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Attacher l'événement

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Détacher lors du démontage
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
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
