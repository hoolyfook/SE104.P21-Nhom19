import adminService from '../service/adminService.js';

const getUsers = async (req, res) => {

    try {
        if (!req.cookies.jwt || !req.cookies.login) {  // cookie did not exist
            let data = await loginService.getGroupRoles(req.body.email, req.body.password);
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
const createUser = async (req, res) => {
    let result = await adminService.createUser(req.body);
    res.json(result);
}
const adminController={
    getJWT,
    logoutUser
}
export default adminController;