import { FormikProps } from "formik";
import { useState } from "react";

interface IUseAvatarInput<T> {
  formik: FormikProps<T>;
  pathPicture?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAvatarInput = <T extends Record<string, any>>({
  formik,
  pathPicture,
}: IUseAvatarInput<T>) => {
  // States
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Default avatar
  const defaultImage = pathPicture
    ? `${import.meta.env.VITE_API_BASE_URL}${pathPicture}`
    : "/assets/avatar/avatar.svg";

  // Image function
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("🚀 ~ handleImageChange ~ file:", file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      formik.setFieldValue("file", file);
    } else {
      setPreviewImage(null);
      formik.setFieldValue("file", null);
    }
  };

  return {
    previewImage,
    defaultImage,
    handleImageChange,
  };
};

export default useAvatarInput;
