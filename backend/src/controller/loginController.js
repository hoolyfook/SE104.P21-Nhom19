import loginService from "../service/loginService.js"

const getRoles = async (req, res) => {
    try {
        let data = await loginService.getRoles();
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
const loginController={
    getRoles
}
export default loginController;