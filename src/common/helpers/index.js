import * as Auth from './auth'
import * as Redirects from './redirects'


const fetchDataAPI = async (url) => await fetch(`/api/${url}`)
    .then((response) => response.json())

export {
    Auth,
    Redirects,
    fetchDataAPI
}
