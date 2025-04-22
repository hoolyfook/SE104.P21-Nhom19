import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

// Define the type for a report row
type ReportRow = {
  stt: number;
  class: string;
  totalStudents: number;
  passed: number;
  ratio: string;
};

// Mock API function to generate random data
const fetchReportData = async (semester: string, academicYear: string): Promise<ReportRow[]> => {
  console.log(semester, academicYear);
  
  // Generate random number of rows (between 3 and 10)
  const rowCount = Math.floor(Math.random() * 8) + 3;
  const classes = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B"];
  
  const data: ReportRow[] = Array.from({ length: rowCount }, (_, index) => {
    // Random class name
    const className = `Lớp ${classes[Math.floor(Math.random() * classes.length)]}`;
    // Random total students (20–40)
    const totalStudents = Math.floor(Math.random() * 21) + 20;
    // Random passed students (0 to totalStudents)
    const passed = Math.floor(Math.random() * (totalStudents + 1));
    // Calculate ratio
    const ratio = totalStudents > 0 ? ((passed / totalStudents) * 100).toFixed(1) + "%" : "0%";

    return {
      stt: index + 1,
      class: className,
      totalStudents,
      passed,
      ratio,
    };
  });

  return data;
};

// Function to generate and download PDF
const exportToPDF = (semester: string, academicYear: string, reportData: ReportRow[]) => {
  console.log(semester, academicYear, reportData);
  try {
    const doc = new jsPDF();

    // Set font to Times, which supports Vietnamese characters
    doc.setFont("times", "normal");

    // Add title with UTF-8 support
    doc.text(`Báo Cáo Tổng Kết Học Kỳ ${semester} - Năm Học ${academicYear}`, 14, 20);

    // Define table columns and data
    const tableColumn = ["STT", "Lớp", "Sĩ Số", "Số Lượng Đạt", "Tỉ Lệ"];
    const tableRows: (string | number)[][] = reportData.map((row: ReportRow) => [
      row.stt,
      row.class,
      row.totalStudents,
      row.passed,
      row.ratio,
    ]);

    // Generate table in PDF with UTF-8 support
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { font: "times", fontSize: 10, halign: "center" },
      headStyles: { fillColor: [0, 102, 204], font: "times", halign: "center" },
      bodyStyles: { font: "times" },
    });

    // Save the PDF
    doc.save(`BaoCao_HocKy${semester}_${academicYear}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Có lỗi xảy ra khi xuất PDF!");
  }
};

const BaoCaoTongKet = () => {
  // State for inputs and data
  const [semester, setSemester] = useState<string>("");
  const [academicYear, setAcademicYear] = useState<string>("");
  const [reportData, setReportData] = useState<ReportRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle input changes
  const handleSemesterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSemester(e.target.value);
  };

  const handleAcademicYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAcademicYear(e.target.value);
  };

  // Handle fetching and displaying report data
  const handleDisplayReport = async () => {
    if (!semester || !academicYear) {
      alert("Vui lòng nhập học kỳ và năm học!");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call with random data
      const data = await fetchReportData(semester, academicYear);
      setReportData(data);
    } catch (error) {
      console.error("Error fetching report data:", error);
      alert("Có lỗi xảy ra khi lấy dữ liệu báo cáo!");
    } finally {
      setLoading(false);
    }
  };

  // Handle PDF export
  const handleExportPDF = () => {
    if (reportData.length === 0) {
      alert("Chưa có dữ liệu để xuất PDF. Vui lòng hiển thị báo cáo trước!");
      return;
    }
    exportToPDF(semester, academicYear, reportData);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Báo Cáo Tổng Kết Học Kỳ</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="semester">Học kỳ:</Label>
              <Input
                id="semester"
                value={semester}
                onChange={handleSemesterChange}
                placeholder="Nhập học kỳ (VD: 1, 2)"
              />
            </div>
            <div>
              <Label htmlFor="academicYear">Năm học:</Label>
              <Input
                id="academicYear"
                value={academicYear}
                onChange={handleAcademicYearChange}
                placeholder="Nhập năm học (VD: 2024-2025)"
              />
            </div>
          </div>

          {/* Report Table */}
          {reportData.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Lớp</TableHead>
                  <TableHead>Sĩ Số</TableHead>
                  <TableHead>Số Lượng Đạt</TableHead>
                  <TableHead>Tỉ Lệ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData.map((row: ReportRow) => (
                  <TableRow key={row.stt}>
                    <TableCell>{row.stt}</TableCell>
                    <TableCell>{row.class}</TableCell>
                    <TableCell>{row.totalStudents}</TableCell>
                    <TableCell>{row.passed}</TableCell>
                    <TableCell>{row.ratio}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex gap-4">
            <Button
              onClick={handleDisplayReport}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600"
            >
              {loading ? "Đang xử lý..." : "Hiển Thị Báo Cáo"}
            </Button>
            <Button
              onClick={handleExportPDF}
              disabled={loading || reportData.length === 0}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Xuất PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BaoCaoTongKet;