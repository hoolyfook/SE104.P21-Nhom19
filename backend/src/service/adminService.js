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
            if (data.GroupUsers === "student") {
                let siSomax = await db.QuyDinhs.findOne({
                    where: { moTa: "Sĩ số tối đa của lớp" },
                    attributes: ['giaTri']
                });
                siSomax = siSomax.get({ plain: true });
                let count = await db.HocSinh_Lops.count({
                    where: { maLop: data.maLop }
                });
                if (siSomax.giaTri > count) {
                    let classId = await db.Lops.findOne({
                        where: { maLop: data.maLop },
                    });
                    if (classId === null) {
                        return {
                            EM: "Class not found",
                            EC: "-1",
                            DT: [],
                        }
                    }
                    await db.HocSinh_Lops.create({
                        maHS: user.id,
                        maLop: data.maLop
                    });
                    await db.Lops.update({
                        siSo: count + 1
                    }, {
                        where: { maLop: data.maLop }
                    });
                }
                else {
                    return {
                        EM: "Class full",
                        EC: "-1",
                        DT: [],
                    }
                }
            }
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
};

export default adminService;