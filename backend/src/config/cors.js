import cors from "cors"
import 'dotenv/config';
//config CORS
const configCORS = (app) => {
    const corsOptions = {
        origin: process.env.REACT_URL,
        credentials: true,            //access-control-allow-credentials:true
        optionSuccessStatus: 200
    }
    app.use(cors(corsOptions));

}
export default configCORS