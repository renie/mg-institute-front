import * as Auth from './auth'
import * as Redirects from './redirects'
import * as Validation from './validations'


const fetchDataAPI = async (url) => await fetch(`/api/${url}`)
    .then((response) => response.json())

export {
    Auth,
    Redirects,
    fetchDataAPI,
    Validation
}
