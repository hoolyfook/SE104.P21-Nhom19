import cors from "cors"
import 'dotenv/config';
//config CORS
const configCORS = (app) => {
    const corsOptions = {
        origin: [process.env.REACT_URL, "http://127.0.0.1:5173", "http://localhost:5173"],
        // origin: "localhost:5173,",
        credentials: true,
        optionSuccessStatus: 200
    }
    app.use(cors(corsOptions));

}
export default configCORS