const mariadb = require('mariadb');
const { logger } = require('./../app/middlewares/logger')
require('dotenv').config()

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: process.env.DB_MAX_CONNECTION_LIMIT,
    database: process.env.DB_NAME,
    port: 3307
});

const runQuery = async (query, { id } = {}, next) => {
    if (!(query && id)) {
        logger.log({
            level: 'error',
            query: query,
            id: id,
            message: 'query or id is missing'
        });
    }

    let connection;
    let res;
    try {
        connection = await pool.getConnection();
        res = await connection.query(query, id);
        console.log(`res ====> `, res);
        return res
    } catch (err) {
        throw err;
    }
    finally {
        if (connection) connection.end();
    }
}

module.exports = {
    runQuery,
}