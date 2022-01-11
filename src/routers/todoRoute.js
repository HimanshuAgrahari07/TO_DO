const express = require("express");
const router = express.Router();
const { getById, insertNewRow } = require("./../app/controllers/handleResponse")

let routes = app => {
    console.log('request recieved')
    router.get("/", (req, res) => {
        res.status(200).json({id: 8})
    });

    router.get('/:id(\\d)', getById)

    router.post('/', insertNewRow)

    return app.use("/todo", router);
};

module.exports = routes;