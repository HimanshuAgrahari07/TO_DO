const handleResponseStatus = (req, res, { statusCode, message, jsonDataToReturn }, next) => {
    res.status(statusCode);

    if (statusCode === 400) {
        const responseObj = {
            status: 400,
            message: message || 'Request has wrong format.',
            statusText: 'FAIL',
            errorcode: 'BAD_REQUEST',
        }

        res.json(jsonDataToReturn || responseObj).send(responseObj)
    }

    if (statusCode === 200) {
        const responseObj = {
            status: 200,
            message: message || 'Request has wrong format.',
            statusText: 'SUCCESS',
            errorcode: 'BAD_REQUEST',
        }

        res.json(jsonDataToReturn || responseObj).send(responseObj)
    }

    if (next) next()
}

module.exports = { handleResponseStatus }