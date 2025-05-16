import axios from '../api/axiosClient';
import { useEffect, useState } from 'react';
import {
  Table, TableHeader, TableRow, TableHead,
  TableBody, TableCell
} from '@/components/ui/table';
import {
  Card, CardContent
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PhanCong {
  id: number;
  maGV: number;
  maMon: string;
  maLop: string;
  Users: { hoTen: string };
  MonHocs: { tenMon: string };
  Lops: { tenLop: string };
}

export default function PhanCongGiangVien() {
    const [phanCongList, setPhanCongList] = useState<PhanCong[]>([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        id: 0,
        maGV: 0,
        maMon: '',
        maLop: ''
    });

    const [isEditing, setIsEditing] = useState(false);

    const fetchPhanCong = async () => {
        setLoading(true);
        try {
        const res = await axios.get('http://localhost:8080/api/v1/admin/giangviens/phancong');
        setPhanCongList(res.data.DT || []);
        } catch (error) {
        alert('Lỗi khi tải phân công');
        } finally {
        setLoading(false);
        }
    };

    const handleSubmit = async () => {
        const endpoint = 'http://localhost:8080/api/v1/admin/giangviens/phancong';
        try {
        if (isEditing) {
            await axios.put(endpoint, formData);
        } else {
            await axios.post(endpoint, {
            maGV: formData.maGV,
            maMon: formData.maMon,
            maLop: formData.maLop
            });
        }
        setFormData({ id: 0, maGV: 0, maMon: '', maLop: '' });
        setIsEditing(false);
        fetchPhanCong();
        } catch (error) {
        alert('Lỗi khi lưu dữ liệu');
        }
    };

    const handleEdit = (pc: PhanCong) => {
        setFormData({
        id: pc.id,
        maGV: pc.maGV,
        maMon: pc.maMon,
        maLop: pc.maLop
        });
        setIsEditing(true);
    };
    const handleDelete = async (id: number) => {
        console.log(id);
        if (!confirm('Xác nhận xoá?')) return;
        try {
            await axios.delete('/admin/giangviens/phancong', {
            data: { id }
            });
            fetchPhanCong();
        } catch (error) {
            alert('Lỗi khi xoá: ' + (error as any)?.message);
        }
    };;


    useEffect(() => {
        fetchPhanCong();
    }, []);

    return (
        <Card className="p-4 space-y-4">
        <CardContent>
            <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">
                {isEditing ? 'Cập nhật phân công' : 'Thêm phân công mới'}
            </h2>
            {isEditing && (
                <Button
                variant="ghost"
                onClick={() => {
                    setIsEditing(false);
                    setFormData({ id: 0, maGV: 0, maMon: '', maLop: '' });
                }}
                >
                Thêm mới
                </Button>
            )}
            </div>

            <div className="grid grid-cols-4 gap-2">
            <Input
                type="number"
                placeholder="Mã giảng viên"
                value={formData.maGV}
                onChange={(e) => setFormData({ ...formData, maGV: +e.target.value })}
            />
            <Input
                placeholder="Mã môn"
                value={formData.maMon}
                onChange={(e) => setFormData({ ...formData, maMon: e.target.value })}
            />
            <Input
                placeholder="Mã lớp"
                value={formData.maLop}
                onChange={(e) => setFormData({ ...formData, maLop: e.target.value })}
            />
            <Button onClick={handleSubmit}>
                {isEditing ? 'Cập nhật' : 'Thêm'}
            </Button>
            </div>
        </CardContent>

        <CardContent>
            <h2 className="text-xl font-bold mb-4">Danh sách phân công</h2>
            {loading ? (
            <div className="flex justify-center py-10">
                <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
            </div>
            ) : (
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Giảng viên</TableHead>
                    <TableHead>Môn học</TableHead>
                    <TableHead>Lớp</TableHead>
                    <TableHead>Hành động</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {phanCongList.map((pc) => (
                    <TableRow key={pc.id}>
                    <TableCell>{pc.id}</TableCell>
                    <TableCell>{pc.Users?.hoTen}</TableCell>
                    <TableCell>{pc.MonHocs?.tenMon}</TableCell>
                    <TableCell>{pc.Lops?.tenLop}</TableCell>
                    <TableCell className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(pc)}>
                        Sửa
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(pc.id)}>
                        Xoá
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            )}
        </CardContent>
        </Card>
    );
}
