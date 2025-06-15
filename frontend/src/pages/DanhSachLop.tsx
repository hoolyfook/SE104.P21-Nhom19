import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from "@/components/ui/table";
import axiosClient from '../api/axiosClient';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function ClassList() {
  const [classList, setClassList] = useState<any[]>([]);
  const [formData, setFormData] = useState({ maLop: '', tenLop: '', khoiLop: '', siSo: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [allStudents, setAllStudents] = useState<any[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const fetchClassList = async () => {
    try {
      const response = await axiosClient.get('/admin/lops');
      setClassList(response.data.DT || []);
    } catch {
      alert('Lỗi khi tải danh sách lớp');
    }
  };

const exportClassToPDF = () => {
  if (!selectedClass || students.length === 0) {
    alert("Chưa có lớp hoặc danh sách học sinh trống!");
    return;
  }

  const doc = new jsPDF();

    // Header
    doc.setFontSize(14);
    doc.text("BM2: Danh Sách Lớp", 14, 20);

    doc.setFontSize(12);
    doc.text(`Lớp: ${selectedClass}`, 14, 30);
    doc.text(`Sĩ số: ${students.length}`, 150, 30);

    // Table
    const tableData = students.map((s, index) => [
      index + 1,
      s.Users.hoTen,
      s.Users.gioiTinh,
      new Date(s.Users.ngaySinh).getFullYear(),
      s.Users.diaChi
    ]);

    autoTable(doc, {
      startY: 40,
      head: [["STT", "Họ Tên", "Giới Tính", "Năm Sinh", "Địa Chỉ"]],
      body: tableData,
      styles: {
        font: "helvetica",
        fontSize: 10,
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: 255,
        halign: "center"
      },
    });

    // Xuất file
    doc.save(`Danh_sach_lop_${selectedClass}.pdf`);
  };


  const fetchStudentsInClass = async (maLop: string) => {
    try {
      const res = await axiosClient.get(`/admin/lops/hocsinhs?maLop=${maLop}`);
      setStudents(res.data.DT || []);
    } catch {
      alert('Lỗi khi tải danh sách học sinh');
    }
  };

  const fetchAllStudents = async () => {
    try {
      const res = await axiosClient.get('/admin/users');
      const students = res.data.DT.filter((u: any) => u.GroupUsers?.name === 'student');
      setAllStudents(students);
    } catch {
      alert('Lỗi khi tải danh sách học sinh');
    }
  };

  useEffect(() => {
    fetchClassList();
    fetchAllStudents();
  }, []);

  const handleShowClass = () => {
    if (selectedClass) fetchStudentsInClass(selectedClass);
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axiosClient.put('/admin/lops', formData);
      } else {
        await axiosClient.post('/admin/lops', formData);
      }
      setFormData({ maLop: '', tenLop: '', khoiLop: '', siSo: 0 });
      setIsEditing(false);
      fetchClassList();
    } catch {
      alert('Lỗi khi lưu lớp');
    }
  };

  const handleEdit = (cls: any) => {
    setFormData({
      maLop: cls.maLop,
      tenLop: cls.tenLop,
      khoiLop: cls.khoiLop,
      siSo: cls.siSo || 0
    });
    setIsEditing(true);
  };

  const handleDelete = async (maLop: string) => {
    if (!confirm("Xác nhận xoá lớp?")) return;
    try {
      await axiosClient.delete('/admin/lops', { data: { maLop } });
      fetchClassList();
    } catch {
      alert('Lỗi khi xoá lớp');
    }
  };

  const handleAddStudentToClass = async () => {
    if (!selectedClass || !selectedStudentId) return;
    try {
      await axiosClient.post('/admin/lops/hocsinhs', {
        maHS: Number(selectedStudentId),
        maLop: selectedClass
      });
      fetchStudentsInClass(selectedClass);
      setSelectedStudentId(null);
    } catch {
      alert('Lỗi khi thêm học sinh vào lớp');
    }
  };

  const handleDeleteStudent = async (id: number) => {
    if (!confirm("Xác nhận xoá học sinh khỏi lớp?")) return;
    try {
      await axiosClient.delete('/admin/lops/hocsinhs', {
        data: { id }
      });
      if (selectedClass) {
        fetchStudentsInClass(selectedClass); // Làm mới danh sách
      }
    } catch (err) {
      alert("Lỗi khi xoá học sinh");
    }
  };

  return (
    <Card className="p-4 max-w-5xl mx-auto mt-10 space-y-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Cập nhật lớp' : 'Thêm lớp mới'}</h2>
        <div className="grid grid-cols-4 gap-2">
          <Input placeholder="Mã lớp" value={formData.maLop} onChange={(e) => setFormData({ ...formData, maLop: e.target.value })} disabled={isEditing} />
          <Input placeholder="Tên lớp" value={formData.tenLop} onChange={(e) => setFormData({ ...formData, tenLop: e.target.value })} />
          <Input placeholder="Khối lớp" value={formData.khoiLop} onChange={(e) => setFormData({ ...formData, khoiLop: e.target.value })} />
          <Input type="number" placeholder="Sĩ số" value={formData.siSo} onChange={(e) => setFormData({ ...formData, siSo: +e.target.value })} />
        </div>
        <div className="flex gap-2 mt-2">
          <Button onClick={handleSubmit}>{isEditing ? 'Cập nhật' : 'Thêm'}</Button>
          {isEditing && (
            <Button variant="ghost" onClick={() => {
              setIsEditing(false);
              setFormData({ maLop: '', tenLop: '', khoiLop: '', siSo: 0 });
            }}>
              Hủy
            </Button>
          )}
        </div>
      </CardContent>

      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Danh sách lớp</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã lớp</TableHead>
              <TableHead>Tên lớp</TableHead>
              <TableHead>Khối lớp</TableHead>
              <TableHead>Sĩ số</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classList.map(cls => (
              <TableRow key={cls.maLop}>
                <TableCell>{cls.maLop}</TableCell>
                <TableCell>{cls.tenLop}</TableCell>
                <TableCell>{cls.khoiLop}</TableCell>
                <TableCell>{cls.siSo}</TableCell>
                <TableCell className="flex gap-2">
                  <Button size="sm" onClick={() => handleEdit(cls)}>Sửa</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(cls.maLop)}>Xoá</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <CardContent>
        <h2 className="text-xl font-semibold mb-2">Xem danh sách học sinh</h2>
        <div className="flex gap-4 mb-4 items-center">
          <Select onValueChange={(val) => setSelectedClass(val)}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Chọn lớp" />
            </SelectTrigger>
            <SelectContent>
              {classList.map((cls) => (
                <SelectItem key={cls.maLop} value={cls.maLop}>
                  {cls.tenLop}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleShowClass}>Hiển thị</Button>
        </div>

        {selectedClass && (
          <div className="flex gap-4 items-center mb-4">
            <Select onValueChange={(val) => setSelectedStudentId(val)}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Chọn học sinh để thêm" />
              </SelectTrigger>
              <SelectContent>
                {allStudents.map((stu) => (
                  <SelectItem key={stu.id} value={stu.id.toString()}>
                    {stu.hoTen}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleAddStudentToClass}>Thêm học sinh</Button>
          </div>
        )}

        {students.length > 0 && (
          <Table className="mt-4">
            <TableHeader>
            <TableRow>
              <TableHead>Mã HS</TableHead>
              <TableHead>Họ tên</TableHead>
              <TableHead>Giới tính</TableHead>
              <TableHead>Ngày sinh</TableHead>
              <TableHead>Địa chỉ</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.maHS}</TableCell>
                <TableCell>{s.Users.hoTen}</TableCell>
                <TableCell>{s.Users.gioiTinh}</TableCell>
                <TableCell>{new Date(s.Users.ngaySinh).toLocaleDateString('vi-VN')}</TableCell>
                <TableCell>{s.Users.diaChi}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteStudent(s.id)}>
                    Xoá
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
            {selectedClass && students.length > 0 && (
              <div className="flex justify-end mb-2">
                <Button variant="outline" onClick={exportClassToPDF}>
                  Xuất PDF
                </Button>
              </div>
            )}
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
