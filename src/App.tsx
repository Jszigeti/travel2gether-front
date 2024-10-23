// ROUTER
import { Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/protectedRoutes/ProtectRoute";

// PAGES ACCESS. TO EVERYONE
import HomePage from "./pages/home/HomePage";
import NoPage from "./NoPage";
import GroupPage from "./pages/group/GroupPage";
import ProfilePage from "./pages/profile/ProfilePage";

// PAGES ACCESS. WITHOUT BEING CONNECTED
import SignupPage from "./pages/auth/SignupPage";
import SigninPage from "./pages/auth/SigninPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// PROTECTED PAGES
import MyProfilePage from "./pages/profile/MyProfilePage";
import MyProfileEditPage from "./pages/profile/MyProfileEditPage";
import MyProfileEditAccountPage from "./pages/profile/MyProfileEditAccountPage";
import MyProfileEditPasswordPage from "./pages/profile/MyProfileEditPasswordPage";
import MyProfileEditInfoPage from "./pages/profile/MyProfileEditInfoPage";
import MyProfileEditPrefPage from "./pages/profile/MyProfileEditPrefPage";
import GroupCreatePage from "./pages/group/GroupCreatePage";
import GroupChecklistPage from "./pages/group/GroupChecklistPage";
import GroupManagePage from "./pages/group/GroupManagePage";
import GroupEditPage from "./pages/group/GroupEditPage";
import GroupEditInfoPage from "./pages/group/GroupEditInfoPage";
import GroupEditPrefPage from "./pages/group/GroupEditPrefPage";
import StageCreatePage from "./pages/stage/StageCreatePage";
import StageChecklistPage from "./pages/stage/StageChecklistPage";
import StageEditPage from "./pages/stage/StageEditPage";

export default function App() {
  return (
    <>
      <Routes>
        {/* ROUTES ACCESS. TO EVERYONE */}
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NoPage />} />
        <Route path="/group/:groupId" element={<GroupPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />

        {/* ROUTES ACCESS. WITHOUT BEING CONNECTED */}
        <Route element={<ProtectRoute isLoggedIn={true} />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* PROTECTED ROUTES (REQUIRES BEING CONNECTED) */}
        <Route element={<ProtectRoute />}>
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
          <Route path="/group/create" element={<GroupCreatePage />} />
          <Route
            path="/group/:groupId/checklist"
            element={<GroupChecklistPage />}
          />
          <Route path="/group/:groupId/manage" element={<GroupManagePage />} />
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
            path="/group/:groupId/stage/:stageId/checklist"
            element={<StageChecklistPage />}
          />
          <Route
            path="/group/:groupId/stage/:stageId/edit"
            element={<StageEditPage />}
          />
        </Route>
      </Routes>
    </>
  );
}
