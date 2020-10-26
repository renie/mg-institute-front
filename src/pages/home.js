import { render as renderHeader } from './components/header'
import { render as renderCourseList } from './components/courseList'
import { fetchDataAPI } from '../common/helpers'

const getData = async() => await fetchDataAPI('course')

const renderPage = async () => {
    await renderHeader()
    await renderCourseList('#courseList', await getData())
}

renderPage()
