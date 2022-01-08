const express = require("express");
const router = express.Router();
const path = require('path');

let routes = app => {
    router.get("/", (req, res) => {
        res.status(200).json({id: 2})
    });

    return app.use("/", router);
};

module.exports = routes;