import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";
import ClassList from "./pages/ClassList";
import Profile from "./pages/Profile";
import StudyResults from "./pages/StudentResult"
import GradeReport from "./pages/GradeReport"
import BaoCaoTongKetHocKi from "./pages/TongKetHocKi";

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
        <Route path="/studyresult" element={<StudyResults />} />
        <Route path="/gradereport" element={<GradeReport />} />
        <Route path="/tongkethocki" element={<BaoCaoTongKetHocKi />} />
      </Routes>
      {!hideNavbar && <Footer />}
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
