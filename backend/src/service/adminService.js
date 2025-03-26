import db from "../models/index.js";

const getUsers = async () => {
    try {
        let users = await db.Users.findAll();
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
        let { hoten, password, email, role } = req.body;
        let user = await db.Users.create({
            username,
            password,
            email,
            role
        });
        return {
            EM: "Create User success",
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
const updateUser = async (data) => {
    try {
        let { id, hoten, password, email, role } = req.body;
        let user = await db.Users.update({
            username,
            password,
            email,
            role
        }, {
            where: { id }
        });
        return {
            EM: "Update User success",
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
const deleteUser = async (data) => {
    try {
        let { id } = req.body;
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
        let quydinh = await db.QuyDinhs.findAll();
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
        let { name, value } = req.body;
        let quydinh = await db.QuyDinhs.create({
            name,
            value
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
        let { id, name, value } = req.body;
        let quydinh = await db.QuyDinhs.update({
            name,
            value
        }, {
            where: { id }
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
const deleteQuyDinh = async (data) => {
    try {
        let { id } = req.body;
        let quydinh = await db.QuyDinhs.destroy({
            where: { id }
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
const adminService = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getQuyDinh,
    createQuyDinh,
    updateQuyDinh,
    deleteQuyDinh
};

export default adminService;