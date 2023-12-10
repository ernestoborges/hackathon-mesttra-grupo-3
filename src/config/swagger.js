const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: 'swagger',
        description: 'Hackathon mesttra - Express Swagger',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

// criar a pasta "swagger" manualmente na raiz do projeto
const outputFile = "swagger_output.json";
const endpointsFiles = ["src/api.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);