const { runQuery } = require('./../../config/database')
const { handleResponseStatus } = require('./../../app/middlewares/responseStatus')
require('dotenv').config()

const table = process.env.DB_TODO_TABLE

const _run = async (req, res, query) => {
    try {
        console.log('query ===> ', query)
        const queryDataFromDB = await runQuery(query)
        console.log('queryDataFromDB ===> ', queryDataFromDB)
        handleResponseStatus(req, res, { statusCode: 200, jsonDataToReturn: queryDataFromDB })
    } catch (err) {
        console.log(err)
        handleResponseStatus(req, res, { statusCode: 400 })
    }
}

const getAllRows = async (req, res, next) => {
    const query = `Select * from ${table}`;

    await _run(req, res, query)
}

const getRowById = async (req, res, next) => {
    const id = req.params.id
    if (!id) throw new Error('No id passed')

    const query = `Select * from ${table} where id = ${id}`
    await _run(req, res, query)
}

const insertRow = async (req, res, next) => {
    const { name } = req.body
    if (!name) handleResponseStatus(req, res, { statusCode: 400 })

    const query = `INSERT INTO ${table} (name) VALUES ('${name}');`

    await _run(req, res, query)
}

const updateRow = async (req, res, next) => {
    const { id, name, status, isDeleted } = req.body
    if (!id) handleResponseStatus(req, res, { message: 'id, name, status or isDeleted missing', statusCode: 400 })

    const query = `update ${table}
    set name = '${name}',
    status = '${status}',
    isDeleted = '${isDeleted}'
    where id = ${id};`

    await _run(req, res, query)
}

const deleteRow = async (req, res, next) => {
    const { id } = req.body
    if (!id) handleResponseStatus(req, res, { message: "Id is required", statusCode: 400 })

    const query = `update ${table}
    set isDeleted = '1'
    where id = ${id};`

    await _run(req, res, query)
}

module.exports = { getAllRows, getRowById, insertRow, updateRow, deleteRow }