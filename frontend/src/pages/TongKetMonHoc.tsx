import React, { useEffect, useState } from 'react';
import axios from '../api/axiosClient';
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';

interface MonHoc {
  maMon: string;
  tenMon: string;
}

interface BaoCaoMonTheoLop {
  maLop: string;
  maMon: string;
  hocKy: string;
  namHoc: string;
  siSo: number;
  soLuongDat: number;
  tiLe: number;
}

export default function TongKetMonToanTruong() {
  const [monHocList, setMonHocList] = useState<MonHoc[]>([]);
  const [selectedMon, setSelectedMon] = useState<string>('');
  const [selectedHocKy, setSelectedHocKy] = useState<string>('');
  const [selectedNamHoc, setSelectedNamHoc] = useState<string>('');
  const [reportList, setReportList] = useState<BaoCaoMonTheoLop[]>([]);
  const [loading, setLoading] = useState(false);

  const hocKyOptions = ['I', 'II'];
  const namHocOptions = Array.from({ length: 10 }, (_, i) => {
    const start = 2020 + i;
    return `${start}-${start + 1}`;
  });

  useEffect(() => {
    const fetchMonHocs = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/v1/admin/monhocs');
        setMonHocList(res.data.DT || []);
      } catch (err) {
        alert('Lỗi khi lấy danh sách môn học');
      }
    };
    fetchMonHocs();
  }, []);

  const fetchBaoCao = async () => {
    if (!selectedMon || !selectedHocKy || !selectedNamHoc) return;

    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8080/api/v1/admin/baocao/mon', {
        params: {
          maMon: selectedMon,
          hocKy: selectedHocKy,
          namHoc: selectedNamHoc,
        },
        headers: { accept: 'application/json' },
      });
      setReportList(res.data.DT || []);
    } catch (err) {
      alert('Lỗi khi lấy báo cáo tổng kết');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Tổng kết môn học toàn trường</h2>

      <div className="flex flex-wrap gap-4 items-center">
        {/* Chọn môn học */}
        <Select onValueChange={setSelectedMon}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Chọn môn học" />
          </SelectTrigger>
          <SelectContent>
            {monHocList.map(mon => (
              <SelectItem key={mon.maMon} value={mon.maMon}>
                {mon.tenMon}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Học kỳ */}
        <Select onValueChange={setSelectedHocKy}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Học kỳ" />
          </SelectTrigger>
          <SelectContent>
            {hocKyOptions.map(hk => (
              <SelectItem key={hk} value={hk}>
                {hk}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Năm học */}
        <Select onValueChange={setSelectedNamHoc}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Năm học" />
          </SelectTrigger>
          <SelectContent>
            {namHocOptions.map(nh => (
              <SelectItem key={nh} value={nh}>
                {nh}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={fetchBaoCao}
          disabled={loading || !selectedMon || !selectedHocKy || !selectedNamHoc}
        >
          {loading ? 'Đang tải...' : 'Xem tổng kết'}
        </Button>
      </div>

      {/* Hiển thị kết quả */}
      {reportList.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lớp</TableHead>
                  <TableHead>Sĩ số</TableHead>
                  <TableHead>Số đạt</TableHead>
                  <TableHead>Tỉ lệ (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportList.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.maLop}</TableCell>
                    <TableCell>{item.siSo}</TableCell>
                    <TableCell>{item.soLuongDat}</TableCell>
                    <TableCell>{item.tiLe.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
