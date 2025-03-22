import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const subjects = ["Toán", "Lý", "Hóa", "Sinh", "Sử", "Địa", "Văn", "Đạo Đức", "Thể Dục"];
const semesters = ["Học kỳ I", "Học kỳ II"];
const classes = ["Lớp 10", "Lớp 11", "Lớp 12"];

const GradeReport = () => {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [selectedClass, setSelectedClass] = useState(classes[0]);

  const sampleGrades = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Học sinh ${index + 1}`,
    grade15: (Math.random() * 10).toFixed(1),
    grade1tiet: (Math.random() * 10).toFixed(1),
    average: (Math.random() * 10).toFixed(1),
  }));

  return (
    <div className="min-h-screen p-10">
      <Card className="p-5 w-full max-w-4xl mx-auto shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">Bảng Điểm Môn Học</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-5">
          {/* Chọn lớp */}
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full bg-gray-100">
              <SelectValue placeholder="Chọn lớp" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>

          {/* Chọn học kỳ */}
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-full bg-gray-100">
              <SelectValue placeholder="Chọn học kỳ" />
            </SelectTrigger>
            <SelectContent>
              {semesters.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>

          {/* Chọn môn học */}
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full bg-gray-100">
              <SelectValue placeholder="Chọn môn học" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Bảng điểm */}
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="w-16 text-center">STT</TableHead>
              <TableHead className="text-center">Họ Tên</TableHead>
              <TableHead className="text-center">Điểm 15’</TableHead>
              <TableHead className="text-center">Điểm 1 tiết</TableHead>
              <TableHead className="text-center">Điểm TB</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleGrades.map((student) => (
              <TableRow key={student.id} className="border border-1">
                <TableCell className="text-center">{student.id}</TableCell>
                <TableCell className="text-center">{student.name}</TableCell>
                <TableCell className="text-center">{student.grade15}</TableCell>
                <TableCell className="text-center">{student.grade1tiet}</TableCell>
                <TableCell className="text-center">{student.average}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default GradeReport;
