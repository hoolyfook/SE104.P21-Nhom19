import db from "../models/index.js"
import 'dotenv/config';
const getRoles = async () => {
    try {
        const roles = await db.Roles.findAll();
        return {
            EM: "Get JWT success",
            EC: "0",
            DT: roles
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "Get JWT error",
            EC: "-1",
            DT: []
        };
    }
};

const loginService = {
    getRoles
};

export default loginService;