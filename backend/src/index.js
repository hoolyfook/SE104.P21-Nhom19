import express from "express";
import bodyParser from "body-parser";
import initApiRoutes from "./route/api.js"
import cookieParser from "cookie-parser"
import configCORS from "./config/cors.js"
import configViewEngine from "./config/view.js"
import 'dotenv/config';
let app = express();
// config CORS for server
configCORS(app)
// config parser for server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
//config view engine for server
configViewEngine(app);
// config cookie parser for server
app.use(cookieParser())
// config routes for server
initApiRoutes(app);


// run server in port 8080
let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Running on port " + port)
})