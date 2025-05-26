import { useState, useEffect } from "react";
import axios from '../api/axiosClient';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const semesters = ["Tất cả", "Học kỳ I", "Học kỳ II"];

interface GradeReport {
  maMon: string;
  hocKy: string;
  namHoc: string;
  diem15p: number;
  diem1Tiet: number;
  diemTB: number;
  MonHocs: {
    tenMon: string;
  };
}

const StudentGradeReport = () => {
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [grades, setGrades] = useState<GradeReport[]>([]);
  const [filteredGrades, setFilteredGrades] = useState<GradeReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Map semester display names to API values
  const semesterToApiValue = (semester: string) => {
    if (semester === "Học kỳ I") return "I";
    if (semester === "Học kỳ II") return "II";
    return null; // For "Tất cả"
  };

  // Fetch all grade report data using Axios
  const fetchGrades = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/hocsinh/bangdiem", {
        headers: { Accept: "application/json" },
      });
      console.log("API Response:", response.data);
      if (response.data.EC === "0") {
        setGrades(response.data.DT || []);
      } else {
        throw new Error(response.data.EM || "Lỗi khi tải bảng điểm");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định";
      console.error("Fetch Error:", errorMessage);
      setError(errorMessage);
      setGrades([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchGrades();
  }, []);

  // Filter grades by selected semester
  useEffect(() => {
    console.log("Grades:", grades);
    const semesterValue = semesterToApiValue(selectedSemester);
    const filtered = semesterValue
      ? grades.filter((grade) => grade.hocKy === semesterValue)
      : grades;
    console.log("Filtered Grades:", filtered);
    setFilteredGrades(filtered);
  }, [selectedSemester, grades]);

  return (
    <div className="min-h-screen p-10">
      <Card className="p-5 w-full max-w-4xl mx-auto shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">Kết Quả Học Tập</h2>
        <div className="mb-5 flex items-center gap-4">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-full max-w-xs bg-gray-100">
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
          <Button onClick={fetchGrades} className="bg-blue-500 text-white">
            Làm mới
          </Button>
        </div>

        {loading && <p className="text-center">Đang tải...</p>}
        {error && (
          <p className="text-center text-red-500">
            {error} <Button onClick={fetchGrades} variant="link">Thử lại</Button>
          </p>
        )}
        {!loading && !error && filteredGrades.length === 0 && (
          <p className="text-center">
            Không có dữ liệu bảng điểm {selectedSemester === "Tất cả" ? "" : `cho ${selectedSemester}`}.
          </p>
        )}
        {!loading && !error && filteredGrades.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-200">
                <TableHead className="text-center">STT</TableHead>
                <TableHead className="text-center">Mã Môn</TableHead>
                <TableHead className="text-center">Tên Môn</TableHead>
                <TableHead className="text-center">Học Kỳ</TableHead>
                <TableHead className="text-center">Năm Học</TableHead>
                <TableHead className="text-center">Điểm 15’</TableHead>
                <TableHead className="text-center">Điểm 1 Tiết</TableHead>
                <TableHead className="text-center">Điểm TB</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrades.map((grade, index) => (
                <TableRow key={grade.maMon}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">{grade.maMon}</TableCell>
                  <TableCell className="text-center">{grade.MonHocs.tenMon}</TableCell>
                  <TableCell className="text-center">{grade.hocKy}</TableCell>
                  <TableCell className="text-center">{grade.namHoc}</TableCell>
                  <TableCell className="text-center">{grade.diem15p.toFixed(1)}</TableCell>
                  <TableCell className="text-center">{grade.diem1Tiet.toFixed(1)}</TableCell>
                  <TableCell className="text-center">{grade.diemTB.toFixed(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default StudentGradeReport;