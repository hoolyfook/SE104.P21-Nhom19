import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";
import ClassList from "./pages/ClassList";
import Profile from "./pages/Profile";

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/"; // Ẩn Navbar nếu đang ở trang login

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/results" element={<ClassList />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
