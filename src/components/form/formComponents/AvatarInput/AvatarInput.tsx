import { Avatar, Input } from "@material-tailwind/react";
import { FormikProps } from "formik";
import useAvatarInput from "./useAvatarInput";

interface AvatarInputProps<T> {
  formik: FormikProps<T>;
  pathPicture?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AvatarInput = <T extends Record<string, any>>({
  formik,
  pathPicture,
}: AvatarInputProps<T>) => {
  const { previewImage, defaultImage, handleImageChange } = useAvatarInput({
    formik,
    pathPicture,
  });

  return (
    <div className="flex flex-col relative">
      {previewImage ? (
        <Avatar
          src={previewImage}
          alt="Aperçu de l'image"
          className="w-[110px] h-[110px] object-cover mx-auto mb-3"
        />
      ) : (
        <Avatar
          src={defaultImage}
          alt="Aperçu de l'image"
          className="w-[110px] h-[110px] object-cover mx-auto mb-3"
        />
      )}
      <Input
        crossOrigin={undefined}
        size="lg"
        type="file"
        placeholder="Votre photo d'avatar"
        className={`!border-blue  ${
          formik.touched.file && formik.errors.file ? "!border-red-500" : null
        }`}
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        onChange={handleImageChange}
        name="file"
      />
    </div>
  );
};

export default AvatarInput;
