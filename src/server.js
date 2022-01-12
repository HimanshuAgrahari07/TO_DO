const express = require('express')
const bodyParser = require('body-parser');
const initRoutes = require("./routers/todoRoute");
const { logger } = require('./app/middlewares/logger')
const app = express();

require('dotenv').config()

const port = process.env.PORT || 3000;

process.on('uncaughtException', (error) => {
    console.log('Alert! ERROR : ', error);
    process.exit(1); // Exit your app 
})

process.on('unhandledRejection', (error, promise) => {
    console.log('Alert! ERROR : ', error);
    process.exit(1); // Exit your app 
})

/** Middleware */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

/**Logger */
app.use(function (req, res, next) {
    if (process.env.NODE_ENV === 'development') {
        const { rawHeaders, httpVersion, method, socket, url } = req;
        const { remoteAddress, remoteFamily } = socket;

        logger.log({
            level: 'info',
            rawHeaders,
            httpVersion,
            method,
            remoteAddress,
            remoteFamily,
            url,
            body: req.body
        });

        next()
    }
})

/** Router */
initRoutes(app);

/**Listen to port */
app.listen(port, () => console.log(`App listening on ${port}!`))