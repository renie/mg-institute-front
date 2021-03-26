export const ErrorTypes = {
    NOT_AUTHORIZED_ERROR: 'NotAuthorizedError'
}

export const NotAuthorizedError = (uri, data) => {
    const error = Error(`The request to ${uri} has returned as UNAUTHORIZED by the server.`)
    error.name = ErrorTypes.NOT_AUTHORIZED_ERROR
    error.date = new Date()
    error.data = data

    if (Error.captureStackTrace) Error.captureStackTrace(error, NotAuthorizedError)

    return error
}

export const ThrowException = error => {
    throw error
}
