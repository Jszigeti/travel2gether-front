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
import ProfilePage from "./pages/profile/ProfilePage";
import StageCreatePage from "./pages/stage/StageCreatePage";
import MyProfilePage from "./pages/profile/MyProfilePage";
import MyProfileEditPage from "./pages/profile/MyProfileEditPage";
import MyProfileEditAccountPage from "./pages/profile/MyProfileEditAccountPage";
import MyProfileEditInfoPage from "./pages/profile/MyProfileEditInfoPage";
import MyProfileEditPrefPage from "./pages/profile/MyProfileEditPrefPage";
import MyProfileEditPasswordPage from "./pages/profile/MyProfileEditPasswordPage";
import StageEditPage from "./pages/stage/StageEditPage";
import NotificationPage from "./pages/NotificationPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/a" element={<ProfilePage />} />
        <Route path="/my-profile" element={<MyProfilePage />} />
        <Route path="/my-profile/edit" element={<MyProfileEditPage />} />
        <Route
          path="/my-profile/edit/account"
          element={<MyProfileEditAccountPage />}
        />
        <Route
          path="/my-profile/edit/password"
          element={<MyProfileEditPasswordPage />}
        />
        <Route
          path="/my-profile/edit/info"
          element={<MyProfileEditInfoPage />}
        />
        <Route
          path="/my-profile/edit/pref"
          element={<MyProfileEditPrefPage />}
        />
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
        <Route
          path="/my-profile/notifications"
          element={<NotificationPage />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}
