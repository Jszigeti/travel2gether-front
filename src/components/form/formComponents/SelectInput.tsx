import { Typography } from "@material-tailwind/react";
import Dropdown from "../../UI/DropdownComponent";
import { FormikProps } from "formik";

// Generic options interface
interface IOptions<T extends string> {
  value: T;
  label: string;
}

// Props interface
interface FormInputProps<T, O extends string> {
  title: string;
  label: string;
  options: IOptions<O>[];
  formik: FormikProps<T>;
  fieldName: Extract<keyof T, string>;
  multiple?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SelectInput = <T extends Record<string, any>, O extends string>({
  title,
  label,
  options,
  formik,
  fieldName,
  multiple = true,
}: FormInputProps<T, O>) => {
  return (
    <div className="flex flex-col">
      <Typography variant="h6">{title}</Typography>
      <Dropdown
        options={options}
        field={formik.getFieldProps(fieldName)}
        formik={formik}
        label={label}
        multiple={multiple}
      />
    </div>
  );
};

export default SelectInput;
