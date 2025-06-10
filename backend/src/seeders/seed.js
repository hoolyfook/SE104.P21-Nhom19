const { name } = require("ejs");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Insert Users
        await queryInterface.bulkInsert('Roles', [
            {
                url: '/users/password',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/users/info',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/admin/users',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/admin/quydinhs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/admin/lops',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/admin/monhocs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/admin/giangviens/phancong',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/admin/lops/hocsinhs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/giangvien/phancong',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/giangvien/bangdiem',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/giangvien/baocao/mon',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/admin/baocao/lop',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/hocsinh/bangdiem',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/giangvien/lops',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/giangvien/baocao/lop',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/giangvien/lops/hocsinhs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/users/role',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/admin/baocao/lops',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/admin/baocao/mon',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                url: '/admin/hocsinhs/ketqua',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
        await queryInterface.bulkInsert('GroupUsers', [
            {
                name: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'teacher',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'student',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
        await queryInterface.bulkInsert('GroupRoles', [
            {
                GroupID: 1, // Reference to admin group
                roleId: 1, // Reference to role ID for admin
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 1, // Reference to admin group
                roleId: 2, // Reference to role ID for admin
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 1, // Reference to student group
                roleId: 3, // Reference to role ID for student
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 1, // Reference to student group
                roleId: 4, // Reference to role ID for student
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 1, // Reference to student group
                roleId: 5, // Reference to role ID for student
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 1, // Reference to student group
                roleId: 6, // Reference to role ID for student
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 1, // Reference to student group
                roleId: 7, // Reference to role ID for student
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 1, // Reference to student group
                roleId: 8, // Reference to role ID for student
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 2, // Reference to teacher group
                roleId: 1, // Reference to role ID for teacher
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 2, // Reference to teacher group
                roleId: 2, // Reference to role ID for teacher
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 2, // Reference to teacher group
                roleId: 9, // Reference to role ID for teacher
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 2, // Reference to teacher group
                roleId: 10, // Reference to role ID for teacher
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 2, // Reference to teacher group
                roleId: 11, // Reference to role ID for teacher
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 1, // Reference to teacher group
                roleId: 12, // Reference to role ID for teacher
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 3, // Reference to student group
                roleId: 1, // Reference to role ID for student
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 3, // Reference to student group
                roleId: 2, // Reference to role ID for student
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 3, // Reference to student group
                roleId: 13, // Reference to role ID for student
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 2, // Reference to student group
                roleId: 14, // Reference to role ID for student
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 2, // Reference to student group
                roleId: 15, // Reference to role ID for student
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 2, // Reference to student group
                roleId: 16, // Reference to role ID for student
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 1, // Reference to student group
                roleId: 17, // Reference to role ID for student
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 2, // Reference to student group
                roleId: 17, // Reference to role ID for student
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 3, // Reference to student group
                roleId: 17, // Reference to role ID for student
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 1, // Reference to student group
                roleId: 18, // Reference to role ID for student
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 1, // Reference to student group
                roleId: 19, // Reference to role ID for student
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                GroupID: 1, // Reference to student group
                roleId: 20, // Reference to role ID for student
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
        // Insert Users (1 admin and 10 teachers)
        await queryInterface.bulkInsert('Users', [
            // Admin
            {
                hoTen: 'Admin',
                gioiTinh: 'Female',
                ngaySinh: '2005-04-01', // 2005 -> 15 years old in 2020
                diaChi: 'Hanoi, Vietnam',
                email: 'ad@example.com',
                mk: 'password123',
                groupUserId: 1, // Reference a group from GroupUsers
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                hoTen: 'GiangVien',
                gioiTinh: 'Female',
                ngaySinh: '2005-04-01', // 2005 -> 15 years old in 2020
                diaChi: 'Hanoi, Vietnam',
                email: 'gv@example.com',
                mk: 'password123',
                groupUserId: 2, // Reference a group from GroupUsers
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                hoTen: 'User',
                gioiTinh: 'Female',
                ngaySinh: '2005-04-01', // 2005 -> 15 years old in 2020
                diaChi: 'Hanoi, Vietnam',
                email: 'user@example.com',
                mk: 'password123',
                groupUserId: 3, // Reference a group from GroupUsers
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                hoTen: 'Admin User',
                gioiTinh: 'Male',
                ngaySinh: '1980-01-01',
                diaChi: 'Hanoi, Vietnam',
                email: 'admin@example.com',
                mk: 'securepassword',
                groupUserId: 1, // admin group
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Teacher 1
            {
                hoTen: 'Teacher 1',
                gioiTinh: 'Female',
                ngaySinh: '1985-05-01',
                diaChi: 'Hanoi, Vietnam',
                email: 'teacher1@example.com',
                mk: 'securepassword',
                groupUserId: 2, // teacher group
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Teacher 2
            {
                hoTen: 'Teacher 2',
                gioiTinh: 'Male',
                ngaySinh: '1984-06-15',
                diaChi: 'Hanoi, Vietnam',
                email: 'teacher2@example.com',
                mk: 'securepassword',
                groupUserId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Teacher 3
            {
                hoTen: 'Teacher 3',
                gioiTinh: 'Female',
                ngaySinh: '1987-03-22',
                diaChi: 'Hanoi, Vietnam',
                email: 'teacher3@example.com',
                mk: 'securepassword',
                groupUserId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Teacher 4
            {
                hoTen: 'Teacher 4',
                gioiTinh: 'Male',
                ngaySinh: '1982-11-05',
                diaChi: 'Hanoi, Vietnam',
                email: 'teacher4@example.com',
                mk: 'securepassword',
                groupUserId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Teacher 5
            {
                hoTen: 'Teacher 5',
                gioiTinh: 'Female',
                ngaySinh: '1986-07-12',
                diaChi: 'Hanoi, Vietnam',
                email: 'teacher5@example.com',
                mk: 'securepassword',
                groupUserId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Teacher 6
            {
                hoTen: 'Teacher 6',
                gioiTinh: 'Male',
                ngaySinh: '1983-09-30',
                diaChi: 'Hanoi, Vietnam',
                email: 'teacher6@example.com',
                mk: 'securepassword',
                groupUserId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Teacher 7
            {
                hoTen: 'Teacher 7',
                gioiTinh: 'Female',
                ngaySinh: '1988-02-18',
                diaChi: 'Hanoi, Vietnam',
                email: 'teacher7@example.com',
                mk: 'securepassword',
                groupUserId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Teacher 8
            {
                hoTen: 'Teacher 8',
                gioiTinh: 'Male',
                ngaySinh: '1985-12-03',
                diaChi: 'Hanoi, Vietnam',
                email: 'teacher8@example.com',
                mk: 'securepassword',
                groupUserId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Teacher 9
            {
                hoTen: 'Teacher 9',
                gioiTinh: 'Female',
                ngaySinh: '1987-04-21',
                diaChi: 'Hanoi, Vietnam',
                email: 'teacher9@example.com',
                mk: 'securepassword',
                groupUserId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Teacher 10
            {
                hoTen: 'Teacher 10',
                gioiTinh: 'Male',
                ngaySinh: '1986-08-09',
                diaChi: 'Hanoi, Vietnam',
                email: 'teacher10@example.com',
                mk: 'securepassword',
                groupUserId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
        // Insert Lops
        // Insert Lops với mỗi khối có 2 lớp
        await queryInterface.bulkInsert('Lops', [
            {
                maLop: '10A1',
                tenLop: 'Class 10A1',
                khoiLop: '10',
                siSo: 30, // Sĩ số mẫu
                chuNhiem: 2, // Reference a User ID (Teacher)
                namHoc: '2020-2021',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                maLop: '10A2',
                tenLop: 'Class 10A2',
                khoiLop: '10',
                siSo: 30,
                chuNhiem: 3,
                namHoc: '2020-2021',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                maLop: '11A1',
                tenLop: 'Class 11A1',
                khoiLop: '11',
                siSo: 30,
                chuNhiem: 4,
                namHoc: '2020-2021',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                maLop: '11A2',
                tenLop: 'Class 11A2',
                khoiLop: '11',
                siSo: 30,
                chuNhiem: 5,
                namHoc: '2020-2021',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Nếu cần thêm các khối khác, ví dụ khối 12
            {
                maLop: '12A1',
                tenLop: 'Class 12A1',
                khoiLop: '12',
                siSo: 30,
                chuNhiem: 6,
                namHoc: '2020-2021',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                maLop: '12A2',
                tenLop: 'Class 12A2',
                khoiLop: '12',
                siSo: 30,
                chuNhiem: 7,
                namHoc: '2020-2021',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        // Insert MonHocs
        // Insert 5 môn học (Toán, Lý, Hóa, Văn, Anh)
        await queryInterface.bulkInsert('MonHocs', [
            {
                maMon: 'Toan',
                tenMon: 'Toán',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                maMon: 'Ly',
                tenMon: 'Lý',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                maMon: 'Hoa',
                tenMon: 'Hóa',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                maMon: 'Van',
                tenMon: 'Văn',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                maMon: 'Anh',
                tenMon: 'Anh',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        // Phân công giảng viên cho mỗi môn và cho 6 lớp
        // Giả sử các giáo viên đã tạo có id như sau:
        // Toán: [2, 3]
        // Lý: [4, 5]
        // Hóa: [6, 7]
        // Văn: [8, 9]
        // Anh: [10, 11]

        // Danh sách các lớp (đã chèn tại bảng Lops)
        const classes = ['10A1', '10A2', '11A1', '11A2', '12A1', '12A2'];

        // Bản đồ phân công môn học -> mảng id giáo viên
        const subjectTeacherMap = {
            'Toan': [2, 3],
            'Ly': [4, 5],
            'Hoa': [6, 7],
            'Van': [8, 9],
            'Anh': [10, 11],
        };

        let giangvienLopMons = [];

        // Với mỗi môn, với mỗi lớp và mỗi giáo viên phân công, tạo record trong GiangVien_Lop_Mons
        for (const subject in subjectTeacherMap) {
            const teacherIds = subjectTeacherMap[subject];
            for (const lop of classes) {
                for (const teacherId of teacherIds) {
                    giangvienLopMons.push({
                        maGV: teacherId,
                        maLop: lop,
                        maMon: subject,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });
                }
            }
        }

        await queryInterface.bulkInsert('GiangVien_Lop_Mons', giangvienLopMons);

        // Insert QuyDinhs
        await queryInterface.bulkInsert('QuyDinhs', [
            {
                moTa: 'Tuổi tối thiểu học sinh',
                giaTri: 15, // Min age
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                moTa: 'Tuổi tối đa học sinh',
                giaTri: 20, // Min age
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                moTa: 'Sĩ số tối đa của lớp',
                giaTri: 40, // Max class size
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                moTa: 'Điểm đạt môn',
                giaTri: 5, // Passing grade
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                moTa: 'Số môn học tối đa',
                giaTri: 9, // Max subjects
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        let studentRecords = [];
        let hocSinhLopRecords = [];
        let studentCounter = 1; // Dùng để đánh số học sinh trong mảng tạo mới

        for (const malop of classes) {
            for (let i = 0; i < 40; i++) {
                // Tạo thông tin học sinh (name, email, giới tính, ...)
                let studentName = `Student ${malop} ${i + 1}`;
                let email = `student${studentCounter}@example.com`;
                let newStudent = {
                    hoTen: studentName,
                    gioiTinh: (i % 2 === 0 ? 'Male' : 'Female'),
                    ngaySinh: '2005-01-01',
                    diaChi: 'Hanoi, Vietnam',
                    email: email,
                    mk: 'studentpassword',
                    groupUserId: 3, // giả sử groupUserId = 3 dành cho học sinh
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                studentRecords.push(newStudent);

                // Giả sử các học sinh mới được tạo sẽ có id tự động bắt đầu từ 12
                // => id của học sinh thứ studentCounter sẽ là (studentCounter + 11)
                let newAssignment = {
                    maHS: studentCounter + 11,
                    maLop: malop,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                hocSinhLopRecords.push(newAssignment);

                studentCounter++;
            }
        }

        // Chèn các học sinh mới vào bảng Users
        await queryInterface.bulkInsert('Users', studentRecords);

        // Chèn phân công vào bảng HocSinh_Lops
        await queryInterface.bulkInsert('HocSinh_Lops', hocSinhLopRecords);
        // --- Tạo bảng điểm cho tất cả học sinh ---
        // Danh sách các môn học và học kỳ
        const subjects = ['Toan', 'Ly', 'Hoa', 'Van', 'Anh'];
        const semesters = ['I', 'II'];

        // Giả sử hocSinhLopRecords đã được tạo ở phần trước (mỗi record có { maHS, maLop })
        let bangdiemRecords = [];

        // Với mỗi học sinh được phân công trong bảng HocSinh_Lops,
        // tạo bảng điểm cho từng môn và từng học kỳ
        for (const record of hocSinhLopRecords) {
            const { maHS, maLop } = record;
            for (const subject of subjects) {
                for (const sem of semesters) {
                    bangdiemRecords.push({
                        maHS: maHS,
                        maLop: maLop,
                        maMon: subject,
                        hocKy: sem,
                        diem15p: 8.0,        // Ví dụ: điểm 15 phút mặc định
                        diem1Tiet: 7.0,       // Ví dụ: điểm 1 tiết mặc định
                        diemTB: 7.5,          // Ví dụ: điểm trung bình mặc định
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });
                }
            }
        }

        // Chèn các bản ghi vào bảng BangDiems
        await queryInterface.bulkInsert('BangDiems', bangdiemRecords);
    },

    down: async (queryInterface, Sequelize) => {
        // Delete data from tables in reverse order of dependencies
        await queryInterface.bulkDelete('BangDiems', null, {}); // Delete BangDiems first
        await queryInterface.bulkDelete('HocSinh_Lops', null, {}); // Then HocSinh_Lops
        await queryInterface.bulkDelete('GiangVien_Lop_Mons', null, {}); // Then GiangVien_Lop_Mons
        await queryInterface.bulkDelete('GroupRoles', null, {}); // Then GroupRoles
        await queryInterface.bulkDelete('Lops', null, {}); // Then Lops
        await queryInterface.bulkDelete('Roles', null, {}); // Then Roles
        await queryInterface.bulkDelete('Users', null, {}); // Delete Users before GroupUsers
        await queryInterface.bulkDelete('GroupUsers', null, {}); // Then GroupUsers
        await queryInterface.bulkDelete('QuyDinhs', null, {}); // Then QuyDinhs
        await queryInterface.bulkDelete('MonHocs', null, {}); // Then MonHocs
    }
};
