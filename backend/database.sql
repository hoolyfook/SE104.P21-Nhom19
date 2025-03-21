-- Tạo bảng GroupUser (Nhóm người dùng: admin, giáo viên, học sinh)
CREATE TABLE IF NOT EXISTS `GroupUser` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,  -- (admin, giaovien, hocsinh)
    PRIMARY KEY (`id`)
);

-- Tạo bảng User (Thông tin người dùng)
CREATE TABLE IF NOT EXISTS `User` (
    `maUser` INT NOT NULL AUTO_INCREMENT,
    `hoTen` VARCHAR(100) NOT NULL,
    `gioiTinh` ENUM('Nam', 'Nữ') NOT NULL,
    `ngaySinh` DATE NOT NULL,
    `diaChi` VARCHAR(255),
    `email` VARCHAR(100),
    `groupUserId` INT,
    PRIMARY KEY (`maUser`),
    FOREIGN KEY (`groupUserId`) REFERENCES `GroupUser`(`id`)
);

-- Tạo bảng Roles (Phân quyền truy cập theo URL)
CREATE TABLE IF NOT EXISTS `Roles` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(255) NOT NULL,  -- URL quyền truy cập
    PRIMARY KEY (`id`)
);

-- Tạo bảng GroupRoles để phân quyền cho từng nhóm người dùng
CREATE TABLE IF NOT EXISTS `GroupRoles` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `RoleID` INT NOT NULL,
    `GroupID` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`RoleID`) REFERENCES `Roles`(`id`),
    FOREIGN KEY (`GroupID`) REFERENCES `GroupUser`(`id`)
);

-- Tạo bảng QuyDinh (Quy định hệ thống có thể thay đổi)
CREATE TABLE IF NOT EXISTS `QuyDinh` (
    `id` INT NOT NULL AUTO_INCREMENT,  -- Mã quy định
    `moTa` TEXT NOT NULL,  -- Mô tả quy định (tuổi tối thiểu, sĩ số tối đa, số lớp, số môn học, điểm tối thiểu)
    `giaTri` INT,  -- Giá trị quy định (tuổi, sĩ số, số lượng môn học, điểm, v.v.)
    PRIMARY KEY (`id`)
);

-- Thêm dữ liệu vào bảng QuyDinh
INSERT INTO `QuyDinh` (`moTa`, `giaTri`) VALUES
('Tuổi tối thiểu', 15),  -- Tuổi tối thiểu cho học sinh
('Tuổi tối đa', 20),  -- Tuổi tối đa cho học sinh
('Sĩ số tối đa của lớp', 40),  -- Sĩ số tối đa của các lớp
('Số lớp trong trường', 9),  -- Tổng số lớp trong trường
('Số lượng môn học', 9),  -- Số lượng môn học trong hệ thống
('Điểm tối thiểu để đạt môn', 5);  -- Điểm tối thiểu để đạt môn học

-- Tạo bảng Lop (Lớp học)
CREATE TABLE IF NOT EXISTS `Lop` (
    `maLop` VARCHAR(10) NOT NULL,
    `tenLop` VARCHAR(10) NOT NULL,
    `khoiLop` ENUM('10', '11', '12') NOT NULL,
    `siSo` INT,
    PRIMARY KEY (`maLop`)
);

-- Tạo bảng MonHoc (Môn học)
CREATE TABLE IF NOT EXISTS `MonHoc` (
    `maMon` VARCHAR(10) NOT NULL,
    `tenMon` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`maMon`)
);

-- Tạo bảng BangDiem (Bảng điểm của học sinh)
CREATE TABLE IF NOT EXISTS `BangDiem` (
    `maHS` INT,
    `maLop` VARCHAR(10),
    `maMon` VARCHAR(10),
    `hocKy` ENUM('I', 'II') NOT NULL,
    `diem15p` FLOAT,
    `diem1Tiet` FLOAT,
    `diemTB` FLOAT,
    PRIMARY KEY (`maHS`, `maLop`, `maMon`),
    FOREIGN KEY (`maHS`) REFERENCES `HocSinh`(`maHS`),
    FOREIGN KEY (`maLop`) REFERENCES `Lop`(`maLop`),
    FOREIGN KEY (`maMon`) REFERENCES `MonHoc`(`maMon`)
);

-- Tạo bảng BaoCaoTongKetMon (Báo cáo tổng kết môn học)
CREATE TABLE IF NOT EXISTS `BaoCaoTongKetMon` (
    `maMon` VARCHAR(10),
    `hocKy` ENUM('I', 'II') NOT NULL,
    `maLop` VARCHAR(10),
    `siSo` INT,
    `soLuongDat` INT,
    `tiLe` FLOAT,
    PRIMARY KEY (`maMon`, `hocKy`, `maLop`),
    FOREIGN KEY (`maMon`) REFERENCES `MonHoc`(`maMon`),
    FOREIGN KEY (`maLop`) REFERENCES `Lop`(`maLop`)
);

-- Tạo bảng BaoCaoTongKetHocKy (Báo cáo tổng kết học kỳ)
CREATE TABLE IF NOT EXISTS `BaoCaoTongKetHocKy` (
    `maLop` VARCHAR(10),
    `siSo` INT,
    `soLuongDat` INT,
    `tiLe` FLOAT,
    `hocKy` ENUM('I', 'II') NOT NULL,
    PRIMARY KEY (`maLop`, `hocKy`),
    FOREIGN KEY (`maLop`) REFERENCES `Lop`(`maLop`)
);

-- Tạo bảng HocSinh (Đã thay đổi thành User)
CREATE TABLE IF NOT EXISTS `HocSinh` (
    `maHS` INT NOT NULL AUTO_INCREMENT,
    `hoTen` VARCHAR(100) NOT NULL,
    `gioiTinh` ENUM('Nam', 'Nữ') NOT NULL,
    `ngaySinh` DATE NOT NULL,
    `diaChi` VARCHAR(255),
    `email` VARCHAR(100),
    PRIMARY KEY (`maHS`)
);

-- Tạo bảng GiangVien_Lop_Mon (Giáo viên có thể dạy nhiều lớp và nhiều môn)
CREATE TABLE IF NOT EXISTS `GiangVien_Lop_Mon` (
    `maGV` INT,
    `maLop` VARCHAR(10),
    `maMon` VARCHAR(10),
    PRIMARY KEY (`maGV`, `maLop`, `maMon`),
    FOREIGN KEY (`maGV`) REFERENCES `User`(`maUser`),
    FOREIGN KEY (`maLop`) REFERENCES `Lop`(`maLop`),
    FOREIGN KEY (`maMon`) REFERENCES `MonHoc`(`maMon`)
);

-- Tạo bảng HocSinh_Lop (Liên kết học sinh với lớp học)
CREATE TABLE IF NOT EXISTS `HocSinh_Lop` (
    `maHS` INT,
    `maLop` VARCHAR(10),
    PRIMARY KEY (`maHS`, `maLop`),
    FOREIGN KEY (`maHS`) REFERENCES `HocSinh`(`maHS`),
    FOREIGN KEY (`maLop`) REFERENCES `Lop`(`maLop`)
);
