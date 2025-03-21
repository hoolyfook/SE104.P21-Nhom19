import express from "express";
import loginController from "../controller/loginController.js";
let router = express.Router();
let initApiRoutes = (app) => {

    // router.all("*", checkUserJWT, checkUserPermisson,);
    router.get("/roles", loginController.getRoles);

    return app.use("/api/v1", router);
}
export default initApiRoutes;