import adminService from '../service/adminService.js';

const getUsers = async (req, res) => {

    try {
        let data = await adminService.getUsers();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const createUser = async (req, res) => {
    try {
        let data = await adminService.createUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const updateUser = async (req, res) => {
    try {
        let data = await adminService.updateUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        let data = await adminService.deleteUser(req.jwt.id, req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const getQuyDinhs = async (req, res) => {
    try {
        let data = await adminService.getQuyDinh();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const createQuyDinh = async (req, res) => {
    try {
        let data = await adminService.createQuyDinh(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const updateQuyDinh = async (req, res) => {
    try {
        let data = await adminService.updateQuyDinh(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const deleteQuyDinh = async (req, res) => {
    try {
        let data = await adminService.deleteQuyDinh(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const getLops = async (req, res) => {
    try {
        let data = await adminService.getLops();
        return res.status(200).json({
            EM: data.EM,

            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {

        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const createLop = async (req, res) => {
    try {
        let data = await adminService.createLop(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const updateLop = async (req, res) => {
    try {
        let data = await adminService.updateLop(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const deleteLop = async (req, res) => {
    try {
        let data = await adminService.deleteLop(req.body.maLop);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}

const getMonHocs = async (req, res) => {
    try {
        let data = await adminService.getMonHocs();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const createMonHoc = async (req, res) => {
    try {
        let data = await adminService.createMonHoc(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const updateMonHoc = async (req, res) => {
    try {
        let data = await adminService.updateMonHoc(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const deleteMonHoc = async (req, res) => {
    try {
        let data = await adminService.deleteMonHoc(req.body.maMon);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const getPhanCong = async (req, res) => {
    try {
        let data = await adminService.getPhanCong(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const createPhanCong = async (req, res) => {
    try {
        let data = await adminService.createPhanCong(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const updatePhanCong = async (req, res) => {
    try {
        let data = await adminService.updatePhanCong(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const deletePhanCong = async (req, res) => {
    try {
        let data = await adminService.deletePhanCong(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const getHocSinhLop = async (req, res) => {
    try {
        let data = await adminService.getHocSinhLop(req.query);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const createHocSinhLop = async (req, res) => {
    try {
        let data = await adminService.createHocSinhLop(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const updateHocSinhLop = async (req, res) => {
    try {
        let data = await adminService.updateHocSinhLop(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const deleteHocSinhLop = async (req, res) => {
    try {
        let data = await adminService.deleteHocSinhLop(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const getBaoCaoKy = async (req, res) => {
    try {
        let data = await adminService.getBaoCaoKy(req.query);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const deleteBaoCaoKy = async (req, res) => {
    try {
        let data = await adminService.deleteBaoCaoKy(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const getBaoCaoLops = async (req, res) => {
    try {
        let data = await adminService.getBaoCaoLops(req.query);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const getBaoCaoMons = async (req, res) => {
    try {
        let data = await adminService.getBaoCaoMons(req.query);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const adminController = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getQuyDinhs,
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

}
export default adminController;