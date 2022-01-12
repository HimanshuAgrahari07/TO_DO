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

const runQuery = async (query, next) => {
    logger.log({
        level: 'info',
        query: query,
    });

    if (!query) {
        logger.log({
            level: 'error',
            message: 'query is missing'
        });
    }

    let connection;
    let res;
    try {
        connection = await pool.getConnection();
        res = await connection.query(query);
        return res
    } catch (err) {
        throw err;
    }
    finally {
        console.log('Closing connection')
        if (connection) connection.end();
    }
}

module.exports = {
    runQuery,
}