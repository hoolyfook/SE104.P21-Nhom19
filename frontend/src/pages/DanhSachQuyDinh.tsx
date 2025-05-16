import { useEffect, useState } from 'react';
import axios from '../api/axiosClient';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Trash, Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import Fuse from 'fuse.js';

interface QuyDinh {
  id: number;
  moTa: string;
  giaTri: string;
}

const fetchQuyDinh = async () => {
  try {
    const res = await axios.get('http://localhost:8080/api/v1/admin/quydinhs', {
      headers: { accept: '*/*' },
    });
    console.log('API response:', res.data.DT); // Debug: Log API response
    return res.data.DT || [];
  } catch (err) {
    console.error('Error fetching regulations:', err);
    throw err;
  }
};

const createQuyDinh = async (data: { moTa: string; giaTri: string }) => {
  try {
    await axios.post('http://localhost:8080/api/v1/admin/quydinhs', data, {
      headers: { accept: '*/*', 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Failed to create regulation:', err);
    throw err;
  }
};

const updateQuyDinh = async (data: { id: number; moTa: string; giaTri: string }) => {
  try {
    await axios.put('http://localhost:8080/api/v1/admin/quydinhs', data, {
      headers: { accept: '*/*', 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Failed to update regulation:', err);
    throw err;
  }
};

const deleteQuyDinh = async (id: number) => {
  try {
    await axios.delete('http://localhost:8080/api/v1/admin/quydinhs', {
      headers: { accept: '*/*', 'Content-Type': 'application/json' },
      data: { id },
    });
  } catch (err) {
    console.error('Failed to delete regulation:', err);
    throw err;
  }
};

export default function DanhSachQuyDinh() {
  const [dsQuyDinh, setDsQuyDinh] = useState<QuyDinh[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<QuyDinh | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<{
    moTa: string;
    giaTri: string;
  }>();

  useEffect(() => {
    fetchQuyDinh().then((data) => setDsQuyDinh(data)).catch(() => {
      alert('Không thể tải danh sách quy định.');
    });
  }, []);

  const onSubmit = async (data: { moTa: string; giaTri: string }) => {
    setLoading(true);
    try {
      const payload = editing ? { ...data, id: editing.id } : data;
      console.log('Submitting payload:', payload); // Debug: Log payload
      if (editing) {
        await updateQuyDinh(payload as { id: number; moTa: string; giaTri: string });
      } else {
        await createQuyDinh(payload);
      }
      setOpen(false);
      reset();
      setEditing(null);
      const updated = await fetchQuyDinh();
      setDsQuyDinh(updated);
    } catch (err) {
      alert(editing ? 'Không thể cập nhật quy định.' : 'Không thể tạo quy định.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (quyDinh: QuyDinh) => {
    setEditing(quyDinh);
    setValue('moTa', quyDinh.moTa);
    setValue('giaTri', quyDinh.giaTri);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa quy định này?')) return;
    setLoading(true);
    try {
      console.log('Deleting regulation with ID:', id); // Debug: Log deletion
      await deleteQuyDinh(id);
      const updated = await fetchQuyDinh();
      setDsQuyDinh(updated);
    } catch (err) {
      alert('Không thể xóa quy định.');
    } finally {
      setLoading(false);
    }
  };

  const fuse = new Fuse(dsQuyDinh, {
    keys: ['moTa', 'giaTri'],
    threshold: 0.3,
  });

  const filteredQuyDinh = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : dsQuyDinh;

  return (
    <Card className="p-4 max-w-5xl mx-auto mt-10">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Danh sách quy định</h2>
        <Input
          placeholder="Tìm kiếm theo tên quy định hoặc giá trị..."
          className="mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Dialog
          open={open}
          onOpenChange={(val) => {
            setOpen(val);
            if (!val) {
              setEditing(null);
              reset();
            } else if (!editing) {
              reset();
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="mb-4 w-full">
              {editing ? 'Chỉnh sửa quy định' : 'Thêm quy định'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editing ? 'Chỉnh sửa quy định' : 'Thêm quy định'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <Label>Tên Quy Định</Label>
                  <Input {...register('moTa')} required />
                </div>
                <div>
                  <Label>Giá Trị</Label>
                  <Input {...register('giaTri')} required />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  ) : null}
                  {editing ? 'Lưu thay đổi' : 'Tạo mới'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên Quy Định</TableHead>
                <TableHead>Giá Trị</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuyDinh.length > 0 ? (
                filteredQuyDinh.map((qd) => (
                  <TableRow key={qd.id}>
                    <TableCell>{qd.id}</TableCell>
                    <TableCell>{qd.moTa}</TableCell>
                    <TableCell>{qd.giaTri}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(qd)}
                        disabled={loading}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(qd.id)}
                        disabled={loading}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    Không tìm thấy quy định nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}