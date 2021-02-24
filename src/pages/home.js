import { render as renderHeader } from './components/header'
import { render as renderCourseList } from './components/courseList'
import { fetchDataAPI } from '../common/helpers'

const getData = async () => await fetchDataAPI('course')

const login = async () => await fetch('/api/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"email": "test@test.com", "password": "123456"})
})

const renderPage = async () => {
    await renderHeader()
    await login()
    await renderCourseList('#courseList', await getData())
}

renderPage()
