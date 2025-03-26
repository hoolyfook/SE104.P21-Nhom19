import express from "express";
import loginController from "../controller/loginController.js";
import { checkUserJWT, checkUserPermisson } from "../middleware/jwtactions.js";
let router = express.Router();
let initApiRoutes = (app) => {

    router.all("*", checkUserJWT, checkUserPermisson,);
    router.get("/login", loginController.renderLoginPage);
    router.post("/login", loginController.getJWT);
    router.get("/logout", loginController.logout);
    router.get("/roles", loginController.getRoles);

    return app.use("/api/v1", router);
}
export default initApiRoutes;