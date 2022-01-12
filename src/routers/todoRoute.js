const express = require("express");
const router = express.Router();
const { getAllRows, getRowById, insertRow, updateRow, deleteRow } = require("./../app/controllers/handleResponse")

let routes = app => {
    router.get("/", getAllRows);

    router.get('/:id(\\d+)', getRowById)

    router.post('/', insertRow)

    router.put('/:id(\\d+)', updateRow)

    router.delete('/:id(\\d+)', deleteRow)

    return app.use("/todo", router);
};

module.exports = routes;