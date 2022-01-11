const { runQuery } = require('./../../config/database')
const { handleResponseStatus } = require('./../../app/middlewares/responseStatus')

const _run = async (req, res, query, param, callback) => {
    try {
        const queryDataFromDB = await runQuery(query, param)
        console.log('queryDataFromDB ===> ', queryDataFromDB)
        
        const dataToReturn = queryDataFromDB && queryDataFromDB[0];
        handleResponseStatus(req, res, { statusCode: 200, jsonDataToReturn: dataToReturn })
        if (callback) callback()
    } catch (err) {
        handleResponseStatus(req, res, { statusCode: 400 })
        if (callback) callback()
    }
}

const getById = async (req, res, next) => {
    const id = req.params.id
    const query = "Select * from todo_list where id = ?"
    await _run(req, res, query, { id })
}

const insertNewRow = async (req, res, next) => {
    const { id, item, minutes, todo_deleted = false } = req.body
    if (!(item && minutes)) res.status(500).json({})
    const query = `INSERT INTO todo_list (item, minutes, todo_deleted) VALUES ('${item}', ${minutes}, ${todo_deleted});`
    await _run(req, res, query, { id })
}

module.exports = { getById, insertNewRow }