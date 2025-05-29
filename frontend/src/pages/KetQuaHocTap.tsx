import { useState, useEffect } from "react";
import axios from "../api/axiosClient";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const semesters = ["Học kỳ I", "Học kỳ II"];
const semesterToApiValue = (s: string) => (s === "Học kỳ I" ? "I" : "II");

interface Grade {
  maMon: string;
  hocKy: string;
  diem15p: number;
  diem1Tiet: number;
  diemTB: number;
  MonHocs: {
    tenMon: string;
  };
}

interface UserInfo {
  hoTen: string;
  gioiTinh: string;
  ngaySinh: string;
  email: string;
  diaChi: string;
}

interface LopInfo {
  maLop: string;
  Lops: {
    tenLop: string;
    khoiLop: string;
  };
}

const StudentProfileGradeTable = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [lopInfo, setLopInfo] = useState<LopInfo | null>(null);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get("/users/info", {
        headers: { Accept: "*/*" },
        withCredentials: true,
      });

      if (res.status === 200 && res.data.EC === "0") {
        const user = res.data.DT.user;
        const lop = res.data.DT.lop?.[0]; // lấy lớp đầu tiên
        setUserInfo(user);
        setLopInfo(lop);
      } else {
        throw new Error(res.data.EM || "Không lấy được thông tin người dùng");
      }
    } catch (err: any) {
      console.error("Lỗi lấy thông tin người dùng:", err);
      setError("Không thể lấy thông tin người dùng");
    }
  };

  const fetchGrades = async (maLop: string, hocKy: string) => {
    try {
      const res = await axios.get("/hocsinh/bangdiem", {
        params: { maLop, hocKy },
        headers: { Accept: "*/*" },
        withCredentials: true,
      });

      if (res.status === 200 && res.data.EC === "0") {
        setGrades(res.data.DT || []);
      } else {
        throw new Error(res.data.EM || "Lỗi khi tải bảng điểm");
      }
    } catch (err: any) {
      console.error("Lỗi lấy bảng điểm:", err);
      setGrades([]);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (lopInfo?.maLop) {
      fetchGrades(lopInfo.maLop, semesterToApiValue(selectedSemester));
    }
  }, [lopInfo, selectedSemester]);

  return (
    <div className="min-h-screen p-10">
      <Card className="p-6 max-w-4xl mx-auto shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Bảng Điểm Cá Nhân</h2>

        {userInfo && (
          <div className="mb-6 bg-gray-50 p-4 rounded border text-sm">
            <p><strong>Họ tên:</strong> {userInfo.hoTen}</p>
            <p><strong>Giới tính:</strong> {userInfo.gioiTinh}</p>
            <p><strong>Ngày sinh:</strong> {new Date(userInfo.ngaySinh).toLocaleDateString()}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Địa chỉ:</strong> {userInfo.diaChi}</p>
            {lopInfo && (
              <>
                <p><strong>Lớp:</strong> {lopInfo.Lops.tenLop}</p>
              </>
            )}
          </div>
        )}

        <div className="mb-4">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-48 bg-gray-100">
              <SelectValue placeholder="Chọn học kỳ" />
            </SelectTrigger>
            <SelectContent>
              {semesters.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        {!error && grades.length === 0 && (
          <div className="text-center text-gray-500">Không có dữ liệu bảng điểm.</div>
        )}

        {!error && grades.length > 0 && (
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-gray-200">
                  <TableHead className="text-center">STT</TableHead>
                  <TableHead className="text-center">Môn Học</TableHead>
                  <TableHead className="text-center">Điểm 15'</TableHead>
                  <TableHead className="text-center">Điểm 1 Tiết</TableHead>
                  <TableHead className="text-center">Điểm TB</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((g, idx) => (
                  <TableRow key={`${g.maMon}-${idx}`}>
                    <TableCell className="text-center">{idx + 1}</TableCell>
                    <TableCell className="text-center">{g.MonHocs?.tenMon || g.maMon}</TableCell>
                    <TableCell className="text-center">{g.diem15p}</TableCell>
                    <TableCell className="text-center">{g.diem1Tiet}</TableCell>
                    <TableCell className="text-center">{g.diemTB.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default StudentProfileGradeTable;
