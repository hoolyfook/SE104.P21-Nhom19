import { useState, useEffect } from "react";
import axios from '../api/axiosClient';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const semesters = ["Học kỳ I", "Học kỳ II"];

interface ClassReport {
  maLop: string;
  hocKy: string;
  siSo: number;
  soLuongDat: number;
  tiLe: number;
  Lops: {
    tenLop: string;
  };
}

const ClassReport = () => {
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [reports, setReports] = useState<ClassReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Map semester display names to API values
  const semesterToApiValue = (semester: string) => (semester === "Học kỳ I" ? "I" : "II");

  // Fetch class report data using Axios
  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `/admin/baocao/lops?hocKy=${semesterToApiValue(selectedSemester)}`,
        {
          headers: { Accept: "application/json" },
        }
      );
      if (response.data.EC === "0") {
        setReports(response.data.DT);
      } else {
        throw new Error(response.data.EM || "Lỗi khi tải báo cáo");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định");
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when semester changes
  useEffect(() => {
    fetchReports();
  }, [selectedSemester]);

  return (
    <div className="min-h-screen p-10">
      <Card className="p-5 w-full max-w-4xl mx-auto shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">Báo Cáo Lớp Học Toàn Trường</h2>
        <div className="mb-5">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-full max-w-xs bg-gray-100">
              <SelectValue placeholder="Chọn học kỳ" />
            </SelectTrigger>
            <SelectContent>
              {semesters.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading && <p className="text-center">Đang tải...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && reports.length === 0 && (
          <p className="text-center">Không có dữ liệu báo cáo cho học kỳ này.</p>
        )}
        {!loading && !error && reports.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-200">
                <TableHead className="text-center">STT</TableHead>
                <TableHead className="text-center">Mã Lớp</TableHead>
                <TableHead className="text-center">Tên Lớp</TableHead>
                <TableHead className="text-center">Học Kỳ</TableHead>
                <TableHead className="text-center">Sĩ Số</TableHead>
                <TableHead className="text-center">Số Lượng Đạt</TableHead>
                <TableHead className="text-center">Tỉ Lệ (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report, index) => (
                <TableRow key={report.maLop}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">{report.maLop}</TableCell>
                  <TableCell className="text-center">{report.Lops.tenLop}</TableCell>
                  <TableCell className="text-center">{report.hocKy}</TableCell>
                  <TableCell className="text-center">{report.siSo}</TableCell>
                  <TableCell className="text-center">{report.soLuongDat}</TableCell>
                  <TableCell className="text-center">{report.tiLe.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default ClassReport;