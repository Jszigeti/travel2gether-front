// REACT HOOKS
//import { useState } from "react";

// AXIOS FUNCTIONS
//import { sendMessageToUser } from "../../api/message"

// FORMIK + YUP
//import { useFormik } from "formik";
//import { object, string } from "yup";

// COMPONENTS
import { Input, Button } from "@material-tailwind/react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function MessageBarForm() {
  // STATES
  //const [error, setError] = useState<null | string>(null);

  // FORM LOGIC
  /*const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: object({
      content: string().required("Email requis"),
    }),
    onSubmit: async (values) => {
      try {
        setError(null);
        const response = await sendMessageToUser(values);
        console.log("Message envoyé avec succès", response);
        formik.resetForm();
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Une erreur inconnue est survenue");
        }
        console.log(error);
      }
    },
  });*/

  return (
    <form
      className="w-80 max-w-screen-lg sm:w-96 flex flex-col gap-6"
      /*onSubmit={formik.handleSubmit}*/
    >
      <div className="flex flex-col relative">
        <Input
          size="lg"
          placeholder="Votre message..."
          name="content"
          //value={formik.values.email}
          //onChange={formik.handleChange}
          /*className={`!border-blue ${
            formik.touched.email && formik.errors.email
              ? "!border-red-500"
              : null
          }`}*/
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          crossOrigin={undefined}
        />
        {/*formik.touched.email && formik.errors.email ? (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="absolute right-3 top-[40px] text-red-500"
          />
        ) : null*/}
        {/*formik.errors.email && formik.touched.email && (
          <div className="mt-1 text-red-500">{formik.errors.email}</div>
        )*/}
      </div>
      <Button className="bg-blue font-montserrat" fullWidth type="submit">
        Envoyer
      </Button>
      {/*error && (
        <div className="text-red-500 text-center">Une erreur est survenue</div>
      )*/}
    </form>
  );
}
