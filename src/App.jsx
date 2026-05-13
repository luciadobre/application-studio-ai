import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetupPage from "./pages/SetupPage";
import AppPage from "./pages/AppPage";
import WorkspacePage from "./pages/WorkspacePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/workspace" element={<WorkspacePage />} />
        <Route path="/" element={<SetupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
