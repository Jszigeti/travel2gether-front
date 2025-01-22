import { Typography, Textarea } from "@material-tailwind/react";
import { FormikProps } from "formik";
import FormikError from "./FormikError";

interface TextAreaInputProps<T> {
  title: string;
  name: string;
  formik: FormikProps<T>;
  placeholder: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TextAreaInput = <T extends Record<string, any>>({
  title,
  name,
  formik,
  placeholder,
}: TextAreaInputProps<T>) => {
  return (
    <div className="flex flex-col relative">
      <Typography variant="h6">{title}</Typography>
      <Textarea
        placeholder={placeholder}
        name={name}
        size="lg"
        value={formik.values.description}
        onChange={formik.handleChange}
        className="!border-blue"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <FormikError name={name} formik={formik} />
    </div>
  );
};

export default TextAreaInput;
