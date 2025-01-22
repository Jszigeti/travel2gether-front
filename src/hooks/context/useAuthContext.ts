import { useContext } from "react";
import AuthContext from "./auth.context";

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
