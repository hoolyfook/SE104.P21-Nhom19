import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../src/api/axiosClient";
import { Cookie } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; avatarUrl: string } | null>(null);
  const [roleUser, setRoleUser] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const tempUser = {
        name: "Người dùng",
        avatarUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9MagkuGc5nFUrjBzZ-V8R93ntAPXpQd_2_A&s",
      };
      localStorage.setItem("user", JSON.stringify(tempUser));
      setUser(tempUser);
    }

    // Fetch role from API
    const fetchRole = async () => {
      try {
        const response = await axios.get('/users/role', {
          withCredentials: true, // Đảm bảo cookie được gửi kèm theo request
        });
        console.log(response.data.DT.GroupUsers.name);
        setRoleUser(response.data.DT.GroupUsers.name);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };
    fetchRole();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/users/logout", {withCredentials: true});
      localStorage.removeItem("user");
      document.cookie = "qlhs=; Path=/; Max-Age=0;";
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gray-700 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img
          src="https://image-cdn.solana.fm/images/?imageUrl=https://pbs.twimg.com/profile_images/1830748895015501824/99XU7XKo_400x400.jpg"
          alt="header_logo"
          className="w-20 h-20"
        />
        <div className="flex space-x-4">
          {/* Link chỉ cho admin */}
          {roleUser === "admin" && (
            <>
              <Link to="/dashboard" className="text-[20px] font-bold px-4 py-2 hover:bg-gray-300 hover:text-black rounded">
                Danh sách học sinh
              </Link>
              <Link to="/results" className="text-[20px] font-bold px-4 py-2 hover:bg-gray-300 hover:text-black rounded">
                Danh sách lớp
              </Link>
              <Link to="/studyresult" className="text-[20px] font-bold px-4 py-2 hover:bg-gray-300 hover:text-black rounded">
                Kết quả học tập
              </Link>
              <Link to="/gradereport" className="text-[20px] font-bold px-4 py-2 hover:bg-gray-300 hover:text-black rounded">
                Kết quả môn
              </Link>
              <Link to="/tongkethocki" className="text-[20px] font-bold px-4 py-2 hover:bg-gray-300 hover:text-black rounded">
                Báo cáo học kì
              </Link>
            </>
          )}

          {/* Link chỉ cho student */}
          {roleUser === "student" && (
            <>
              <Link to="/dashboard" className="text-[20px] font-bold px-4 py-2 hover:bg-gray-300 hover:text-black rounded">
                Danh sách học sinh
              </Link>
            </>
          )}
          
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
        <Link to="/login" className="hover:underline">
          Đăng nhập
        </Link>
      )}
    </nav>
  );
}
