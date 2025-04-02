import express from "express";
import userController from "../controller/userController.js";
import adminController from "../controller/adminController.js";
import { checkUserJWT, checkUserPermisson } from "../middleware/jwtactions.js";
let router = express.Router();
let initApiRoutes = (app) => {

    router.all("*", checkUserJWT, checkUserPermisson,);

    //User
    router.post("/users/login", userController.getJWT);
    router.get("/users/logout", userController.logoutUser);
    router.get("/users/info", userController.getUserInfo);
    router.put("/users/password", userController.changePassword); // body: { email, password, newpassword}

    // Admin

    router.get("/admin/users", adminController.getUsers);
    router.post("/admin/users", adminController.createUser); // body: { hoTen, gioiTinh, ngaySinh, diaChi, email,  GroupUsers(chuỗi admin, student, teacher)}
    router.put("/admin/users", adminController.updateUser); // body: { id, hoTen, gioiTinh, ngaySinh, diaChi, email,  GroupUsers(chuỗi admin, student, teacher)}
    router.delete("/admin/users", adminController.deleteUser); // body: { id }
    router.get("/admin/quydinhs", adminController.getQuyDinhs);
    router.post("/admin/quydinhs", adminController.createQuyDinh); // body: { moTa, giaTri}
    router.put("/admin/quydinhs", adminController.updateQuyDinh); // body: { id, moTa, giaTri}
    router.delete("/admin/quydinhs", adminController.deleteQuyDinh); // body: { id }
    router.get("/admin/lops", adminController.getLops);
    router.post("/admin/lops", adminController.createLop); // body: { tenLop, maLop, khoiLop}
    router.put("/admin/lops", adminController.updateLop); // body: { siSo, tenLop, maLop, khoiLop}
    router.delete("/admin/lops", adminController.deleteLop); // body: { maLop }
    router.get("/admin/monhocs", adminController.getMonHocs);
    router.post("/admin/monhocs", adminController.createMonHoc); // body: { tenMon, maMon}
    router.put("/admin/monhocs", adminController.updateMonHoc); // body: { tenMon, maMon}
    router.delete("/admin/monhocs", adminController.deleteMonHoc); // body: { maMon }

    return app.use("/api/v1", router);
}
export default initApiRoutes;