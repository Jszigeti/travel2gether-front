// AXIOS
import { useApi } from "../hooks/useApi/useApi";

// UTILS FUNCTIONS
import { handleError } from "../utils/errorHandler";

// INTERFACES
import { UserInterface } from "../interfaces/User";
import { userDetails } from "../data/userDetails";

export function useAuthApi() {
  const api = useApi();

  const signup = async (body: UserInterface) => {
    try {
      const { data } = await api.post("signup", body);
      return data;
    } catch (error: unknown) {
      const errorMessage = handleError(
        error,
        403,
        "L'adresse email est déjà utilisée"
      );
      throw new Error(errorMessage);
    }
  };

  const signin = async (body: UserInterface) => {
    try {
      const { data } = await api.post("signin", body);
      return data;
    } catch (error: unknown) {
      const errorMessage = handleError(error, [400, 403, 404], {
        400: "Votre compte n'est pas vérifié, un nouveau mail vient de vous être envoyé",
        403: "Votre compte a été désactivé",
        404: "L'adresse email ou le mot de passe est incorrect",
      });
      throw new Error(errorMessage);
    }
  };

  const accountVerification = async (
    userId: string,
    verificationToken: string
  ) => {
    try {
      const { data } = await api.post(
        `user-verification/${userId}/${verificationToken}`
      );
      return data;
    } catch (error: unknown) {
      const errorMessage = handleError(
        error,
        403,
        "L'adresse email ou le mot de passe est incorrect"
      );
      throw new Error(errorMessage);
    }
  };

  const forgotPassword = async (body: UserInterface) => {
    try {
      // const { data } = await axios.post(`${uri}/users/forgot`, { body });
      // return data.body;
      return body;
    } catch (error: unknown) {
      const errorMessage = handleError(
        error,
        403,
        "L'adresse email est déjà utilisée"
      );
      throw new Error(errorMessage);
    }
  };

  const editPassword = async (id: number, body: UserInterface) => {
    try {
      // const { data } = await axios.put(`${uri}/users/${id}/password`, { body });
      // return data.body;
      return body;
    } catch (error: unknown) {
      const errorMessage = handleError(
        error,
        403,
        "L'adresse email est déjà utilisée"
      );
      throw new Error(errorMessage);
    }
  };

  const getUser = async (id: number) => {
    try {
      // const { data } = await axios.post(`${uri}/users/${id}`, { body });
      // return data.body;
      const data = userDetails;
      return data;
    } catch (error: unknown) {
      const errorMessage = handleError(
        error,
        403,
        "L'adresse email est déjà utilisée"
      );
      throw new Error(errorMessage);
    }
  };

  const editUser = async (id: number, body: UserInterface) => {
    try {
      // const { data } = await axios.put(`${uri}/users/${id}`, { body });
      // return data.body;
      return body;
    } catch (error: unknown) {
      const errorMessage = handleError(
        error,
        403,
        "L'adresse email est déjà utilisée"
      );
      throw new Error(errorMessage);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      // const { data } = await axios.delete(`${uri}/users/${id}`);
      // return data;
      return id;
    } catch (error: unknown) {
      const errorMessage = handleError(
        error,
        403,
        "L'adresse email est déjà utilisée"
      );
      throw new Error(errorMessage);
    }
  };

  return {
    signup,
    signin,
    accountVerification,
    forgotPassword,
    editPassword,
    getUser,
    editUser,
    deleteUser,
  };
}
