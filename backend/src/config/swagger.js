import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "API documentation for the backend system",
        },
        servers: [
            {
                url: "http://localhost:8080/api/v1", // URL của API
            },
        ],
    },
    apis: ["./src/route/*.js"], // Đường dẫn tới các file chứa định nghĩa API
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;