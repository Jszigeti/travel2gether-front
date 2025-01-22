import { Typography, Input } from "@material-tailwind/react";
import { FormikProps } from "formik";
import FormikError from "./FormikError";
import { capitalizeFirstLetters } from "../../../utils/capitalizeFirstLetter";

interface FormInputProps<T> {
  title?: string;
  name: string;
  inputType?: string;
  formik: FormikProps<T>;
  placeholder: string;
  capitalizeFirstLetter?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormInput = <T extends Record<string, any>>({
  title,
  name,
  inputType = "text",
  formik,
  placeholder,
  capitalizeFirstLetter = false,
}: FormInputProps<T>) => {
  return (
    <div className="flex flex-col relative">
      {title && <Typography variant="h6">{title}</Typography>}
      <Input
        size="lg"
        placeholder={placeholder}
        type={inputType}
        name={name}
        data-cy={name}
        value={formik.values[name]}
        onChange={
          capitalizeFirstLetter
            ? (e) => {
                formik.setFieldValue(
                  name,
                  capitalizeFirstLetters(e.target.value)
                );
              }
            : formik.handleChange
        }
        className={`!border-blue  ${
          formik.touched[name] && formik.errors[name] ? "!border-red-500" : null
        }`}
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        crossOrigin={undefined}
      />
      <FormikError name={name} formik={formik} />
    </div>
  );
};

export default FormInput;
