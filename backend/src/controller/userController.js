import userService from "../service/userService.js"
const getJWT = async (req, res) => {
    try {
        if (!req.cookies.qlhs) {  // cookie did not exist
            let data = await userService.getGroupRoles(req.body.email, req.body.password);
            if (data && data.DT && data.DT.access_token) {  // set cookie
                res.cookie("qlhs", data.DT.access_token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            }
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } else {
            return res.status(400).json({
                EM: "User have been logined",
                EC: "-1",
                DT: ""
            })
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const logoutUser = async (req, res) => {  // logout user controller
    try {
        res.clearCookie("qlhs")
        return res.status(200).json({
            EM: "User logout",
            EC: "0",
            DT: ""
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const changePassword = async (req, res) => {  // change password controller
    try {
        let data = await userService.changePassword(req.jwt.email, req.body.password, req.body.newpassword);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const getUserInfo = async (req, res) => {  // get user info controller
    try {
        let data = await userService.getUserInfo(req.jwt.email);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "Error from server",
            EC: "-1",
            DT: ""
        })
    }
}
const userController={
    getJWT,
    logoutUser,
    changePassword,
    getUserInfo
}
export default userController;