import { Route, Routes } from "react-router-dom";
import CreateGroup from "./pages/group/GroupCreatePage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/create-group" element={<CreateGroup />} />
      </Routes>
    </>
  );
}
