const express = require('express')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser');
const initRoutes = require("./routers/todoRoute");
const { logger } = require('./app/middlewares/logger')
const app = express();

require('dotenv').config()

const port = process.env.PORT || 3000;

/** Middleware */
app.use(bodyParser.urlencoded({ extended: true }));

/**Logger */
app.use(function (req, res, next) {
    if (process.env.NODE_ENV === 'development') {
        const { rawHeaders, httpVersion, method, socket, url } = req;
        const { remoteAddress, remoteFamily } = socket;

        logger.log({
            level: 'info',
            // rawHeaders,
            httpVersion,
            method,
            // remoteAddress,
            // remoteFamily,
            url
        });

        next()
    }
})

/** Router */
initRoutes(app);

/**Listen to port */
app.listen(port, () => console.log(`App listening on ${port}!`))