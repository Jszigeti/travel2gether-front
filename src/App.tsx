import { Routes, Route } from "react-router-dom";
import NoPage from "./NoPage";
import SignupPage from "./pages/auth/SignupPage";

export default function App() {
  return (
    <>
      <Routes>
        {
          <Route
            path="/signup"
            element={<SignupPage /*onSigninFormData={handleSigninFormData}*/ />}
          />
        }
        {<Route path="*" element={<NoPage />} />}
      </Routes>
    </>
  );
}
