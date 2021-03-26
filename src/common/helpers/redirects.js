export const BASE_URL = window.location.origin

export const to = url => (window.location.href = url)

export const toHome = () => to(BASE_URL)

export const toLoggedHome = () => to(`${BASE_URL}/home`)

export const toLogin = () => to(`${BASE_URL}/login`)
