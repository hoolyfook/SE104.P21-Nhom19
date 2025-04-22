export default function Footer() {
    return (
      <div className="mt-10 border-t py-4 flex justify-between items-center px-20">
        {/* 🔗 Buy Me a Coffee */}
        <a
          href="https://www.buymeacoffee.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          <img
            src="https://media.licdn.com/dms/image/D4D12AQFQEYt2Sf4vng/article-cover_image-shrink_720_1280/0/1701704889630?e=2147483647&v=beta&t=89MWp_ioFE_beKd1jLu3L0qasnWVp2DRr0y9GLlHdtw" // Đường dẫn ảnh hợp lệ
            alt="Buy Me a Coffee"
            className="w-36"
          />
        </a>
  
        {/* 👨‍💻 Thông tin cá nhân */}
        <div className="text-right">
          <p className="text-sm font-semibold">SE104.P21.N19</p>
          <p className="text-xs text-gray-500">Lê Thanh Lâm - 21521052</p>
          <p className="text-xs text-gray-500">Nguyễn Văn Long - 21521097</p>
          <p className="text-xs text-gray-500">🌐 DeTaiQuanLiHocSinh.com</p>
        </div>
      </div>
    );
  }
  