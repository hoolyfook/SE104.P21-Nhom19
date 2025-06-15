import { useEffect, useState } from 'react';
import axios from '../api/axiosClient';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
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

interface MonHoc {
  maMon: string;
  tenMon: string;
}

const fetchMonHocs = async () => {
  try {
    const response = await axios.get('/admin/monhocs');
    console.log('API response:', response.data.DT); // Debug: Log API response
    return response.data.DT || [];
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};

const createMonHoc = async (data: { maMon: string; tenMon: string }) => {
  try {
    await axios.post('/admin/monhocs', data);
  } catch (error) {
    console.error('Failed to create subject:', error);
    throw error;
  }
};

const updateMonHoc = async (data: { maMon: string; tenMon: string }) => {
  try {
    await axios.put('/admin/monhocs', data);
  } catch (error) {
    console.error('Failed to update subject:', error);
    throw error;
  }
};

const deleteMonHoc = async (maMon: string) => {
  try {
    await axios.delete('/admin/monhocs', {
      data: { maMon },
    });
  } catch (error) {
    console.error('Failed to delete subject:', error);
    throw error;
  }
};

export default function DanhSachMonHoc() {
  const [monHocs, setMonHocs] = useState<MonHoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<MonHoc | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<MonHoc>();

  useEffect(() => {
    fetchMonHocs()
      .then((data) => setMonHocs(data))
      .catch(() => alert('Lỗi khi tải danh sách môn học'));
  }, []);

  const onSubmit = async (data: MonHoc) => {
    setLoading(true);
    try {
      const payload = editing ? { ...data, maMon: editing.maMon } : data;
      console.log('Submitting payload:', payload); // Debug: Log payload
      if (editing) {
        await updateMonHoc(payload);
      } else {
        await createMonHoc(payload);
      }
      setOpen(false);
      reset();
      setEditing(null);
      const updated = await fetchMonHocs();
      setMonHocs(updated);
    } catch (error) {
      alert(editing ? 'Lỗi khi cập nhật môn học' : 'Lỗi khi tạo môn học');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (mon: MonHoc) => {
    setEditing(mon);
    setValue('maMon', mon.maMon);
    setValue('tenMon', mon.tenMon);
    setOpen(true);
  };

  const handleDelete = async (maMon: string) => {
    if (!confirm(`Xoá môn ${maMon}?`)) return;
    setLoading(true);
    try {
      console.log('Deleting subject with maMon:', maMon); // Debug: Log deletion
      await deleteMonHoc(maMon);
      const updated = await fetchMonHocs();
      setMonHocs(updated);
    } catch (error) {
      alert('Lỗi khi xoá môn học');
    } finally {
      setLoading(false);
    }
  };

  const fuse = new Fuse(monHocs, {
    keys: ['maMon', 'tenMon'],
    threshold: 0.3,
  });

  const filteredMonHocs = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : monHocs;

  return (
    <Card className="p-4 max-w-5xl mx-auto mt-10">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Danh sách môn học</h2>
        <Input
          placeholder="Tìm kiếm theo mã môn hoặc tên môn..."
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
              {editing ? 'Cập nhật môn học' : 'Thêm môn học mới'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editing ? 'Cập nhật môn học' : 'Thêm môn học mới'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <Label>Mã Môn</Label>
                  <Input
                    {...register('maMon', { required: true })}
                    disabled={!!editing}
                    placeholder="Nhập mã môn"
                  />
                </div>
                <div>
                  <Label>Tên Môn</Label>
                  <Input
                    {...register('tenMon', { required: true })}
                    placeholder="Nhập tên môn"
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                  {editing ? 'Cập nhật' : 'Thêm'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã môn</TableHead>
                <TableHead>Tên môn</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMonHocs.length > 0 ? (
                filteredMonHocs.map((mon) => (
                  <TableRow key={mon.maMon}>
                    <TableCell>{mon.maMon}</TableCell>
                    <TableCell>{mon.tenMon}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(mon)}
                        disabled={loading}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(mon.maMon)}
                        disabled={loading}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500">
                    Không tìm thấy môn học nào.
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