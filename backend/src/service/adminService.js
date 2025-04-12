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
        }
        else {
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
            let user = await db.Users.update({
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
const deleteUser = async (id) => {
    try {
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
            attributes: ['maLop', 'tenLop', 'siSo'],
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
            khoiLop: data.khoiLop
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
            khoiLop: data.khoiLop
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
        let monhoc = await db.MonHocs.findOne({
            where: { maMon: data.maMon }
        });
        if (monhoc !== null) {
            return {
                EM: "MonHoc already exists",
                EC: "-1",
                DT: [],
            }
        }
        await db.MonHocs.create({
            maMon: data.maMon,
            tenMon: data.tenMon
        });
        return {
            EM: "Create MonHoc success",
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
                    attributes: ['hoTen']
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
    deleteHocSinhLop

};

export default adminService;