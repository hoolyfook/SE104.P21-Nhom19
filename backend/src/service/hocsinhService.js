import db from "../models/index.js";
const getBangDiem = async (id, query) => {
    try {
        // If maLop is provided, verify that the student belongs to that class
        let hocSinhLop = await db.HocSinh_Lops.findOne({
            where: { maHS: id, maLop: query.maLop }
        });
        if (!hocSinhLop) {
            return {
                EM: "Hoc sinh does not belong to the specified class",
                EC: "-1",
                DT: [],
            };
        }


        let bangdiem = await db.BangDiems.findAll({
            where: {
                maHS: id,
                maLop: query.maLop,
                hocKy: query.hocKy,
            },
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
        if (bangdiem && bangdiem.length > 0) {
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
        console.log(e);
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        };
    }
}
const getLops = async (id) => {
    try {
        let lops = await db.HocSinh_Lops.findAll({
            where: { maHS: id },
            include: [
                {
                    model: db.Lops,
                    as: "Lops",
                    attributes: ["maLop", "tenLop"],
                },
            ],
        });
        if (lops && lops.length > 0) {
            return {
                EM: "Get lop success",
                EC: "0",
                DT: lops,
            };
        } else {
            return {
                EM: "Get lop failed",
                EC: "-1",
                DT: [],
            };
        }
    } catch (e) {
        console.log(e);
        return {
            EM: "Error from server",
            EC: "-1",
            DT: [],
        };
    }
}
const hsService = {
    getBangDiem,
    getLops,
}
export default hsService;