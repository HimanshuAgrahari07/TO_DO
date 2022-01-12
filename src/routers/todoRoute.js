const express = require("express");
const router = express.Router();
const { getAllRows, getRowById, insertRow, updateRow, deleteRow } = require("./../app/controllers/handleResponse")

let routes = app => {
    console.log('request recieved')
    router.get("/", getAllRows);

    router.get('/:id(\\d+)', getRowById)

    router.post('/', insertRow)

    router.put('/', updateRow)

    router.delete('/', deleteRow)

    return app.use("/todo", router);
};

module.exports = routes;