const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        ssl: process.env.SSL === 'TRUE',
        dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false },
        },
    });

module.exports = {
    sequelize
}