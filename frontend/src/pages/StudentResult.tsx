import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Download, Search, ChevronLeft, ChevronRight } from "lucide-react";

// 🟢 Giả lập API lấy dữ liệu kết quả học tập
const fetchStudyResults = async (): Promise<{ id: number; name: string; class: string; semester1: string; semester2: string; }[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const students: { id: number; name: string; class: string; semester1: string; semester2: string; }[] = [];
      for (let i = 1; i <= 100; i++) {
        students.push({
          id: i,
          name: `Học Sinh ${i}`,
          class: `Lớp ${Math.ceil(i / 10)}`, // 10 học sinh mỗi lớp
          semester1: (Math.random() * 4 + 6).toFixed(1), // Điểm TB HK1 (6.0 - 10.0)
          semester2: (Math.random() * 4 + 5).toFixed(1), // Điểm TB HK2 (5.0 - 9.0)
        });
      }
      resolve(students);
    }, 500);
  });
};

export default function StudyResults() {
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 20;

  // 🟢 Lấy dữ liệu từ API giả lập
  useEffect(() => {
    fetchStudyResults().then((data) => setStudents(data));
  }, []);

  // 🟢 Lọc danh sách theo từ khóa tìm kiếm
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🟢 Xác định danh sách hiển thị theo trang
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // 🟢 Chuyển trang
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // 🟢 Xuất danh sách học tập ra CSV
  const handleExportCSV = () => {
    if (filteredStudents.length === 0) return;
    const csvContent =
      "STT,Họ Tên,Lớp,TB HK1,TB HK2\n" +
      filteredStudents.map((s, index) => `${index + 1},${s.name},${s.class},${s.semester1},${s.semester2}`).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Ket_qua_hoc_tap.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Card className="p-4 max-w-5xl mx-auto mt-10">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Kết quả học tập</h2>

        {/* 🔎 Thanh tìm kiếm */}
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc lớp..."
            value={searchTerm}
            onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
            }}
            className="w-full"
          />
        </div>

        {/* 📋 Danh sách học sinh */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Họ Tên</TableHead>
              <TableHead>Lớp</TableHead>
              <TableHead>TB HK1</TableHead>
              <TableHead>TB HK2</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student, index) => (
                <TableRow key={student.id}>
                  <TableCell>{indexOfFirstStudent + index + 1}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.semester1}</TableCell>
                  <TableCell>{student.semester2}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Không tìm thấy học sinh nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* 📌 Pagination */}
        <div className="flex justify-between items-center mt-4">
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
            Trang trước
          </Button>
          <span>
            Trang {currentPage} / {totalPages}
          </span>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Trang sau
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* 🟢 Nút Xuất CSV */}
        <Button className="mt-4 flex items-center" onClick={handleExportCSV}>
          <Download className="h-4 w-4 mr-2" /> Xuất CSV
        </Button>
      </CardContent>
    </Card>
  );
}
