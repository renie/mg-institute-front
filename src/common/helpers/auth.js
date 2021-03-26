import { StatusCodes } from 'http-status-codes'

import { NotAuthorizedError, ThrowException, ErrorTypes } from '../customErrors'
import { Redirects } from './'


export const isAdmin = async () => StatusCodes.OK === (await fetch('/api/amIAdmin').then((response) => response.status))

export const checkHTTPResponse = async response => (
    StatusCodes.UNAUTHORIZED !== response.status
        ? response
        : ThrowException(NotAuthorizedError(response.url, await response.json()))
)

export const doLogin = async ({email, password, wipeOldSessions = false}) => (
    await checkHTTPResponse(await fetch(
        '/api/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, wipeOldSessions})
        }
    ))
)


export const verifyToken = async () => (
    await checkHTTPResponse(await fetch(
        '/api/verifyToken',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ))
)

export const doLogout = async () => (
    await checkHTTPResponse(await fetch(
        '/api/logout',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ))
)

export const checkLogin = async (autoRedirect = true) => {
    const redirect = () => (autoRedirect && Redirects.toLogin())

    try {
        await verifyToken()
        return true
    } catch (e) {
        if (ErrorTypes.NOT_AUTHORIZED_ERROR === e.name) redirect()
        return false
    }
}
