import { domFind } from '../../common/dom'
import { sendPostData } from '../../common/component'
import { isAdmin, redirectHome } from '../../common/helpers'
import { render as renderAddVideo } from "../components/addVideo"

const getItemInfo = (item) => {
    const [titleField, urlField] = [...domFind('input', item, true)]

    return {
        title: titleField.value,
        url: urlField.value
    }
}

const getVideosInfo = () => [...domFind('#addVideo li', document, true)].map(getItemInfo)

const getFormData = () => ({
    title: domFind('#title').value,
    videos: getVideosInfo()
})

const save = () => sendPostData('course', JSON.stringify(getFormData()))

const disableFormDefaultSubmit = () => domFind('#createForm').addEventListener('submit', (e) => e.preventDefault())

const addButtonListeners = () => {
    domFind('#addVideoBtn').addEventListener('click', () => renderAddVideo())
    domFind('#saveCourse').addEventListener('click', () => save())
}

const renderPage = () => {
    disableFormDefaultSubmit()
    addButtonListeners()
}

(async () => {
    if (!(await isAdmin())) return redirectHome()
    renderPage()
})()
