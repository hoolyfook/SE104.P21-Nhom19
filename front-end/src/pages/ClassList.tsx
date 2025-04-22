import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Download } from "lucide-react";
import axiosClient from '../api/axiosClient'; // Axios client instance
import axios from 'axios'; // Axios for error handling

// 🟢 Fetch class list
const fetchClassList = () => {
  return axiosClient
    .get('/admin/lops') // Fetch list of classes
    .then((response) => {
      const classList = response.data.DT;
      console.log("List of classes:", classList); // Logging the class list
      return classList;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching class list:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      return []; // Fallback value
    });
};

// 🟢 Fetch students in a class using maLop parameter
const fetchStudentsInClass = (maLop: any) => {
  return axiosClient
    .get(`/admin/lops/hocsinhs?maLop=${maLop}`) // Fetch students using maLop as query parameter
    .then((response) => {
      const students = response.data.DT; // Assuming the students list is under the 'DT' key
      console.log(`List of students for class ${maLop}:`, students);
      return students;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error(`Error fetching students for class ${maLop}:`, error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      return []; // Fallback value
    });
};

export default function ClassList() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [classList, setClassList] = useState<any[]>([]);

  // 🟢 Fetch class list when component mounts
  useEffect(() => {
    fetchClassList().then((data) => {
      setClassList(data);
    });
  }, []);

  // 🟢 Lấy danh sách học sinh trong lớp khi lớp được chọn
  const handleShowClass = () => {
    if (selectedClass) {
      // Fetch students for the selected class
      fetchStudentsInClass(selectedClass).then((data) => {
        setStudents(data); // Update students state
      });
    }
  };

  // 🟢 Xuất danh sách lớp ra CSV
  const handleExportCSV = () => {
    if (students.length === 0) return;
    const csvContent =
      "ID,Họ Tên,Giới Tính,Ngày Sinh,Địa Chỉ,Email\n" +
      students.map((s) => `${s.id},${s.name},${s.gender},${s.dob},${s.address},${s.email}`).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Danh_sach_${selectedClass}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Card className="p-4 max-w-5xl mx-auto mt-10">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Danh sách lớp</h2>

        {/* 🟢 Chọn lớp */}
        <div className="flex gap-4 mb-4">
          <Select onValueChange={setSelectedClass}>
            <SelectTrigger className="w-1/3">
              <SelectValue placeholder="Chọn lớp" />
            </SelectTrigger>
            <SelectContent>
              {classList.map((cls) => (
                <SelectItem key={cls.maLop} value={cls.maLop}>
                  {cls.tenLop} {/* Display class name */}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleShowClass}>Hiển thị</Button>
        </div>

        {/* 📋 Danh sách học sinh trong lớp */}
        {students.length > 0 && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Họ Tên</TableHead>
                  <TableHead>Giới Tính</TableHead>
                  <TableHead>Ngày Sinh</TableHead>
                  <TableHead>Địa Chỉ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>STT</TableCell>
                    <TableCell>{student.Users.hoTen}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>{student.dob}</TableCell>
                    <TableCell>{student.address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* 🟢 Nút Xuất CSV */}
            <Button className="mt-4 flex items-center" onClick={handleExportCSV}>
              <Download className="h-4 w-4 mr-2" /> Xuất CSV
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
