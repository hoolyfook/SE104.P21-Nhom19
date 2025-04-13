import db from "../models/index.js";
import 'dotenv/config';
import { createJWT } from "../middleware/jwtactions.js";

const getGroupRoles = async (email, password) => {  // get roles to create JWT
    try {
        let user = await db.Users.findOne({
            where: {
                email: email,
                mk: password
            },
            attributes: ['groupUserId', 'id']
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
                }
            });
            let payload = {
                id: user.id,
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
const changePassword = async (email, password, newpassword) => {
    try {
        let user = await db.Users.findOne({
            where: {
                email: email,
                mk: password
            }
        });
        if (user) {
            user = user.get({ plain: true });
            await db.Users.update({
                mk: newpassword
            }, {
                where: { email: email }
            });
            return {
                EM: "Change password success",
                EC: "0",
                DT: []
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
            EM: "Change password error",
            EC: "-1",
            DT: []
        };
    }
};
const getUserInfo = async (email) => {
    try {
        let user = await db.Users.findOne({
            where: {
                email: email
            },
            attributes: ['id', 'hoTen', 'gioiTinh', 'ngaySinh', 'email', 'diaChi'],
        });

        if (user) {
            user = user.get({ plain: true });
            let lop = await db.HocSinh_Lops.findAll({
                where: {
                    maHS: user.id
                },
                attributes: ['maLop'],
                include: {
                    model: db.Lops,
                    as: 'Lops',
                    attributes: ['tenLop', 'khoiLop']
                }
            });
            lop = lop.map(item => item.get({ plain: true }));
            return {
                EM: "Get user info success",
                EC: "0",
                DT: { user, lop }
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
            EM: "Get user info error",
            EC: "-1",
            DT: []
        };
    }
}
const userService = {
    getGroupRoles,
    changePassword,
    getUserInfo
};

export default userService;