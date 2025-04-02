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
    router.put("/users/password", userController.changePassword);

    // Admin

    router.get("/admin/users", adminController.getUsers);
    router.post("/admin/users", adminController.createUser);
    router.put("/admin/users", adminController.updateUser);
    router.delete("/admin/users", adminController.deleteUser);
    router.get("/admin/quydinhs", adminController.getQuyDinhs);
    router.post("/admin/quydinhs", adminController.createQuyDinh);
    router.put("/admin/quydinhs", adminController.updateQuyDinh);
    router.delete("/admin/quydinhs", adminController.deleteQuyDinh);
    router.get("/admin/lops", adminController.getLops);
    router.post("/admin/lops", adminController.createLop);
    router.put("/admin/lops", adminController.updateLop);
    router.delete("/admin/lops", adminController.deleteLop);
    router.get("/admin/monhocs", adminController.getMonHocs);
    router.post("/admin/monhocs", adminController.createMonHoc);
    router.put("/admin/monhocs", adminController.updateMonHoc);
    router.delete("/admin/monhocs", adminController.deleteMonHoc);

    return app.use("/api/v1", router);
}
export default initApiRoutes;