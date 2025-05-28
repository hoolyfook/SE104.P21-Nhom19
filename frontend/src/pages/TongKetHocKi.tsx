import { useState, useEffect } from "react";
import axios from '../api/axiosClient';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const semesters = ["Học kỳ I", "Học kỳ II"];

// Generate school years (e.g., "2024" to "2020")
const getSchoolYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 5; i++) {
    years.push(`${currentYear - i}`);
  }
  return years;
};

const schoolYears = getSchoolYears();

interface ClassReport {
  maLop: string;
  hocKy: string;
  namHoc: string;
  siSo: number;
  soLuongDat: number;
  tiLe: number;
  Lops: {
    tenLop: string;
  };
}

const ClassReport = () => {
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [selectedNamHoc, setSelectedNamHoc] = useState(schoolYears[0]);
  const [reports, setReports] = useState<ClassReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Map semester display names to API values
  const semesterToApiValue = (semester: string) => (semester === "Học kỳ I" ? "I" : "II");

  // Fetch class report data from API using axios
  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8080/api/v1/admin/baocao/lops', {
        params: {
          hocKy: semesterToApiValue(selectedSemester),
          namHoc: selectedNamHoc,
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true // Include if using cookies
      });

      console.log("Full API Response:", response); // Debug full response

      if (response.status === 200) {
        if (response.data.EC === "0") {
          setReports(response.data.DT || []);
        } else {
          throw new Error(response.data.EM || "Lỗi khi tải báo cáo");
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err: any) {
      let errorMessage = "Đã xảy ra lỗi không xác định";
      
      if (err.response) {
        // The request was made and the server responded with a status code
        console.error("Error response data:", err.response.data);
        console.error("Error status:", err.response.status);
        console.error("Error headers:", err.response.headers);
        
        if (err.response.status === 403) {
          errorMessage = "Bạn không có quyền truy cập tài nguyên này";
        } else if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data && err.response.data.EM) {
          errorMessage = err.response.data.EM;
        }
      } else if (err.request) {
        // The request was made but no response was received
        console.error("No response received:", err.request);
        errorMessage = "Không nhận được phản hồi từ máy chủ";
      } else {
        // Something happened in setting up the request
        console.error("Request setup error:", err.message);
        errorMessage = err.message;
      }

      setError(errorMessage);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when semester or namHoc changes
  useEffect(() => {
    fetchReports();
  }, [selectedSemester, selectedNamHoc]);

  return (
    <div className="min-h-screen p-10">
      <Card className="p-5 w-full max-w-4xl mx-auto shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">Báo Cáo Toàn Trường</h2>
        <div className="mb-5 flex items-center gap-4">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-full max-w-xs bg-gray-100 border-gray-300">
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
          <Select value={selectedNamHoc} onValueChange={setSelectedNamHoc}>
            <SelectTrigger className="w-full max-w-xs bg-gray-100 border-gray-300">
              <SelectValue placeholder="Chọn năm học" />
            </SelectTrigger>
            <SelectContent>
              {schoolYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Lỗi!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        
        {!loading && !error && reports.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Không có dữ liệu báo cáo cho {selectedSemester}, năm học {selectedNamHoc}.
          </div>
        )}
        
        {!loading && !error && reports.length > 0 && (
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-gray-200">
                  <TableHead className="text-center">STT</TableHead>
                  <TableHead className="text-center">Mã Lớp</TableHead>
                  <TableHead className="text-center">Tên Lớp</TableHead>
                  <TableHead className="text-center">Sĩ Số</TableHead>
                  <TableHead className="text-center">Số Lượng Đạt</TableHead>
                  <TableHead className="text-center">Tỷ Lệ (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report, index) => (
                  <TableRow key={`${report.maLop}-${index}`} className="hover:bg-gray-50">
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">{report.maLop}</TableCell>
                    <TableCell className="text-center">{report.Lops?.tenLop || 'N/A'}</TableCell>
                    <TableCell className="text-center">{report.siSo}</TableCell>
                    <TableCell className="text-center">{report.soLuongDat}</TableCell>
                    <TableCell className="text-center">{report.tiLe.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ClassReport;