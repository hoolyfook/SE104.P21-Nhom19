export default function Schedule() {
  const periods = [
    { id: 1, time: "7:30 - 8:15" },
    { id: 2, time: "8:15 - 9:00" },
    { id: 3, time: "9:00 - 9:45" },
    { id: 4, time: "10:00 - 10:45" },
    { id: 5, time: "10:45 - 11:30" },
    { id: "break", time: "Giờ nghỉ trưa" },
    { id: 6, time: "13:00 - 13:45" },
    { id: 7, time: "13:45 - 14:30" },
    { id: 8, time: "14:30 - 15:15" },
    { id: 9, time: "15:30 - 16:15" },
    { id: 10, time: "16:15 - 17:00" },
  ];

  const schedule = [
    { day: "Thứ 2", start: 1, duration: 2, subject: "Toán", room: "P11" },
    { day: "Thứ 2", start: 3, duration: 2, subject: "Văn", room: "P11" },
    { day: "Thứ 2", start: 5, duration: 1, subject: "Tiếng Anh", room: "P11" },
    { day: "Thứ 3", start: 1, duration: 2, subject: "Lý", room: "P11" },
    { day: "Thứ 3", start: 3, duration: 2, subject: "Hóa", room: "P11" },
    { day: "Thứ 3", start: 5, duration: 1, subject: "Sinh", room: "P11" },
    { day: "Thứ 4", start: 1, duration: 2, subject: "Lịch sử", room: "P11" },
    { day: "Thứ 4", start: 3, duration: 2, subject: "Địa lý", room: "P11" },
    { day: "Thứ 4", start: 5, duration: 1, subject: "GDCD", room: "P11" },
    { day: "Thứ 5", start: 1, duration: 2, subject: "Toán", room: "P11" },
    { day: "Thứ 5", start: 3, duration: 2, subject: "Văn", room: "P11" },
    { day: "Thứ 5", start: 5, duration: 1, subject: "Tin học", room: "P11" },
    { day: "Thứ 6", start: 1, duration: 2, subject: "Thể dục", room: "Sân" },
    { day: "Thứ 6", start: 3, duration: 2, subject: "Công nghệ", room: "P11" },
    { day: "Thứ 6", start: 5, duration: 1, subject: "Âm nhạc", room: "P11" },
    { day: "Thứ 7", start: 1, duration: 3, subject: "Toán nâng cao", room: "P11" },
    { day: "Thứ 7", start: 4, duration: 2, subject: "Tiếng Anh nâng cao", room: "P11" },
  ];

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">📅 Thời Khóa Biểu</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="border p-2 w-16">Tiết</th>
            <th className="border p-2 w-40">Thời gian</th>
            <th className="border p-2">Thứ 2</th>
            <th className="border p-2">Thứ 3</th>
            <th className="border p-2">Thứ 4</th>
            <th className="border p-2">Thứ 5</th>
            <th className="border p-2">Thứ 6</th>
            <th className="border p-2">Thứ 7</th>
          </tr>
        </thead>
        <tbody>
          {periods.map((period) =>
            period.id === "break" ? (
              <tr key={period.id} className="text-center bg-gray-100">
                <td colSpan={8} className="border p-2 font-semibold text-red-500 border border-black p-2">
                  {period.time}
                </td>
              </tr>
            ) : (
              <tr key={period.id} className="text-center border border-black p-2">
                <td className="border p-2">{period.id}</td>
                <td className="border p-2">{period.time}</td>
                {["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"].map((day) => {
                  const subject = schedule.find(
                    (item) => item.day === day && item.start === period.id
                  );
                  const isHidden = schedule.some(
                    (item) =>
                      item.day === day &&
                      Number(period.id) > item.start &&
                      Number(period.id) < item.start + item.duration
                  );

                  return (
                    <td
                      key={day}
                      className={`border p-2 ${
                        subject ? "bg-blue-100 font-semibold border border-black p-2" : ""
                      }`}
                      rowSpan={subject ? subject.duration : 1}
                      style={{ display: isHidden ? "none" : "table-cell" }}
                    >
                      {subject ? (
                        <>
                          {subject.subject}
                          <br />
                          <span className="text-gray-500">Phòng: {subject.room}</span>
                        </>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
