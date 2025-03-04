// ROUTER
import { Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/protectedRoutes/ProtectRoute";

// COMPONENTS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FadeLoadingScreen from "./components/FadeLoadingScreen";

// PAGES ACCESS. TO EVERYONE
import HomePage from "./pages/home/HomePage";
import NoPage from "./NoPage";
import GroupPage from "./pages/group/GroupPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ResultPage from "./pages/result/ResultPage";

// PAGES ACCESS. WITHOUT BEING CONNECTED
import SignupPage from "./pages/auth/SignupPage";
import SigninPage from "./pages/auth/SigninPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ValidatePage from "./pages/auth/ValidatePage";

// PROTECTED PAGES
import MyProfilePage from "./pages/profile/MyProfilePage";
import MyProfileEditPage from "./pages/profile/MyProfileEditPage";
import MyProfileEditAccountPage from "./pages/profile/MyProfileEditAccountPage";
import MyProfileEditPasswordPage from "./pages/profile/MyProfileEditPasswordPage";
import MyProfileEditInfoPage from "./pages/profile/MyProfileEditInfoPage";
import MyProfileEditPrefPage from "./pages/profile/MyProfileEditPrefPage";
import NotificationPage from "./pages/profile/NotificationPage";
import GroupCreatePage from "./pages/group/GroupCreatePage";
import GroupChecklistPage from "./pages/group/GroupChecklistPage";
import GroupManagePage from "./pages/group/GroupManagePage";
import GroupEditPage from "./pages/group/GroupEditPage";
import GroupEditInfoPage from "./pages/group/GroupEditInfoPage";
import GroupEditPrefPage from "./pages/group/GroupEditPrefPage";
import StageCreatePage from "./pages/stage/StageCreatePage";
import StageChecklistPage from "./pages/stage/StageChecklistPage";
import StageEditPage from "./pages/stage/StageEditPage";
import StagePage from "./pages/stage/StagePage";
import useAuthContext from "./hooks/context/useAuthContext";
import PrivacyPolicyPage from "./pages/others/PrivacyPolicyPage";
import AboutPage from "./pages/others/AboutPage";
import ContactPage from "./pages/others/ContactUsPage";

export default function App() {
  const { isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src="/assets/logo/logo.svg" />
      </div>
    );
  }

  return (
    <>
      <FadeLoadingScreen isLoading={isLoading} />
      <Routes>
        {/* ROUTES ACCESS. TO EVERYONE */}
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NoPage />} />
        <Route path="/group/:groupId" element={<GroupPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

        {/* ROUTES ACCESS. WITHOUT BEING CONNECTED */}
        <Route element={<ProtectRoute isLoggedIn={true} />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/user-verification/:userId/:verificationToken"
            element={<ValidatePage />}
          />
          <Route
            path="/reset-password/:userId/:resetToken"
            element={<ResetPasswordPage />}
          />
        </Route>

        {/* PROTECTED ROUTES (REQUIRES BEING CONNECTED) */}
        <Route element={<ProtectRoute />}>
          <Route path="/my-profile" element={<MyProfilePage />} />
          <Route
            path="/my-profile/notifications"
            element={<NotificationPage />}
          />
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
          <Route
            path="/group/:groupId/stage/:stageId"
            element={<StagePage />}
          />
        </Route>
      </Routes>
      <ToastContainer closeOnClick={true} />
    </>
  );
}
