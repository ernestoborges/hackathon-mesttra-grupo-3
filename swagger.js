const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger/swagger_output.json';
const endpointsFiles = ['./src/api.js'];
swaggerAutogen(outputFile, endpointsFiles);