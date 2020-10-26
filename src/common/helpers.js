import { config } from '../../config'

export const fetchDataAPI = async (url) =>
    await fetch(`/api/${url}`, { headers: { 'x-access-token': config.JWTDEVTOKEN } }).then(response => response.json())
