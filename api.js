const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_TABLE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: true
});

const showVacinasCount = async() => {
    const result = await pool.query('SELECT count(*) from VACINA');
    console.log(result.rows);
}
console.log(pool.options.user);
console.log(pool.options.database);
showVacinasCount();
