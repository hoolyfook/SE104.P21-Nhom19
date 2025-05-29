import hsService from "../service/hocsinhService.js";
const getBangDiem = async (req, res) => {
    try {
        const data = await hsService.getBangDiem(req.jwt.id, req.query);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: [],
        });
    }
};
const hsController = {
    getBangDiem,
}
export default hsController;