import db from "../models/index.js";
const getBangDiem = async (id) => {
    try {
        let bangdiem = await db.BangDiems.findAll({
            where: { maHS: id },
            include: [
                {
                    model: db.MonHocs,
                    as: "MonHocs",
                    attributes: ["tenMon"],
                },
            ],
            attributes: [
                "maMon",
                "hocKy",
                "diem15p",
                "diem1Tiet",
                "diemTB",
            ],
        });
        if (bangdiem) {
            return {
                EM: "Get bang diem success",
                EC: "0",
                DT: bangdiem,
            };
        } else {
            return {
                EM: "Get bang diem failed",
                EC: "-1",
                DT: [],
            };
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

const hsService = {
    getBangDiem
}
export default hsService;