import { domFind } from '../../common/dom'
import { sendPostData, getData } from '../../common/component'
import { Auth, Redirects } from '../../common/helpers/'
import { render as renderAddVideo } from '../components/addVideo'

import * as form from '../components/forms/index.scss'

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

const getVideoIdFromLink = link => {
    const regexIdFromLink = /(?<id>[0-9]+)$/g
    const match = regexIdFromLink.exec(link)

    if (!match) return false
    return match.groups.id
}

const loadThumb = async (id, imgTag, target) => {
    try {
        const src = await getData(`video/vimeothumbof/${id}`)

        if (!src) {
            target.value = ''
            target.placeholder = `ID ${id} não foi encontrado no Vimeo!!!`
            target.classList.add(form.error)

            return false
        }

        imgTag.src = src
    } catch (e) {
        alert('Esse video nao existe no Vimeo')
    }
}

const triggerLoadThumb = ({ target }) => {
    if (target.nodeName !== 'INPUT') return false
    if (!target.classList.contains('videoUrl')) return false
    if (!target.value.trim()) return false

    target.placeholder = 'Link ou id do Vídeo no VIMEO'
    target.classList.remove(form.error)

    const id = getVideoIdFromLink(target.value)
    if (!id) {
        target.value = ''
        target.placeholder = 'Link/ID inválido'
        target.classList.add(form.error)

        return false
    }

    loadThumb(id, target.parentNode.parentNode.parentNode.querySelector('img'), target)
}

const triggerInputFile = ({ target }) => {
    if (target.nodeName !== 'BUTTON') return false
    if (!target.classList.contains('addTranscription')) return false

    target.parentNode.querySelector('input').click()
}

const deleteItem = ({ target }) => {
    if (target.nodeName !== 'BUTTON') return false
    if (!target.classList.contains('delete')) return false

    const item = target.parentNode
    domFind('#addVideo').removeChild(item)
}

const triggerFileAdded = ({ target }) => {
    if (target.nodeName !== 'INPUT') return false
    if (!target.classList.contains('document')) return false

    target.parentNode.querySelector('p').innerText = `Arquivo escolhido: ${target.files[0].name}`
}

const addListeners = () => {
    domFind('#addVideoBtn').addEventListener('click', () => renderAddVideo())
    domFind('#saveCourse').addEventListener('click', () => save())
    domFind('#addVideo').addEventListener('blur', (e) => triggerLoadThumb(e), true)
    domFind('#addVideo').addEventListener('click', (e) => triggerInputFile(e))
    domFind('#addVideo').addEventListener('change', (e) => triggerFileAdded(e))
    domFind('#addVideo').addEventListener('click', (e) => deleteItem(e))
}

const renderPage = () => {
    disableFormDefaultSubmit()
    addListeners()
}

(async () => {
    if (!(await Auth.isAdmin())) return Redirects.toHome()
    renderPage()
})()
