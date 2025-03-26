import db from "../models/index.js";
import 'dotenv/config';
import { createJWT } from "../middleware/jwtactions.js";

const getGroupRoles = async (email,password) => {  // get roles to create JWT
    try {        
        let user = await db.Users.findOne({
            where: {
                email: email,
                mk: password
            },
            attributes: ['groupUserId']
        });
        if (user) {
            user = user.get({ plain: true });
            let roles = await db.GroupRoles.findAll({
                where: { GroupID: user.groupUserId },
                attributes: [],
                include: {
                    model: db.Roles,
                    as: 'Roles',
                    attributes: ['url']
                }});
            let payload = {
                email: email,
                data: roles,
                expiresIn: process.env.JWT_EX
            };
            let token = createJWT(payload);
            return {
                EM: "Get JWT success",
                EC: "0",
                DT: {
                    access_token: token,
                    data: roles
                }
            };
        } else {
            return {
                EM: "User does not exist",
                EC: "0",
                DT: []
            };
        }
    } catch (e) {
        console.log(e);
        return {
            EM: "Get JWT error",
            EC: "-1",
            DT: []
        };
    }
};

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
    getRoles,
    getGroupRoles
};

export default loginService;