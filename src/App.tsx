import { Routes, Route } from "react-router-dom";
import SigninPage from "./pages/auth/SigninPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import HomePage from "./pages/home/HomePage";
import GroupCreatePage from "./pages/group/GroupCreatePage";
import GroupeEditPage from "./pages/group/GroupEditPage";


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/group/create" element={<GroupCreatePage />} />
        <Route path="/group/:groupId/edit" element={<GroupeEditPage />} />
      </Routes>
    </>
  );
}
