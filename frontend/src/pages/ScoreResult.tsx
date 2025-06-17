import React, { useEffect, useState } from 'react';
import axios from '../api/axiosClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Diem {
  id: number;
  maSV: number;
  hoTen: string;
  diem15p: number;
  diem1Tiet: number;
  diemTB: number;
  Users: {
    hoTen: string;
  };
}

interface PhanCong {
  maLop: string;
  tenLop: string;
  maMon: string;
  tenMon: string;
}

export default function BangDiemComponent() {
  const [phanCongList, setPhanCongList] = useState<PhanCong[]>([]);
  const [selectedPC, setSelectedPC] = useState<string>('');
  const [bangDiem, setBangDiem] = useState<Diem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedHocKi, setSelectedHocKi] = useState<string>('I');

  useEffect(() => {
    const fetchPhanCong = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/v1/giangvien/phancong');
        console.log(res.data.DT)
        setPhanCongList(res.data.DT || []);
      } catch (err) {
        alert('Lỗi khi lấy danh sách phân công');
      }
    };
    fetchPhanCong();
  }, []);

  const fetchBangDiem = async () => {
    const selected = phanCongList.find(pc => `${pc.maLop}_${pc.maMon}` === selectedPC);
    if (!selected) return;

    try {
      setLoading(true);
      console.log (selected.maLop, selected.maMon,selectedHocKi)

      const res = await axios.get('http://localhost:8080/api/v1/giangvien/bangdiem', {
        params: {
          maLop: selected.maLop,
          maMon: selected.maMon,
          hocKy: selectedHocKi,
        },
        headers: { accept: 'application/json' }
      });
      console.log('Bảng điểm:', res.data.DT);
      setBangDiem(res.data.DT || []);
    } catch (err) {
      alert('Lỗi khi lấy bảng điểm');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeDiem = (id: number, key: keyof Diem, value: number) => {
    setBangDiem(prev => prev.map(item => item.id === id ? { ...item, [key]: value } : item));
  };

  const submitUpdate = async () => {
    try {
      await axios.put('http://localhost:8080/api/v1/giangvien/bangdiem', bangDiem, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Cập nhật thành công');
    } catch (err) {
      alert('Lỗi khi cập nhật');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-4">
        <Select onValueChange={setSelectedPC}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Chọn lớp và môn" />
          </SelectTrigger>
          <SelectContent>
            {phanCongList.map((pc, idx) => (
              <SelectItem key={idx} value={`${pc.maLop}_${pc.maMon}`}>
                {pc.maLop} - {pc.maMon}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setSelectedHocKi} defaultValue="I">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Chọn học kỳ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="I">Học kỳ I</SelectItem>
            <SelectItem value="II">Học kỳ II</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={fetchBangDiem} disabled={loading || !selectedPC}>
          {loading ? 'Đang tải...' : 'Lấy bảng điểm'}
        </Button>
      </div>

      {bangDiem.length > 0 && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã HS</TableHead>
                <TableHead>Họ tên</TableHead>
                <TableHead>Điểm 15p</TableHead>
                <TableHead>Điểm 1 tiết</TableHead>
                <TableHead>Điểm TB</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bangDiem.map(diem => (
                <TableRow key={diem.id}>
                  <TableCell>{diem.id}</TableCell>
                  <TableCell>{diem.Users.hoTen}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={diem.diem15p}
                      onChange={e => handleChangeDiem(diem.id, 'diem15p', parseFloat(e.target.value))}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={diem.diem1Tiet}
                      onChange={e => handleChangeDiem(diem.id, 'diem1Tiet', parseFloat(e.target.value))}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={diem.diemTB}
                      onChange={e => handleChangeDiem(diem.id, 'diemTB', parseFloat(e.target.value))}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button className="mt-4" onClick={submitUpdate}>
            Cập nhật điểm
          </Button>
        </>
      )}
    </div>
  );
}
