import { render as renderCourseList } from './components/courseList'
import { fetchDataAPI, Auth, Redirects } from '../common/helpers/'


const logoutBtn = document.querySelector('#logout')

const getData = async () => await fetchDataAPI('course')

const logOut = async (evt) => {
    evt.preventDefault()

    try {
        await Auth.doLogout()
    } finally {
        Redirects.toHome()
    }
}

const setListeners = () => {
    logoutBtn.addEventListener('click', logOut)
}

const renderPage = async () => {
    await Auth.checkLogin()

    setListeners()
    await renderCourseList('#courseList', await getData())
}

renderPage()
