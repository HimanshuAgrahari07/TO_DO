const express = require('express')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser');
const initRoutes = require("./routers/todoRoute");
const notifier = require('node-notifier');
const app = express();

require('dotenv').config()

const port = process.env.PORT || 3000;

/** Middleware */
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorhandler({ log: errorNotification }))
}

function errorNotification(err, str, req) {
    const title = 'Error in ' + req.method + ' ' + req.url

    notifier.notify({
        title: title,
        message: str
    })
}

/** Router */
initRoutes(app);

/**Listen to port */
app.listen(port, () => console.log(`App listening on ${port}!`))