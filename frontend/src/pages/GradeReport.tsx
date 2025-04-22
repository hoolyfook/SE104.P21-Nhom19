import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const subjects = ["Toán", "Lý", "Hóa", "Sinh", "Sử", "Địa", "Văn", "Đạo Đức", "Thể Dục"];
const semesters = ["Học kỳ I", "Học kỳ II"];
const classes = ["Lớp 10", "Lớp 11", "Lớp 12"];

interface EditedData {
  [key: number]: {
    grade15?: string;
    grade1tiet?: string;
    average?: string;
  };
}

const GradeReport = () => {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [editedData, setEditedData] = useState<EditedData>({});
  const [showSave, setShowSave] = useState(false);

  const sampleGrades = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Học sinh ${index + 1}`,
    grade15: (Math.random() * 10).toFixed(1),
    grade1tiet: (Math.random() * 10).toFixed(1),
    average: (Math.random() * 10).toFixed(1),
  }));

  const [grades, setGrades] = useState(sampleGrades);

  const handleEdit = (id: number, field: keyof EditedData[number], value: string) => {
    setGrades((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, [field]: value } : student
      )
    );
    setEditedData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
    setShowSave(true);
  };
  

  const handleSave = async () => {
    console.log(editedData)
    // try {
    //   const response = await fetch("/api/save-grades", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(Object.values(editedData)),
    //   });
    //   if (response.ok) {
    //     alert("Lưu thành công!");
    //     setEditedData({});
    //     setShowSave(false);
    //   } else {
    //     alert("Có lỗi xảy ra!");
    //   }
    // } catch (error) {
    //   console.error("Lỗi khi gửi API:", error);
    //   alert("Không thể lưu dữ liệu");
    // }
  };

  return (
    <div className="min-h-screen p-10">
      <Card className="p-5 w-full max-w-4xl mx-auto shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">Bảng Điểm Môn Học</h2>
        <div className="grid grid-cols-3 gap-4 mb-5">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full bg-gray-100">
              <SelectValue placeholder="Chọn lớp" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-full bg-gray-100">
              <SelectValue placeholder="Chọn học kỳ" />
            </SelectTrigger>
            <SelectContent>
              {semesters.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full bg-gray-100">
              <SelectValue placeholder="Chọn môn học" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
            {grades.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="text-center">{student.id}</TableCell>
                <TableCell className="text-center">{student.name}</TableCell>
                <TableCell className="text-center">
                  <input
                    type="number"
                    value={student.grade15}
                    onChange={(e) => handleEdit(student.id, "grade15", e.target.value)}
                    className="w-16 text-center border rounded p-1"
                  />
                </TableCell>
                <TableCell className="text-center">
                  <input
                    type="number"
                    value={student.grade1tiet}
                    onChange={(e) => handleEdit(student.id, "grade1tiet", e.target.value)}
                    className="w-16 text-center border rounded p-1"
                  />
                </TableCell>
                <TableCell className="text-center">
                  <input
                    type="number"
                    value={student.average}
                    onChange={(e) => handleEdit(student.id, "average", e.target.value)}
                    className="w-16 text-center border rounded p-1"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {showSave && (
          <div className="mt-4 text-center">
            <Button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Lưu</Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default GradeReport;
