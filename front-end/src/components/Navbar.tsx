import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; avatarUrl: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Tạm thời set user vào localStorage nếu chưa có
      const tempUser = { name: "Người dùng", avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9MagkuGc5nFUrjBzZ-V8R93ntAPXpQd_2_A&s" };
      localStorage.setItem("user", JSON.stringify(tempUser));
      setUser(tempUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
        <img src="https://cryptologos.cc/logos/pepe-pepe-logo.png" alt="header_logo" className="w-20 h-20" />
        <div className="flex space-x-4">
            <Link to="/dashboard" className="text-[20px] font-bold px-4 py-2 hover:bg-gray-300 hover:text-black rounded">Danh sách học sinh</Link>
            <Link to="/results" className="text-[20px] font-bold px-4 py-2 hover:bg-gray-300 hover:text-black rounded">Danh sách lớp</Link>
            <Link to="/studyresult" className="text-[20px] font-bold px-4 py-2 hover:bg-gray-300 hover:text-black rounded">Kết quả học tập</Link>
            <Link to="/profile" className="text-[20px] font-bold px-4 py-2 hover:bg-gray-300 hover:text-black rounded">Hồ sơ cá nhân</Link>
        </div>
        </div>
        {user ? (
        <div className="relative flex items-center space-x-4">
            <img
            src={user.avatarUrl}
            alt="Avatar"
            className="w-20 h-20 rounded-full border-2 border-white cursor-pointer"
            onClick={() => navigate("/profile")}
            onMouseEnter={() => setMenuOpen(true)}
            />
            {menuOpen && (
            <div 
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-2"
                onMouseEnter={() => setMenuOpen(true)} 
                onMouseLeave={() => setMenuOpen(false)}
            >
                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Hồ sơ
                </Link>
                <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Cài đặt
                </Link>
                <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                Đăng xuất
                </button>
            </div>
            )}
        </div>
        ) : (
        <Link to="/login" className="hover:underline">Đăng nhập</Link>
        )}
    </nav>
  );
}