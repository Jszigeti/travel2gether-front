// AXIOS
import { useApi } from "../hooks/useApi/useApi";

// UTILS FUNCTIONS
import { customHandleError } from "../utils/customHandleError";

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
      throw new Error(
        customHandleError(error, "L'adresse email est déjà utilisée", 403)
      );
    }
  };

  const signin = async (body: UserInterface) => {
    try {
      const { data } = await api.post("signin", body);
      return data;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(error, {
          400: "Votre compte n'est pas vérifié, un nouveau mail vient de vous être envoyé",
          403: "Votre compte a été désactivé",
          404: "L'adresse email ou le mot de passe est incorrect",
        })
      );
    }
  };

  const me = async () => {
    try {
      const { data } = await api.post("me");
      return data;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(
          error,
          "Session expirée, veuillez vous reconnecter",
          401
        )
      );
    }
  };

  const signout = async () => {
    try {
      const { data } = await api.post("logout");
      return data;
    } catch (error: unknown) {
      throw new Error(
        customHandleError(
          error,
          "Session expirée, veuillez vous reconnecter",
          401
        )
      );
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
      const errorMessage = customHandleError(
        error,
        "L'adresse email ou le mot de passe est incorrect",
        403
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
      const errorMessage = customHandleError(
        error,
        "L'adresse email est déjà utilisée",
        403
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
      const errorMessage = customHandleError(
        error,
        "L'adresse email est déjà utilisée",
        403
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
      const errorMessage = customHandleError(
        error,
        "L'adresse email est déjà utilisée",
        403
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
      const errorMessage = customHandleError(
        error,
        "L'adresse email est déjà utilisée",
        403
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
      throw new Error(
        customHandleError(error, "L'adresse email est déjà utilisée", 403)
      );
    }
  };

  return {
    signup,
    signin,
    me,
    signout,
    accountVerification,
    forgotPassword,
    editPassword,
    getUser,
    editUser,
    deleteUser,
  };
}
