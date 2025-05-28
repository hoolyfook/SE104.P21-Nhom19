import db from "../models/index.js";

const getUsers = async () => {
    try {
        let users = await db.Users.findAll({
            attributes: ['id', 'hoTen', 'gioiTinh', 'ngaySinh', 'diaChi', 'email', 'mk'],
            include: [
                {
                    model: db.GroupUsers,
                    as: 'GroupUsers',
                    attributes: ['name']
                }, {
                    model: db.Lops,
                    as: 'Lops',
                    attributes: ['maLop', 'tenLop'],
                    through: { attributes: [] } // Exclude HocSinh_Lops fields
                }
            ]
        });
        return {
            EM: "Get Users success",
            EC: "0",
            DT: users,
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const createUser = async (data) => {
    try {
        let user = await db.Users.findOne({
            where: { email: data.email },
            attributes: ['email']
        });
        if (user !== null) {
            return {
                EM: "Email already exists",
                EC: "-1",
                DT: [],
            }
        }

        let groupUserId = await db.GroupUsers.findOne({
            where: { name: data.GroupUsers },
            attributes: ['id']
        });

        if (groupUserId !== null) {
            // Check if GroupUsers is "student"
            if (data.GroupUsers === "student") {
                // Calculate age
                const currentYear = new Date().getFullYear();
                const birthYear = new Date(data.ngaySinh).getFullYear();
                const age = currentYear - birthYear;

                // Fetch age limits from QuyDinhs
                const minAgeRule = await db.QuyDinhs.findOne({
                    where: { moTa: "Tuổi tối thiểu học sinh" },
                    attributes: ['giaTri']
                });
                const maxAgeRule = await db.QuyDinhs.findOne({
                    where: { moTa: "Tuổi tối đa học sinh" },
                    attributes: ['giaTri']
                });

                if (!minAgeRule || !maxAgeRule) {
                    return {
                        EM: "Age rules not found",
                        EC: "-1",
                        DT: [],
                    }
                }

                const minAge = parseInt(minAgeRule.giaTri);
                const maxAge = parseInt(maxAgeRule.giaTri);

                // Validate age
                if (age < minAge || age > maxAge) {
                    return {
                        EM: `Student age must be between ${minAge} and ${maxAge}`,
                        EC: "-1",
                        DT: [],
                    }
                }
            }

            let user = await db.Users.create({
                hoTen: data.hoTen,
                gioiTinh: data.gioiTinh,
                ngaySinh: data.ngaySinh,
                diaChi: data.diaChi,
                email: data.email,
                mk: "123456",
                groupUserId: groupUserId.id
            });
            user = user.get({ plain: true });
            return {
                EM: "Create User success",
                EC: "0",
                DT: [],
            }
        } else {
            return {
                EM: "GroupUser not found",
                EC: "-1",
                DT: [],
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const updateUser = async (data) => {
    try {
        let user = await db.Users.findOne({
            where: { id: data.id },
            attributes: ['id', 'email', 'ngaySinh']
        });
        if (!user) {
            return {
                EM: "User not found",
                EC: "-1",
                DT: [],
            }
        }

        let groupUserId = await db.GroupUsers.findOne({
            where: { name: data.GroupUsers },
            attributes: ['id']
        });

        if (groupUserId !== null) {
            // Check if GroupUsers is "student"
            if (data.GroupUsers === "student") {
                // Calculate age
                const currentYear = new Date().getFullYear();
                const birthYear = new Date(data.ngaySinh).getFullYear();
                const age = currentYear - birthYear;

                // Fetch age limits from QuyDinhs
                const minAgeRule = await db.QuyDinhs.findOne({
                    where: { moTa: "Tuổi tối thiểu học sinh" },
                    attributes: ['giaTri']
                });
                const maxAgeRule = await db.QuyDinhs.findOne({
                    where: { moTa: "Tuổi tối đa học sinh" },
                    attributes: ['giaTri']
                });

                if (!minAgeRule || !maxAgeRule) {
                    return {
                        EM: "Age rules not found",
                        EC: "-1",
                        DT: [],
                    }
                }

                const minAge = parseInt(minAgeRule.giaTri);
                const maxAge = parseInt(maxAgeRule.giaTri);

                // Validate age
                if (age < minAge || age > maxAge) {
                    return {
                        EM: `Student age must be between ${minAge} and ${maxAge}`,
                        EC: "-1",
                        DT: [],
                    }
                }
            }

            // Update user
            await db.Users.update({
                hoTen: data.hoTen,
                gioiTinh: data.gioiTinh,
                ngaySinh: data.ngaySinh,
                diaChi: data.diaChi,
                email: data.email,
                mk: data.mk,
                groupUserId: groupUserId.id
            }, {
                where: { id: data.id }
            });

            return {
                EM: "Update User success",
                EC: "0",
                DT: [],
            }
        } else {
            return {
                EM: "GroupUser not found",
                EC: "-1",
                DT: [],
            }
        }
    } catch (e) {
        console.log(e);
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const deleteUser = async (myid, id) => {
    try {
        if (myid === id) {
            return {
                EM: "Cannot delete yourself",
                EC: "-1",
                DT: [],
            }
        }
        let user = await db.Users.destroy({
            where: { id }
        });
        return {
            EM: "Delete User success",
            EC: "0",
            DT: [],
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const getQuyDinh = async () => {
    try {
        let quydinh = await db.QuyDinhs.findAll({
            attributes: ['id', 'moTa', 'giaTri']
        });
        return {
            EM: "Get QuyDinh success",
            EC: "0",
            DT: quydinh,
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const createQuyDinh = async (data) => {
    try {
        await db.QuyDinhs.create({
            moTa: data.moTa,
            giaTri: data.giaTri
        });
        return {
            EM: "Create QuyDinh success",
            EC: "0",
            DT: [],
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const updateQuyDinh = async (data) => {
    try {
        let quydinh = await db.QuyDinhs.update({
            moTa: data.moTa,
            giaTri: data.giaTri
        }, {
            where: { id: data.id }
        });
        return {
            EM: "Update QuyDinh success",
            EC: "0",
            DT: [],
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const deleteQuyDinh = async (id) => {
    try {
        await db.QuyDinhs.destroy({
            where: { id: id }
        });
        return {
            EM: "Delete QuyDinh success",
            EC: "0",
            DT: [],
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const getLops = async () => {
    try {
        let lops = await db.Lops.findAll({
            attributes: ['maLop', 'tenLop', 'siSo', 'khoiLop', 'namHoc'],
        });
        return {
            EM: "Get Lops success",
            EC: "0",
            DT: lops,
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const createLop = async (data) => {
    try {
        let lop = await db.Lops.findOne({
            where: { maLop: data.maLop }
        });
        if (lop !== null) {
            return {
                EM: "Lop already exists",
                EC: "-1",
                DT: [],
            }
        }
        await db.Lops.create({
            maLop: data.maLop,
            tenLop: data.tenLop,
            siSo: 0,
            khoiLop: data.khoiLop,
            namHoc: data.namHoc
        });
        return {
            EM: "Create Lop success",
            EC: "0",
            DT: [],
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const updateLop = async (data) => {
    try {
        let lop = await db.Lops.findOne({
            where: { maLop: data.maLop }
        });
        if (lop === null) {
            return {
                EM: "Lop not found",
                EC: "-1",
                DT: [],
            }
        }
        await db.Lops.update({
            tenLop: data.tenLop,
            siSo: data.siSo,
            khoiLop: data.khoiLop,
            namHoc: data.namHoc
        }, {
            where: { maLop: data.maLop }
        });
        return {
            EM: "Update Lop success",
            EC: "0",
            DT: [],
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const deleteLop = async (maLop) => {
    try {
        let lop = await db.Lops.findOne({
            where: { maLop: maLop }
        });
        if (lop === null) {
            return {
                EM: "Lop not found",
                EC: "-1",
                DT: [],
            }
        }
        await db.Lops.destroy({
            where: { maLop: maLop }
        });
        return {
            EM: "Delete Lop success",
            EC: "0",
            DT: [],
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const getMonHocs = async () => {
    try {
        let monhocs = await db.MonHocs.findAll({
            attributes: ['maMon', 'tenMon']
        });
        return {
            EM: "Get MonHocs success",
            EC: "0",
            DT: monhocs,
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const createMonHoc = async (data) => {
    try {
        // Check if the subject already exists
        let monhoc = await db.MonHocs.findOne({
            where: { maMon: data.maMon }
        });
        if (monhoc !== null) {
            return {
                EM: "MonHoc already exists",
                EC: "-1",
                DT: [],
            };
        }

        // Fetch the maximum number of subjects allowed from QuyDinhs
        let maxSubjectsRule = await db.QuyDinhs.findOne({
            where: { moTa: "Số môn học tối đa" },
            attributes: ['giaTri']
        });

        if (!maxSubjectsRule) {
            return {
                EM: "Maximum subjects rule not found",
                EC: "-1",
                DT: [],
            };
        }

        const maxSubjects = parseInt(maxSubjectsRule.giaTri);

        // Count the current number of subjects
        let currentSubjectsCount = await db.MonHocs.count();

        if (currentSubjectsCount >= maxSubjects) {
            return {
                EM: `Cannot create more subjects. Maximum allowed is ${maxSubjects}`,
                EC: "-1",
                DT: [],
            };
        }

        // Create the new subject
        await db.MonHocs.create({
            maMon: data.maMon,
            tenMon: data.tenMon
        });

        return {
            EM: "Create MonHoc success",
            EC: "0",
            DT: [],
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        };
    }
};
const updateMonHoc = async (data) => {
    try {
        let monhoc = await db.MonHocs.findOne({
            where: { maMon: data.maMon }
        });
        if (monhoc === null) {
            return {
                EM: "MonHoc not found",
                EC: "-1",
                DT: [],
            }
        }
        await db.MonHocs.update({
            tenMon: data.tenMon
        }, {
            where: { maMon: data.maMon }
        });
        return {
            EM: "Update MonHoc success",
            EC: "0",
            DT: [],
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const deleteMonHoc = async (maMon) => {
    try {
        let monhoc = await db.MonHocs.findOne({
            where: { maMon: maMon }
        });
        if (monhoc === null) {
            return {
                EM: "MonHoc not found",
                EC: "-1",
                DT: [],
            }
        }
        await db.MonHocs.destroy({
            where: { maMon: maMon }
        });
        return {
            EM: "Delete MonHoc success",
            EC: "0",
            DT: [],
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const getPhanCong = async () => {
    try {
        let phancong = await db.GiangVien_Lop_Mons.findAll({
            attributes: ['id', 'maGV', 'maMon', 'maLop'],
            include: [
                {
                    model: db.Users,
                    as: 'Users',
                    attributes: ['hoTen']
                },
                {
                    model: db.MonHocs,
                    as: 'MonHocs',
                    attributes: ['tenMon']
                },
                {
                    model: db.Lops,
                    as: 'Lops',
                    attributes: ['tenLop']
                }
            ]
        });
        return {
            EM: "Get PhanCong success",
            EC: "0",
            DT: phancong,
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const createPhanCong = async (data) => {
    try {
        let gv = await db.Users.findOne({
            where: {
                id: data.maGV,
                groupUserId: 2
            },
            attributes: ['id']
        });
        if (gv === null) {
            return {
                EM: "GiangVien not found",
                EC: "-1",
                DT: [],
            }
        }
        let mon = await db.MonHocs.findOne({
            where: { maMon: data.maMon },
            attributes: ['maMon']
        });
        if (mon === null) {
            return {
                EM: "MonHoc not found",
                EC: "-1",
                DT: [],
            }
        }
        let lop = await db.Lops.findOne({
            where: { maLop: data.maLop },
            attributes: ['maLop']
        });
        if (lop === null) {
            return {
                EM: "Lop not found",
                EC: "-1",
                DT: [],
            }
        }
        let phancong = await db.GiangVien_Lop_Mons.findOne({
            where: {
                maGV: data.maGV,
                maMon: data.maMon,
                maLop: data.maLop
            }
        });
        if (phancong !== null) {
            return {
                EM: "PhanCong already exists",
                EC: "-1",
                DT: [],
            }
        }
        await db.GiangVien_Lop_Mons.create({
            maGV: data.maGV,
            maMon: data.maMon,
            maLop: data.maLop
        });
        return {
            EM: "Create PhanCong success",
            EC: "0",
            DT: [],
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const updatePhanCong = async (data) => {
    try {
        let gv = await db.Users.findOne({
            where: { id: data.maGV, groupUserId: 2 },
            attributes: ['id']
        });
        if (gv === null) {
            return {
                EM: "GiangVien not found",
                EC: "-1",
                DT: [],
            }
        }
        let mon = await db.MonHocs.findOne({
            where: { maMon: data.maMon },
            attributes: ['maMon']
        });
        if (mon === null) {
            return {
                EM: "MonHoc not found",
                EC: "-1",
                DT: [],
            }
        }
        let lop = await db.Lops.findOne({
            where: { maLop: data.maLop },
            attributes: ['maLop']
        });
        if (lop === null) {
            return {
                EM: "Lop not found",
                EC: "-1",
                DT: [],
            }
        }
        let phancong = await db.GiangVien_Lop_Mons.findOne({
            where: {
                id: data.id,
            }
        });
        if (phancong === null) {
            return {
                EM: "PhanCong not found",
                EC: "-1",
                DT: [],
            }
        }
        await db.GiangVien_Lop_Mons.update({
            maGV: data.maGV,
            maMon: data.maMon,
            maLop: data.maLop
        }, {
            where: { id: phancong.id }
        });
        return {
            EM: "Update PhanCong success",
            EC: "0",
            DT: [],
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const deletePhanCong = async (id) => {
    try {
        let phancong = await db.GiangVien_Lop_Mons.findOne({
            where: { id: id }
        });
        if (phancong === null) {
            return {
                EM: "PhanCong not found",
                EC: "-1",
                DT: [],
            }
        }
        await db.GiangVien_Lop_Mons.destroy({
            where: { id: id }
        });
        return {
            EM: "Delete PhanCong success",
            EC: "0",
            DT: [],
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const getHocSinhLop = async (data) => {
    try {
        let hocsinh = await db.HocSinh_Lops.findAll({
            where: { maLop: data.maLop },
            attributes: ['maHS'],
            include: [
                {
                    model: db.Users,
                    as: 'Users',
                    attributes: ['hoTen', 'gioiTinh', 'ngaySinh', 'diaChi', 'email'],
                }
            ]
        });
        return {
            EM: "Get HocSinhLop success",
            EC: "0",
            DT: hocsinh,
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const createHocSinhLop = async (data) => {
    try {
        let hocsinh = await db.Users.findOne({
            where: { id: data.maHS, groupUserId: 3 },
            attributes: ['id']
        });
        if (hocsinh === null) {
            return {
                EM: "HocSinh not found",
                EC: "-1",
                DT: [],
            }
        }
        let lop = await db.Lops.findOne({
            where: { maLop: data.maLop },
            attributes: ['maLop']
        });
        if (lop === null) {
            return {
                EM: "Lop not found",
                EC: "-1",
                DT: [],
            }
        }
        let hocsinhlop = await db.HocSinh_Lops.findOne({
            where: {
                maHS: data.maHS,
                maLop: data.maLop
            }
        });
        if (hocsinhlop !== null) {
            return {
                EM: "HocSinhLop already exists",
                EC: "-1",
                DT: [],
            }
        }
        let siSomax = await db.QuyDinhs.findOne({
            where: { moTa: "Sĩ số tối đa của lớp" },
            attributes: ['giaTri']
        });
        siSomax = siSomax.get({ plain: true });
        let count = await db.HocSinh_Lops.count({
            where: { maLop: data.maLop }
        });
        if (siSomax.giaTri > count) {
            await db.HocSinh_Lops.create({
                maHS: data.maHS,
                maLop: data.maLop
            });
            await db.Lops.update({
                siSo: count + 1
            }, {
                where: { maLop: data.maLop }
            });
            return {
                EM: "Create HocSinhLop success",
                EC: "0",
                DT: [],
            }
        }
        else {
            return {
                EM: "Class full",
                EC: "-1",
                DT: [],
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const updateHocSinhLop = async (data) => {
    try {
        let hocsinh = await db.Users.findOne({
            where: { id: data.maHS },
            attributes: ['id']
        });
        if (hocsinh === null) {
            return {
                EM: "HocSinh not found",
                EC: "-1",
                DT: [],
            }
        }
        let lop = await db.Lops.findOne({
            where: { maLop: data.maLop },
            attributes: ['maLop']
        });
        if (lop === null) {
            return {
                EM: "Lop not found",
                EC: "-1",
                DT: [],
            }
        }
        let hocsinhlop = await db.HocSinh_Lops.findOne({
            where: { id: data.id }
        });
        if (hocsinhlop === null) {
            return {
                EM: "HocSinhLop not found",
                EC: "-1",
                DT: [],
            }
        }
        await db.HocSinh_Lops.update({
            maHS: data.maHS,
            maLop: data.maLop
        }, {
            where: { id: hocsinhlop.id }
        });
        return {
            EM: "Update HocSinhLop success",
            EC: "0",
            DT: [],
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const deleteHocSinhLop = async (id) => {
    try {
        let hocsinhlop = await db.HocSinh_Lops.findOne({
            where: { id: id }
        });
        if (hocsinhlop === null) {
            return {
                EM: "HocSinhLop not found",
                EC: "-1",
                DT: [],
            }
        }
        await db.HocSinh_Lops.destroy({
            where: { id: id }
        });
        await db.Lops.update({
            siSo: count - 1
        }, {
            where: { maLop: hocsinhlop.maLop }
        });
        return {
            EM: "Delete HocSinhLop success",
            EC: "0",
            DT: [],
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const getBaoCaoKy = async (query) => {
    try {
        // Fetch all scores for the class and semester
        let bangdiem = await db.BangDiems.findAll({
            where: { maLop: query.maLop, hocKy: query.hocKy },
            attributes: ['maHS', 'diemTB', 'maMon'],
        });

        if (bangdiem.length === 0) {
            return {
                EM: "No scores found for the class and semester",
                EC: "-1",
                DT: [],
            };
        }

        // Fetch the passing score
        let diemdau = await db.QuyDinhs.findOne({
            where: { moTa: "Điểm đạt môn" },
            attributes: ['giaTri'],
        });

        if (!diemdau) {
            return {
                EM: "Passing score rule not found",
                EC: "-1",
                DT: [],
            };
        }

        const passingScore = parseFloat(diemdau.giaTri);

        // Group scores by student
        let studentScores = {};
        bangdiem.forEach((bd) => {
            if (!studentScores[bd.maHS]) {
                studentScores[bd.maHS] = [];
            }
            studentScores[bd.maHS].push(bd.diemTB);
        });

        // Calculate average score for each student and count the number of students who passed
        let passedStudents = 0;
        for (let maHS in studentScores) {
            const scores = studentScores[maHS];
            const totalScore = scores.reduce((sum, score) => sum + (score || 0), 0);
            const averageScore = totalScore / scores.length;

            if (averageScore >= passingScore) {
                passedStudents++;
            }
        }

        // Fetch the class size
        let Lop = await db.Lops.findOne({
            where: { maLop: query.maLop },
            attributes: ['siSo'],
        });

        if (!Lop) {
            return {
                EM: "Class not found",
                EC: "-1",
                DT: [],
            };
        }

        const classSize = Lop.siSo;

        // Calculate the pass rate
        const passRate = (passedStudents / classSize) * 100;

        // Check if a record already exists in BaoCaoTongKetHocKys
        let existingReport = await db.BaoCaoTongKetHocKys.findOne({
            where: {
                maLop: query.maLop,
                hocKy: query.hocKy,
            },
        });

        if (existingReport) {
            // Update the existing record
            await db.BaoCaoTongKetHocKys.update(
                {
                    siSo: classSize,
                    soLuongDat: passedStudents,
                    tiLe: passRate,
                },
                {
                    where: {
                        maLop: query.maLop,
                        hocKy: query.hocKy,
                    },
                }
            );
        } else {
            // Create a new record
            await db.BaoCaoTongKetHocKys.create({
                maLop: query.maLop,
                hocKy: query.hocKy,
                siSo: classSize,
                soLuongDat: passedStudents,
                tiLe: passRate,
            });
        }

        return {
            EM: "Get bao cao ky success",
            EC: "0",
            DT: {
                passedStudents,
                classSize,
                passRate,
            },
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        };
    }
};
const deleteBaoCaoKy = async (data) => {
    try {
        // Check if the report exists
        let bangdiem = await db.BaoCaoTongKetHocKys.destroy({
            where: { maLop: data.maLop, hocKy: data.hocKy }
        });
        return {
            EM: "Delete BaoCaoKy success",
            EC: "0",
            DT: bangdiem,
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const getBaoCaoLops = async (query) => {
    try {
        // Validate that hocKy and namHoc are provided
        const { hocKy, namHoc } = query;
        if (!hocKy || !namHoc) {
            throw new Error("hocKy and namHoc parameters are required");
        }

        // Retrieve all classes matching the academic year
        let allLops = await db.Lops.findAll({
            where: { namHoc },
            attributes: ['maLop', 'siSo', 'tenLop']
        });

        // Fetch the passing score rule
        let rule = await db.QuyDinhs.findOne({
            where: { moTa: "Điểm đạt môn" },
            attributes: ['giaTri']
        });
        if (!rule) {
            throw new Error("Passing score rule not found");
        }
        const passingScore = parseFloat(rule.giaTri);

        // Loop through each class and update or create the report
        for (const lop of allLops) {
            // Fetch all scores for this class in the given semester
            let scores = await db.BangDiems.findAll({
                where: { maLop: lop.maLop, hocKy },
                attributes: ['maHS', 'diemTB']
            });

            // If no scores exist, skip updating report for that class
            if (scores.length === 0) continue;

            // Group scores by student (maHS)
            let studentScores = {};
            scores.forEach(score => {
                if (!studentScores[score.maHS]) {
                    studentScores[score.maHS] = [];
                }
                studentScores[score.maHS].push(score.diemTB);
            });

            // Calculate the number of students who passed
            let passedStudents = 0;
            for (let maHS in studentScores) {
                const scoresArr = studentScores[maHS];
                const avgScore = scoresArr.reduce((sum, d) => sum + (d || 0), 0) / scoresArr.length;
                if (avgScore >= passingScore) {
                    passedStudents++;
                }
            }

            const classSize = lop.siSo;
            const passRate = (passedStudents / classSize) * 100;

            // Check if a report already exists for the class and hocKy
            let existingReport = await db.BaoCaoTongKetHocKys.findOne({
                where: { maLop: lop.maLop, hocKy }
            });

            if (existingReport) {
                // Update the existing record
                await db.BaoCaoTongKetHocKys.update({
                    siSo: classSize,
                    soLuongDat: passedStudents,
                    tiLe: passRate,
                }, {
                    where: { maLop: lop.maLop, hocKy }
                });
            } else {
                // Create a new record
                await db.BaoCaoTongKetHocKys.create({
                    maLop: lop.maLop,
                    hocKy,
                    siSo: classSize,
                    soLuongDat: passedStudents,
                    tiLe: passRate,
                });
            }
        }

        // Fetch and return all reports for the given hocKy with related class info
        let reports = await db.BaoCaoTongKetHocKys.findAll({
            where: { hocKy },
            attributes: ['maLop', 'hocKy', 'siSo', 'soLuongDat', 'tiLe'],
            include: [
                {
                    model: db.Lops,
                    as: 'Lops',
                    attributes: ['tenLop']
                }
            ]
        });

        return {
            EM: "Get BaoCaoLops success",
            EC: "0",
            DT: reports,
        }
    } catch (e) {
        console.log(e);
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        }
    }
}
const getBaoCaoMons = async (query) => {
    try {
        // Validate that hocKy, maMon and namHoc are provided
        const { hocKy, maMon, namHoc } = query;
        if (!hocKy || !maMon || !namHoc) {
            throw new Error("hocKy, maMon and namHoc parameters are required");
        }

        // Fetch the passing score rule
        let rule = await db.QuyDinhs.findOne({
            where: { moTa: "Điểm đạt môn" },
            attributes: ['giaTri']
        });
        if (!rule) {
            throw new Error("Passing score rule not found");
        }
        const passingScore = parseFloat(rule.giaTri);

        // Retrieve all classes matching the academic year
        let allLops = await db.Lops.findAll({
            where: { namHoc },
            attributes: ['maLop', 'siSo']
        });

        // Array to accumulate per-class reports
        let reports = [];

        for (const lop of allLops) {
            // Fetch scores for this class, subject and semester (hocKy)
            let scores = await db.BangDiems.findAll({
                where: { maLop: lop.maLop, hocKy, maMon },
                attributes: ['maHS', 'diemTB']
            });

            // Only proceed if class has scores
            if (scores.length === 0) continue;

            const classSize = lop.siSo;

            // Group scores by student (maHS)
            let studentScores = {};
            scores.forEach(score => {
                if (!studentScores[score.maHS]) {
                    studentScores[score.maHS] = [];
                }
                studentScores[score.maHS].push(score.diemTB);
            });

            // Count number of students who passed in this class
            let passedStudents = 0;
            for (let maHS in studentScores) {
                const scoresArr = studentScores[maHS];
                const avgScore = scoresArr.reduce((sum, d) => sum + (d || 0), 0) / scoresArr.length;
                if (avgScore >= passingScore) {
                    passedStudents++;
                }
            }

            // Calculate class pass rate
            const passRate = (passedStudents / classSize) * 100;

            // Check if a record already exists in BaoCaoTongKetMons for this subject, hocKy and class
            let existingReport = await db.BaoCaoTongKetMons.findOne({
                where: { maMon, hocKy, maLop: lop.maLop }
            });

            if (existingReport) {
                // Update the existing record
                await db.BaoCaoTongKetMons.update({
                    siSo: classSize,
                    soLuongDat: passedStudents,
                    tiLe: passRate,
                }, {
                    where: { maMon, hocKy, maLop: lop.maLop }
                });
            } else {
                // Create a new record
                await db.BaoCaoTongKetMons.create({
                    maMon,
                    hocKy,
                    maLop: lop.maLop,
                    siSo: classSize,
                    soLuongDat: passedStudents,
                    tiLe: passRate,
                });
            }

            // Push per-class report to the array
            reports.push({
                maLop: lop.maLop,
                maMon,
                hocKy,
                siSo: classSize,
                soLuongDat: passedStudents,
                tiLe: passRate
            });
        }

        // If no class had scores, return an empty report
        if (reports.length === 0) {
            return {
                EM: "No scores found for the subject and semester",
                EC: "-1",
                DT: {}
            }
        }

        return {
            EM: "Get BaoCaoMons success",
            EC: "0",
            DT: reports
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "Error from server",
            EC: "-1",
            DT: []
        };
    }
}
const adminService = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getQuyDinh,
    createQuyDinh,
    updateQuyDinh,
    deleteQuyDinh,
    getLops,
    createLop,
    updateLop,
    deleteLop,
    getMonHocs,
    createMonHoc,
    updateMonHoc,
    deleteMonHoc,
    getPhanCong,
    createPhanCong,
    updatePhanCong,
    deletePhanCong,
    getHocSinhLop,
    createHocSinhLop,
    updateHocSinhLop,
    deleteHocSinhLop,
    getBaoCaoKy,
    deleteBaoCaoKy,
    getBaoCaoLops,
    getBaoCaoMons
};

export default adminService;