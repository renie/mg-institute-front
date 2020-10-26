import { render as renderHeader } from './components/header'
import { render as renderCourseList } from './components/courseList'

const renderPage = async () => {
    await renderHeader()
    await renderCourseList('#courseList', [{name: 'Joe'},{name: 'Peter'},{name: 'Anna'}])
}

renderPage()
