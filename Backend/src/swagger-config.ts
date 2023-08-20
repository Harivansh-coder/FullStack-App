// swagger configuration file

import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./src/router/*.ts", "./src/model/*.ts", "./src/controller/*.ts"],
};

const specs = swaggerJsdoc(options);

export default specs;
