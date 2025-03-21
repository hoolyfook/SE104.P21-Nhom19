import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Download } from "lucide-react";

// 🟢 Giả lập API dữ liệu lớp học (12 lớp, mỗi lớp 40 học sinh)
const generateClasses = () => {
  const classes = [];
  for (let i = 1; i <= 12; i++) {
    const students = [];
    for (let j = 1; j <= 40; j++) {
      students.push({
        id: j,
        name: `Học Sinh ${j} - Lớp ${i}`,
        gender: j % 2 === 0 ? "Nam" : "Nữ",
        dob: `201${j % 10}-0${(j % 9) + 1}-15`,
        address: `Địa chỉ ${j}`,
        // email: `student${j}@gmail.com`,
      });
    }
    classes.push({ id: i, name: `Lớp ${i}`, students });
  }
  return classes;
};

const classData = generateClasses();

export default function ClassList() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [students, setStudents] = useState<any[]>([]);

  // 🟢 Chọn lớp và hiển thị danh sách học sinh
  const handleShowClass = () => {
    if (selectedClass) {
      const classInfo = classData.find((cls) => cls.id.toString() === selectedClass);
      setStudents(classInfo ? classInfo.students : []);
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
              {classData.map((cls) => (
                <SelectItem key={cls.id} value={cls.id.toString()}>
                  {cls.name}
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
                  <TableHead>ID</TableHead>
                  <TableHead>Họ Tên</TableHead>
                  <TableHead>Giới Tính</TableHead>
                  <TableHead>Ngày Sinh</TableHead>
                  <TableHead>Địa Chỉ</TableHead>
                  {/* <TableHead>Email</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>{student.dob}</TableCell>
                    <TableCell>{student.address}</TableCell>
                    {/* <TableCell>{student.email}</TableCell> */}
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
