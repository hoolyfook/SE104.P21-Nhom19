import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 🟢 Giả lập API Backend (Mock API)
const fetchStudents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const students = [];
      for (let i = 1; i <= 1000; i++) {
        students.push({
          id: i,
          name: `Học Sinh ${i}`,
          gender: i % 2 === 0 ? "Nam" : "Nữ",
          dob: `200${i % 10}-0${(i % 9) + 1}-15`,
          address: `Địa chỉ ${i}`,
          email: `student${i}@gmail.com`,
        });
      }
      resolve(students);
    }, 1000);
  });
};

export default function Dashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 20;

  useEffect(() => {
    fetchStudents().then((data: any) => setStudents(data));
  }, []);

  // 🟢 Cấu hình Fuse.js để tìm kiếm toàn văn
  const fuse = new Fuse(students, {
    keys: ["name", "email", "address"],
    threshold: 0.3, // Độ chính xác khi tìm kiếm (0 = chính xác nhất, 1 = không chính xác)
  });

  const filteredStudents = searchTerm ? fuse.search(searchTerm).map((result) => result.item) : students;

  // 🔹 Xử lý phân trang
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + studentsPerPage);

  return (
    <Card className="p-4 max-w-5xl mx-auto mt-10">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Quản lý học sinh</h2>

        {/* 🔍 Ô tìm kiếm */}
        <Input
          placeholder="Tìm kiếm theo tên, email, địa chỉ..."
          className="mb-4"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
          }}
        />
        {/* 🟢 Nút Thêm Mới */}
        <Button className="mt-4 w-full">Thêm học sinh</Button>
        {/* 📋 Danh sách học sinh */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Họ Tên</TableHead>
              <TableHead>Giới Tính</TableHead>
              <TableHead>Ngày Sinh</TableHead>
              <TableHead>Địa Chỉ</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStudents.length > 0 ? (
              paginatedStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>{student.dob}</TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell>{student.email}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  Không tìm thấy học sinh nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* 🟢 Pagination */}
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4" /> Trang trước
          </Button>
          <span className="text-gray-700">Trang {currentPage} / {totalPages}</span>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Trang sau <ChevronRight className="h-4 w-4" />
          </Button>
        </div>


      </CardContent>
    </Card>
  );
}
