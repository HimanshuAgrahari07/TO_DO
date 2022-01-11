const express = require("express");
const router = express.Router();
const { getById, insertNewRow } = require("./../app/controllers/handleResponse")

let routes = app => {
    console.log('request recieved')
    router.get("/", (req, res) => {
        res.status(200).json({id: 8})
    });

    router.get('/:id', getById)

    router.post('/:id', insertNewRow)

    return app.use("/", router);
};

module.exports = routes;