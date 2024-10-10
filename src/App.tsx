import { Route, Routes } from "react-router-dom";
import GroupCreatePage from "./pages/group/GroupCreatePage";
import GroupeEditPage from "./pages/group/GroupEditPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/group/create" element={<GroupCreatePage />} />
        <Route path="/group/:groupId/edit" element={<GroupeEditPage />} />
      </Routes>
    </>
  );
}
