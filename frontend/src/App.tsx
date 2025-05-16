import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/DanhSachNguoiDung";
import ClassList from "./pages/DanhSachLop";
import Profile from "./pages/Profile";
import StudyResults from "./pages/StudentResult"
import GradeReport from "./pages/GradeReport"
import BaoCaoTongKetHocKi from "./pages/TongKetHocKi";
import BangDiemComponent from "./pages/ScoreResult";
import DanhSachQuyDinh from "./pages/DanhSachQuyDinh";
import DanhSachMonHoc from "./pages/DanhSachMonHoc";
import PhanCongGiangVien from "./pages/PhanCongGiangVien";

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/"; // Ẩn Navbar nếu đang ở trang login

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/DanhSachQuyDinh" element={<DanhSachQuyDinh />} />
        <Route path="/DanhSachMonHoc" element={<DanhSachMonHoc />} />
        <Route path="/results" element={<ClassList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/studyresult" element={<StudyResults />} />
        <Route path="/gradereport" element={<GradeReport />} />
        <Route path="/tongkethocki" element={<BaoCaoTongKetHocKi />} />
        <Route path="/phanconggiangvien" element={<PhanCongGiangVien />} />

        <Route path="/BangDiem" element={<BangDiemComponent />} />
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
