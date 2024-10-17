import { Routes, Route } from "react-router-dom";
import NoPage from "./NoPage";
import SignupPage from "./pages/auth/SignupPage";
import SigninPage from "./pages/auth/SigninPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import HomePage from "./pages/home/HomePage";
import GroupCreatePage from "./pages/group/GroupCreatePage";
import GroupEditPage from "./pages/group/GroupEditPage";
import GroupEditInfoPage from "./pages/group/GroupEditInfoPage";
import GroupEditPrefPage from "./pages/group/GroupEditPrefPage";
import ProfilePage from "./pages/user/ProfilePage";
import StageCreatePage from "./pages/stage/StageCreatePage";
import StageEditPage from "./pages/stage/StageEditPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/a" element={<ProfilePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/group/create" element={<GroupCreatePage />} />
        <Route path="/group/:groupId/edit" element={<GroupEditPage />} />
        <Route
          path="/group/:groupId/edit/info"
          element={<GroupEditInfoPage />}
        />
        <Route
          path="/group/:groupId/edit/pref"
          element={<GroupEditPrefPage />}
        />
        <Route
          path="/group/:groupId/stage/create"
          element={<StageCreatePage />}
        />
        <Route
          path="/group/:groupId/stage/:stageId/edit"
          element={<StageEditPage />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}
