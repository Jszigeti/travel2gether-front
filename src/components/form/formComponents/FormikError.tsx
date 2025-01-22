import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormikProps } from "formik";

interface FormikErrorProps<T> {
  name: string;
  formik: FormikProps<T>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormikError = <T extends Record<string, any>>({
  name,
  formik,
}: FormikErrorProps<T>) => {
  const error = formik.errors[name];
  const touched = formik.touched[name];

  return (
    <>
      {touched && error ? (
        <FontAwesomeIcon
          icon={faCircleExclamation}
          className="absolute right-3 top-[40px] text-red-500"
        />
      ) : null}
      {touched && error && (
        <div className="mt-1 text-red-500">
          {typeof error === "string" && error}
        </div>
      )}
    </>
  );
};

export default FormikError;
