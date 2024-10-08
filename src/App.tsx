import { Routes, Route } from "react-router-dom";
import SigninPage from "./pages/auth/SigninPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import HomePage from "./pages/home/HomePage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </>
  );
}
