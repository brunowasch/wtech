import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Repositories } from "./pages/Repositories";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/repository/:username/:repoName" element={<Repositories />} />
        <Route path="*" element={<h1>404: Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;