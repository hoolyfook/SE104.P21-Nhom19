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
        ]);
        await queryInterface.bulkInsert('Users', [
            {
                hoTen: 'Nguyễn Thị A',
                gioiTinh: 'Female',
                ngaySinh: '2005-04-01', // 2005 -> 15 years old in 2020
                diaChi: 'Hanoi, Vietnam',
                email: 'nguyen.a@example.com',
                mk: 'password123',
                groupUserId: 1, // Reference a group from GroupUsers
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                hoTen: 'Tran Minh B',
                gioiTinh: 'Male',
                ngaySinh: '2004-08-15', // 2004 -> 16 years old in 2020
                diaChi: 'Ho Chi Minh, Vietnam',
                email: 'tran.b1@example.com',
                mk: 'password123',
                groupUserId: 2, // Reference a group from GroupUsers
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                hoTen: 'Tran Van B',
                gioiTinh: 'Male',
                ngaySinh: '2004-08-15', // 2004 -> 16 years old in 2020
                diaChi: 'Ho Chi Minh, Vietnam',
                email: 'tran.b2@example.com',
                mk: 'password123',
                groupUserId: 2, // Reference a group from GroupUsers
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                hoTen: 'Le Thi C',
                gioiTinh: 'Female',
                ngaySinh: '2001-11-25', // 2001 -> 19 years old in 2020
                diaChi: 'Da Nang, Vietnam',
                email: 'le.c1@example.com',
                mk: 'password123',
                groupUserId: 3, // Reference a group from GroupUsers
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                hoTen: 'Le Van C',
                gioiTinh: 'Female',
                ngaySinh: '2001-11-25', // 2001 -> 19 years old in 2020
                diaChi: 'Da Nang, Vietnam',
                email: 'le.c2@example.com',
                mk: 'password123',
                groupUserId: 3, // Reference a group from GroupUsers
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
        // Insert Lops
        await queryInterface.bulkInsert('Lops', [
            {
                maLop: '10A1',
                tenLop: 'Class 10A1',
                khoiLop: '10',
                siSo: 1, // Within the limit of 40 students per class (QĐ2)
                chuNhiem: 2, // Reference a User ID (Teacher)
                namHoc: '2020-2021',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                maLop: '11A1',
                tenLop: 'Class 11A1',
                khoiLop: '11',
                siSo: 1, // Within the limit of 40 students per class (QĐ2)
                chuNhiem: 3, // Reference a User ID (Teacher)
                namHoc: '2020-2021',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        // Insert MonHocs
        await queryInterface.bulkInsert('MonHocs', [
            {
                maMon: 'Math',
                tenMon: 'Mathematics',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                maMon: 'Physics',
                tenMon: 'Physics',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        // Insert GiangVien_Lop_Mons
        await queryInterface.bulkInsert('GiangVien_Lop_Mons', [
            {
                maGV: 2, // Reference a User ID (Teacher)
                maLop: '10A1',
                maMon: 'Math',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                maGV: 2, // Reference another User ID (Teacher)
                maLop: '11A1',
                maMon: 'Math',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                maGV: 3, // Reference a User ID (Teacher)
                maLop: '11A1',
                maMon: 'Physics',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                maGV: 3, // Reference a User ID (Teacher)
                maLop: '10A1',
                maMon: 'Physics',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        // Insert BangDiems
        await queryInterface.bulkInsert('BangDiems', [
            {
                maHS: 4, // Reference a User ID (Student)
                maLop: '10A1',
                maMon: 'Math',
                hocKy: 'I',
                diem15p: 8.5,
                diem1Tiet: 7.0,
                diemTB: 7.5, // Average score
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

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

        // Insert HocSinh_Lops
        await queryInterface.bulkInsert('HocSinh_Lops', [
            {
                maHS: 4, // Reference a Student
                maLop: '10A1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                maHS: 5, // Reference a Student
                maLop: '11A1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
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
