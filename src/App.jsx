import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import AllTaskPage from "./pages/allTask";
import NavSideFragment from "./fragments/NavSide";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import Profile from "./pages/profile";

function App() {
  const isRegisterPage =
    location.pathname === "/register" || location.pathname === "/login";

  return (
    <Router>
      {!isRegisterPage ? (
        <NavSideFragment>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/allTask" element={<AllTaskPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </NavSideFragment>
      ) : (
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
