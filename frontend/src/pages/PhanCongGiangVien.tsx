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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import Fuse from 'fuse.js';

interface PhanCong {
  id: number;
  maGV: number;
  maMon: string;
  maLop: string;
  Users: { hoTen: string };
  MonHocs: { tenMon: string };
  Lops: { tenLop: string };
}

interface GiangVien {
  maGV: number;
  hoTen: string;
}

interface MonHoc {
  maMon: string;
  tenMon: string;
}

interface Lop {
  maLop: string;
  tenLop: string;
}

const fetchPhanCong = async () => {
  try {
    const res = await axios.get('http://localhost:8080/api/v1/admin/giangviens/phancong');
    console.log('API response (PhanCong):', res.data.DT); // Debug: Log API response
    return res.data.DT || [];
  } catch (error) {
    console.error('Error fetching assignments:', error);
    throw error;
  }
};

const fetchGiangViens = async () => {
  try {
    const res = await axios.get('http://localhost:8080/api/v1/admin/users', {
      headers: { accept: '*/*' },
    });
    console.log('API response (Users):', res.data.DT); // Debug: Log API response
    const teachers = res.data.DT
      .filter((user: any) => user.GroupUsers.name === 'teacher')
      .map((user: any) => ({
        maGV: user.id,
        hoTen: user.hoTen,
      }));
    console.log('Filtered teachers:', teachers); // Debug: Log filtered teachers
    return teachers;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return [];
  }
};

const fetchMonHocs = async () => {
  try {
    const res = await axios.get('http://localhost:8080/api/v1/admin/monhocs');
    console.log('API response (MonHocs):', res.data.DT); // Debug: Log API response
    return res.data.DT || [];
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }
};

const fetchLops = async () => {
  try {
    const res = await axios.get('http://localhost:8080/api/v1/admin/lops');
    console.log('API response (Lops):', res.data.DT); // Debug: Log API response
    return res.data.DT || [];
  } catch (error) {
    console.error('Error fetching classes:', error);
    return [];
  }
};

const createPhanCong = async (data: { maGV: number; maMon: string; maLop: string }) => {
  try {
    await axios.post('http://localhost:8080/api/v1/admin/giangviens/phancong', data, {
      headers: { 'Content-Type': 'application/json', accept: '*/*' },
    });
  } catch (error) {
    console.error('Failed to create assignment:', error);
    throw error;
  }
};

const updatePhanCong = async (data: { id: number; maGV: number; maMon: string; maLop: string }) => {
  try {
    await axios.put('http://localhost:8080/api/v1/admin/giangviens/phancong', data, {
      headers: { 'Content-Type': 'application/json', accept: '*/*' },
    });
  } catch (error) {
    console.error('Failed to update assignment:', error);
    throw error;
  }
};

const deletePhanCong = async (id: number) => {
  try {
    await axios.delete('http://localhost:8080/api/v1/admin/giangviens/phancong', {
      data: { id },
      headers: { 'Content-Type': 'application/json', accept: '*/*' },
    });
  } catch (error) {
    console.error('Failed to delete assignment:', error);
    throw error;
  }
};

export default function PhanCongGiangVien() {
  const [phanCongList, setPhanCongList] = useState<PhanCong[]>([]);
  const [giangViens, setGiangViens] = useState<GiangVien[]>([]);
  const [monHocs, setMonHocs] = useState<MonHoc[]>([]);
  const [lops, setLops] = useState<Lop[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PhanCong | null>(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<{
    maGV: number;
    maMon: string;
    maLop: string;
  }>();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [phanCongData, giangVienData, monHocData, lopData] = await Promise.all([
          fetchPhanCong(),
          fetchGiangViens(),
          fetchMonHocs(),
          fetchLops(),
        ]);
        setPhanCongList(phanCongData);
        setGiangViens(giangVienData);
        setMonHocs(monHocData);
        setLops(lopData);
      } catch (error) {
        alert('Lỗi khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const onSubmit = async (data: { maGV: number; maMon: string; maLop: string }) => {
    setLoading(true);
    try {
      const payload = editing ? { ...data, id: editing.id } : data;
      console.log('Submitting payload:', payload); // Debug: Log payload
      if (editing) {
        await updatePhanCong(payload as { id: number; maGV: number; maMon: string; maLop: string });
      } else {
        await createPhanCong(payload);
      }
      setOpen(false);
      reset();
      setEditing(null);
      const updated = await fetchPhanCong();
      setPhanCongList(updated);
    } catch (error) {
      alert(editing ? 'Lỗi khi cập nhật phân công' : 'Lỗi khi tạo phân công');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pc: PhanCong) => {
    setEditing(pc);
    setValue('maGV', pc.maGV);
    setValue('maMon', pc.maMon);
    setValue('maLop', pc.maLop);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Xác nhận xoá?')) return;
    setLoading(true);
    try {
      console.log('Deleting assignment with ID:', id); // Debug: Log deletion
      await deletePhanCong(id);
      const updated = await fetchPhanCong();
      setPhanCongList(updated);
    } catch (error) {
      alert('Lỗi khi xoá phân công');
    } finally {
      setLoading(false);
    }
  };

  const fuse = new Fuse(phanCongList, {
    keys: ['maGV', 'maMon', 'maLop'],
    threshold: 0.3,
  });

  const filteredPhanCong = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : phanCongList;

  return (
    <Card className="p-4 max-w-5xl mx-auto mt-10">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Danh sách phân công</h2>
        <Input
          placeholder="Tìm kiếm theo mã giảng viên, mã môn hoặc mã lớp..."
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
            <Button className="mb-4 w-full" disabled={loading}>
              {editing ? 'Cập nhật phân công' : 'Thêm phân công mới'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editing ? 'Cập nhật phân công' : 'Thêm phân công mới'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <Label>Mã Giảng Viên</Label>
                  <Select
                    onValueChange={(value) => setValue('maGV', Number(value))}
                    defaultValue={editing?.maGV?.toString()}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giảng viên" />
                    </SelectTrigger>
                    <SelectContent>
                      {giangViens.length > 0 ? (
                        giangViens.map((gv) => (
                          <SelectItem key={gv.maGV} value={gv.maGV.toString()}>
                            {gv.hoTen} ({gv.maGV})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="0" disabled>
                          Không có giảng viên
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <input type="hidden" {...register('maGV', { required: 'Mã giảng viên là bắt buộc' })} />
                  {errors.maGV && <p className="text-red-500 text-sm">{errors.maGV.message}</p>}
                </div>
                <div>
                  <Label>Mã Môn</Label>
                  <Select
                    onValueChange={(value) => setValue('maMon', value)}
                    defaultValue={editing?.maMon}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn môn học" />
                    </SelectTrigger>
                    <SelectContent>
                      {monHocs.length > 0 ? (
                        monHocs.map((mon) => (
                          <SelectItem key={mon.maMon} value={mon.maMon}>
                            {mon.tenMon} ({mon.maMon})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="0" disabled>
                          Không có môn học
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <input type="hidden" {...register('maMon', { required: 'Mã môn là bắt buộc' })} />
                  {errors.maMon && <p className="text-red-500 text-sm">{errors.maMon.message}</p>}
                </div>
                <div>
                  <Label>Mã Lớp</Label>
                  <Select
                    onValueChange={(value) => setValue('maLop', value)}
                    defaultValue={editing?.maLop}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn lớp" />
                    </SelectTrigger>
                    <SelectContent>
                      {lops.length > 0 ? (
                        lops.map((lop) => (
                          <SelectItem key={lop.maLop} value={lop.maLop}>
                            {lop.tenLop} ({lop.maLop})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="0" disabled>
                          Không có lớp
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <input type="hidden" {...register('maLop', { required: 'Mã lớp là bắt buộc' })} />
                  {errors.maLop && <p className="text-red-500 text-sm">{errors.maLop.message}</p>}
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
                <TableHead>ID</TableHead>
                <TableHead>Mã GV</TableHead>
                <TableHead>Mã Môn</TableHead>
                <TableHead>Mã Lớp</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPhanCong.length > 0 ? (
                filteredPhanCong.map((pc) => (
                  <TableRow key={pc.id}>
                    <TableCell>{pc.id}</TableCell>
                    <TableCell>{pc.maGV}</TableCell>
                    <TableCell>{pc.maMon}</TableCell>
                    <TableCell>{pc.maLop}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(pc)}
                        disabled={loading}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(pc.id)}
                        disabled={loading}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    Không tìm thấy phân công nào.
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