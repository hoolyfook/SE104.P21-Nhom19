import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { ChevronLeft, ChevronRight, Trash, Pencil } from "lucide-react";
import axios from "../api/axiosClient";

const fetchStudents = async () => {
  console.log("Fetching students...");
  try {
    const response = await axios.get('http://localhost:8080/api/v1/admin/users');
    console.log("API response:", response.data.DT); // Debug: Log API response
    return response.data.DT;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const deleteStudent = async (id: any) => {
  console.log("Xóa học sinh có ID:", id); // Debug: Log deletion attempt
  try {
    await axios.delete("http://localhost:8080/api/v1/admin/users", {
      data: { id },
    });
  } catch (error) {
    console.error("Failed to delete student:", error);
  }
};

const updateStudent = async (data: any) => {
  try {
    await axios.put("http://localhost:8080/api/v1/admin/users", data);
  } catch (error) {
    console.error("Failed to update user:", error);
  }
};

export default function Dashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm();
  const studentsPerPage = 20;

  useEffect(() => {
    fetchStudents().then((data: any) => setStudents(data));
  }, []);

  const onAddUser = async (data: any) => {
    try {
      const formattedData = {
        ...data,
        id: editing?.id,
        GroupUsers: data.GroupUsers.toLowerCase(),
        ngaySinh: new Date(data.ngaySinh).toISOString(), // Format date for API
      };

      console.log("Saving user, payload:", formattedData); // Debug: Log payload

      if (editing) {
        await updateStudent(formattedData);
      } else {
        await axios.post("http://localhost:8080/api/v1/admin/users", formattedData);
      }

      setOpen(false);
      reset();
      setEditing(null);
      const updated = await fetchStudents();
      setStudents(updated);
    } catch (err) {
      console.error("Failed to save user:", err);
    }
  };

  const handleEdit = (student: any) => {
    setEditing(student);

    // Format ngaySinh to YYYY-MM-DD for the date input
    const formattedDate = student.ngaySinh
      ? new Date(student.ngaySinh).toISOString().split('T')[0]
      : '';

    console.log("Editing student, ngaySinh:", student.ngaySinh); // Debug: Log date

    setValue("hoTen", student.hoTen);
    setValue("gioiTinh", student.gioiTinh);
    setValue("ngaySinh", formattedDate); // Fixed: Date formatted as YYYY-MM-DD
    setValue("diaChi", student.diaChi);
    setValue("email", student.email);
    setValue("GroupUsers", student.GroupUsers.name);
    setOpen(true);
  };

  const handleDelete = async (id: any) => {
    console.log("Deleting student with ID:", id); // Debug: Log deletion
    await deleteStudent(id);
    const updated = await fetchStudents();
    setStudents(updated);
  };

  const fuse = new Fuse(students, {
    keys: ["name", "email", "address"],
    threshold: 0.3,
  });

  const filteredStudents = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : students;

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  return (
    <Card className="p-4 max-w-5xl mx-auto mt-10">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Quản lý người dùng</h2>
        <Input
          placeholder="Tìm kiếm theo tên, email, địa chỉ..."
          className="mb-4"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Dialog
          open={open}
          onOpenChange={(val) => {
            setOpen(val);
            if (!val) {
              setEditing(null);
              reset(); // Reset form when closing dialog
            } else if (!editing) {
              reset(); // Reset form when opening for new user
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="mt-4 w-full">
              {editing ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editing ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onAddUser)}>
              <div className="space-y-4">
                <div>
                  <Label>Họ Tên</Label>
                  <Input {...register("hoTen")} required />
                </div>
                <div>
                  <Label>Giới Tính</Label>
                  <Select
                    onValueChange={(value) => setValue("gioiTinh", value)}
                    defaultValue={editing?.gioiTinh}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Nam</SelectItem>
                      <SelectItem value="Female">Nữ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Ngày Sinh</Label>
                  <Input {...register("ngaySinh")} type="date" required />
                </div>
                <div>
                  <Label>Địa Chỉ</Label>
                  <Input {...register("diaChi")} required />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input {...register("email")} type="email" required />
                </div>
                <div>
                  <Label>Vai Trò</Label>
                  <Select
                    onValueChange={(value) => setValue("GroupUsers", value)}
                    defaultValue={editing?.GroupUsers?.name}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="teacher">Giáo Viên</SelectItem>
                      <SelectItem value="student">Học Sinh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button type="submit">{editing ? "Lưu thay đổi" : "Tạo mới"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Họ Tên</TableHead>
              <TableHead>Giới Tính</TableHead>
              <TableHead>Ngày Sinh</TableHead>
              <TableHead>Địa Chỉ</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vai Trò</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStudents.length > 0 ? (
              paginatedStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.hoTen}</TableCell>
                  <TableCell>{student.gioiTinh === 'Male' ? 'Nam' : 'Nữ'}</TableCell>
                  <TableCell>
                    {new Date(student.ngaySinh).toLocaleDateString('vi-VN')}
                  </TableCell>
                  <TableCell>{student.diaChi}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    {student.GroupUsers.name === "teacher"
                      ? "Giáo Viên"
                      : student.GroupUsers.name === "student"
                      ? "Học Sinh"
                      : "admin"}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(student)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(student.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-500">
                  Không tìm thấy học sinh nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4" /> Trang trước
          </Button>
          <span className="text-gray-700">
            Trang {currentPage} / {totalPages}
          </span>
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