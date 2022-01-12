const { runQuery } = require('./../../config/database')
const { handleResponseStatus } = require('./../../app/middlewares/responseStatus')
require('dotenv').config()

const table = process.env.DB_TODO_TABLE

const _run = async (req, res, query) => {
    try {
        console.log('query ===> ', query)
        const queryDataFromDB = await runQuery(query)
        console.log('rows count ===> ', queryDataFromDB.length)

        const hasRecords = queryDataFromDB && queryDataFromDB.length !== 0
        if (!hasRecords) return handleResponseStatus(req, res, { statusCode: 200, message: 'No records found' })

        handleResponseStatus(req, res, { statusCode: 200, jsonDataToReturn: queryDataFromDB })
    } catch (err) {
        console.log(err)
        handleResponseStatus(req, res, { statusCode: 400 })
    }
}

const getAllRows = async (req, res, next) => {
    try {
        const query = `Select * from ${table}`;
        await _run(req, res, query)
    } catch (error) {
        handleResponseStatus(req, res, { message: error.message, statusCode: 400 })
        next(error)
    }
}

const getRowById = async (req, res, next) => {
    try {
        const id = req.params.id
        const query = `Select * from ${table} where id = ${id}`
        await _run(req, res, query)
    } catch (error) {
        handleResponseStatus(req, res, { message: error.message, statusCode: 400 })
        next(error)
    }
}

const insertRow = async (req, res, next) => {
    try {
        const { name } = req.body
        if (!name) handleResponseStatus(req, res, { statusCode: 400 })
        const query = `INSERT INTO ${table} (name) VALUES ('${name}');`
        await _run(req, res, query)
    } catch (error) {
        handleResponseStatus(req, res, { message: error.message, statusCode: 400 })
        next(error)
    }
}

const updateRow = async (req, res, next) => {
    try {
        const id = req.params.id
        const body = req.body;
        const tableColumns = ['name', 'status', 'isDeleted']

        const regex = tableColumns.join('|')
        const requiredData = Object.entries(body).filter(e => e[0].match(regex))
        const queryString = requiredData.map(e => `${e[0]}='${e[1]}'`).join(', ')
        const query = `update ${table}
        set ${queryString}
        where id = ${id};`

        await _run(req, res, query)
    } catch (error) {
        handleResponseStatus(req, res, { message: error.message, statusCode: 400 })
        next(error)
    }
}

const deleteRow = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!id) handleResponseStatus(req, res, { message: "Id is required", statusCode: 400 })

        const query = `update ${table}
        set isDeleted = '1'
        where id = ${id};`

        await _run(req, res, query)
    } catch (error) {
        handleResponseStatus(req, res, { message: error.message, statusCode: 400 })
        next(error)
    }
}

module.exports = { getAllRows, getRowById, insertRow, updateRow, deleteRow }