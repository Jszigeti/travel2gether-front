import { Routes, Route } from "react-router-dom";
import SigninPage from "./pages/auth/SigninPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </>
  );
}
