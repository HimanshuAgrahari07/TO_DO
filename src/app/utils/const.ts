enum status {
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL'
}

export const GenericError = {
    BadRequest: {
        error: {
            status: 400,
            message: 'Request has wrong format',
            statusText: status.FAIL,
            errorCode: 'BAD_REQUEST',
        }
    },
    ServerError: {
        error: {
            status: 500,
            message: 'Something went wrong',
            statusText: status.FAIL,
            errorCode: 'SERVER_ERROR',
        }
    },
    NotFoundError: {
        error: {
            status: 404,
            message: 'Requested resource not found',
            statusText: status.SUCCESS,
            errorCode: 'NOT_FOUND',
        }
    }
}

export const SucessResponse = {
    Sucess: {
        error: {
            status: 200,
            message: 'Request completed successfully',
            statusText: status.SUCCESS,
            errorCode: 'SUCCESS',
        }
    }
}