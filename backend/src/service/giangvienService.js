import db from "../models/index.js";
const getPhanCong = async (maGV) => {
    try {
        let phancong = await db.GiangVien_Lop_Mons.findAll({
            where: { maGV: maGV },
            attributes: ['id', 'maMon', 'maLop'],
            include: [
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
const getBangDiem = async (id, query) => {
    try {
        let phancong = await db.GiangVien_Lop_Mons.findOne({
            where: { maGV: id, maLop: query.maLop, maMon: query.maMon },
        });
        if (!phancong) {
            return {
                EM: "Don't have permission",
                EC: "-1",
                DT: [],
            }
        }
        let bangdiem = await db.BangDiems.findAll({
            where: { maLop: query.maLop, maMon: query.maMon },
            attributes: ['id', 'maHS', 'diem15p', 'diem1Tiet', 'diemTB'],
            include: [
                {
                    model: db.Users,
                    as: 'Users',
                    attributes: ['hoTen']
                },
            ]
        });
        return {
            EM: "Get BangDiem success",
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
const createBangDiem = async (id, data) => {
    try {
        let phancong = await db.GiangVien_Lop_Mons.findOne({
            where: { maGV: id, maLop: data.maLop, maMon: data.maMon },
        });
        if (!phancong) {
            return {
                EM: "Don't have permission",
                EC: "-1",
                DT: [],
            }
        }
        let hocsinh = await db.HocSinh_Lops.findOne({
            where: { maHS: data.maHS, maLop: data.maLop },
        });
        if (!hocsinh) {
            return {
                EM: "Don't have student",
                EC: "-1",
                DT: [],
            }
        }
        let checkBangDiem = await db.BangDiems.findOne({
            where: { maHS: data.maHS, maLop: data.maLop, maMon: data.maMon, hocKy: data.hocKy }
        });
        if (checkBangDiem) {
            return {
                EM: "BangDiem exists",
                EC: "-1",
                DT: [],
            }
        }
        await db.BangDiems.create({
            maHS: data.maHS,
            maLop: data.maLop,
            maMon: data.maMon,
            hocKy: data.hocKy,
            diem15p: null,
            diem1Tiet: null,
            diemTB: null
        });
        return {
            EM: "Create BangDiem success",
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
const updateBangDiem = async (id, data) => {
    try {
        let phancong = await db.GiangVien_Lop_Mons.findOne({
            where: { maGV: id, maLop: data.maLop, maMon: data.maMon },
        });
        if (!phancong) {
            return {
                EM: "Don't have permission",
                EC: "-1",
                DT: [],
            }
        }
        let diemTB = null;
        let diem15p = null
        let diem1Tiet = null;
        if (data.diem15p !== undefined) {
            diem15p = data.diem15p;
        }
        if (data.diem1Tiet !== undefined) {
            diem1Tiet = data.diem1Tiet;
        }
        if (data.diem15p !== undefined && data.diem1Tiet !== undefined) {
            diemTB = (data.diem15p + data.diem1Tiet * 2) / 3;
        }

        let bangdiem = await db.BangDiems.update({
            diem15p: diem15p,
            diem1Tiet: diem1Tiet,
            diemTB: diemTB, // Cập nhật diemTB nếu có
        }, {
            where: { maLop: data.maLop, maMon: data.maMon, maHS: data.maHS, hocKy: data.hocKy }
        });
        return {
            EM: "Update BangDiem success",
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
const deleteBangDiem = async (id, data) => {
    try {
        let phancong = await db.GiangVien_Lop_Mons.findOne({
            where: { maGV: id, maLop: data.maLop, maMon: data.maMon },
        });
        if (!phancong) {
            return {
                EM: "Don't have permission",
                EC: "-1",
                DT: [],
            }
        }
        let bangdiem = await db.BangDiems.destroy({
            where: { maLop: data.maLop, maMon: data.maMon, maHS: data.maHS }
        });
        return {
            EM: "Delete BangDiem success",
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
const getBaoCaoMon = async (id, query) => {
    try {
        // Check if the teacher has permission for the class and subject
        let phancong = await db.GiangVien_Lop_Mons.findOne({
            where: { maGV: id, maLop: query.maLop, maMon: query.maMon },
        });
        if (!phancong) {
            return {
                EM: "Don't have permission",
                EC: "-1",
                DT: [],
            };
        }

        // Fetch all scores for the class, subject, and semester
        let bangdiem = await db.BangDiems.findAll({
            where: { maLop: query.maLop, maMon: query.maMon, hocKy: query.hocKy },
            attributes: ['diemTB'],
        });

        // Check if any diemTB is null
        const hasNullDiemTB = bangdiem.some((bd) => bd.diemTB === null);
        if (hasNullDiemTB) {
            return {
                EM: "DiemTB is not exist",
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

        const passingScore = parseFloat(diemdau.giaTri);
        const classSize = Lop.siSo;

        // Count the number of students who passed
        const passedStudents = bangdiem.filter((bd) => bd.diemTB >= passingScore).length;

        // Calculate the pass rate
        const passRate = (passedStudents / classSize) * 100;

        // Check if a record already exists in BaoCaoTongKetMons
        let existingReport = await db.BaoCaoTongKetMons.findOne({
            where: {
                maLop: query.maLop,
                maMon: query.maMon,
                hocKy: query.hocKy,
            },
        });

        if (existingReport) {
            // Update the existing record
            await db.BaoCaoTongKetMons.update(
                {
                    siSo: classSize,
                    soLuongDat: passedStudents,
                    tiLe: passRate,
                },
                {
                    where: {
                        maLop: query.maLop,
                        maMon: query.maMon,
                        hocKy: query.hocKy,
                    },
                }
            );
        } else {
            // Create a new record
            await db.BaoCaoTongKetMons.create({
                maLop: query.maLop,
                maMon: query.maMon,
                hocKy: query.hocKy,
                siSo: classSize,
                soLuongDat: passedStudents,
                tiLe: passRate,
            });
        }

        return {
            EM: "Get bao cao mon success",
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
const deleteBaoCaoMon = async (id, data) => {
    try {
        let phancong = await db.GiangVien_Lop_Mons.findOne({
            where: { maGV: id, maLop: data.maLop, maMon: data.maMon },
        });
        if (!phancong) {
            return {
                EM: "Don't have permission",
                EC: "-1",
                DT: [],
            }
        }
        let bangdiem = await db.BaoCaoTongKetMons.destroy({
            where: { maLop: data.maLop, maMon: data.maMon, hocKy: data.hocKy }
        });
        return {
            EM: "Delete BaoCaoMon success",
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
const getLops = async (id) => {
    try {
        let lops = await db.Lops.findAll({
            where: { chuNhiem: id },
            attributes: ['maLop', 'tenLop'],
        });
        return {
            EM: "Get Lop success",
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
const getHocSinhLop = async (id, query) => {
    try {
        let lops = await db.Lops.findAll({
            where: { chuNhiem: id, maLop: query.maLop },
        });
        if (lops.length === 0) {
            return {
                EM: "Don't have permission",
                EC: "-1",
                DT: [],
            }
        }
        let hocsinh = await db.HocSinh_Lops.findAll({
            where: { maLop: query.maLop },
            attributes: ['maHS'],
            include: [
                {
                    model: db.Users,
                    as: 'Users',
                    attributes: ['hoTen']
                },
            ]
        });
        return {
            EM: "Get HocSinh success",
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

const getBaoCaoKy = async (id, query) => {
    try {

        let lops = await db.Lops.findAll({
            where: { chuNhiem: id, maLop: query.maLop },
        });
        if (lops.length === 0) {
            return {
                EM: "Don't have permission",
                EC: "-1",
                DT: [],
            }
        }

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
const gvService = {
    getPhanCong,
    getBangDiem,
    createBangDiem,
    updateBangDiem,
    deleteBangDiem,
    getBaoCaoMon,
    deleteBaoCaoMon,
    getLops,
    getHocSinhLop,
    getBaoCaoKy
};

export default gvService;