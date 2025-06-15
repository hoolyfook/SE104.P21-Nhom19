import { useEffect, useState } from "react";
import axios from "../api/axiosClient";

export default function Profile() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const [infoRes, roleRes] = await Promise.all([
          axios.get("/users/info"),
          axios.get("/users/role"),
        ]);

        if (infoRes.data.EC === "0") {
          setUserInfo(infoRes.data.DT);
        }

        if (roleRes.data.EC === "0") {
          setRole(roleRes.data.DT?.GroupUsers?.name ?? null);
        }
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  if (loading) return <div className="p-6">Đang tải hồ sơ...</div>;
  if (!userInfo) return <div className="p-6">Không có thông tin người dùng.</div>;

  const user = userInfo.user;
  const classInfo = userInfo.lop?.[0]?.Lops;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">👤 Hồ Sơ Cá Nhân</h2>
      <p><strong>Họ tên:</strong> {user.hoTen}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Giới tính:</strong> {user.gioiTinh}</p>
      <p><strong>Ngày sinh:</strong> {new Date(user.ngaySinh).toLocaleDateString()}</p>
      <p><strong>Địa chỉ:</strong> {user.diaChi}</p>
      {classInfo && (
        <>
          <p><strong>Lớp:</strong> {classInfo.tenLop}</p>
          <p><strong>Khối:</strong> {classInfo.khoiLop}</p>
        </>
      )}
      {role && (
        <p><strong>Vai trò:</strong> {role}</p>
      )}
    </div>
  );
}
