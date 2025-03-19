export default function Profile() {
    const user = {
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0123-456-789",
      school: "Đại học XYZ",
    };
  
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">👤 Hồ Sơ Cá Nhân</h2>
        <p><strong>Họ tên:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Điện thoại:</strong> {user.phone}</p>
        <p><strong>Trường:</strong> {user.school}</p>
      </div>
    );
  }
  