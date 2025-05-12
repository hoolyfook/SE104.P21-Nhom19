import gvService from "../service/giangvienService.js";

const getPhanCong = async (req, res) => {
    try {
        let data = await gvService.getPhanCong(req.jwt.id);
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
const getBangDiem = async (req, res) => {
    try {
        let data = await gvService.getBangDiem(req.jwt.id, req.query);
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
const createBangDiem = async (req, res) => {
    try {
        let data = await gvService.createBangDiem(req.jwt.id, req.body);
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
const updateBangDiem = async (req, res) => {
    try {
        console.log(req.body)
        let data = await gvService.updateBangDiem(req.jwt.id, req.body);
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
const deleteBangDiem = async (req, res) => {
    try {
        let data = await gvService.deleteBangDiem(req.jwt.id, req.body);
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
const getBaoCaoMon = async (req, res) => {
    try {
        let data = await gvService.getBaoCaoMon(req.jwt.id, req.query);
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
const deleteBaoCaoMon = async (req, res) => {
    try {
        let data = await gvService.deleteBaoCaoMon(req.jwt.id, req.body);
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
        let data = await gvService.getLops(req.jwt.id);
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
        let data = await gvService.getHocSinhLop(req.jwt.id, req.query);
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
        let data = await gvService.getBaoCaoKy(req.jwt.id, req.query);
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
const gvController = {
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
}
export default gvController;