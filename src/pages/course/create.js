import { domFind } from '../../common/dom'
import { getData } from '../../common/component'
import { render as renderAddVideo } from '../components/addVideo'
import { Auth, Redirects, Validation } from '../../common/helpers/'


const addVideoButton = domFind('#addVideoBtn')
const saveCourse = domFind('#saveCourse')
const addVideo = domFind('#addVideo')


const getVideoIdFromLink = link => {
    const regexIdFromLink = /(?<id>[0-9]+)$/g
    const match = regexIdFromLink.exec(link)

    if (!match) return false
    return match.groups.id
}

const getItemInfo = (item) => {
    const [
        titleField,
        urlField,
        descriptionField,
        documentField
    ] = [...domFind('input, textarea', item, true)]

    return {
        title: Validation.getRequiredValue(titleField),
        url: getVideoIdFromLink(Validation.getRequiredValue(urlField)),
        description: Validation.getRequiredValue(descriptionField),
        document: documentField.files[0]
    }
}

const getVideosInfo = () => [...domFind('#addVideo li', document, true)].map(getItemInfo)

const getFormData = () => ({
    title: Validation.getRequiredValue(domFind('#title')),
    videos: getVideosInfo()
})

const populateVideosOnFormData = (videoList, formData) => {
    for (const videoRef in videoList) {
        if (!videoList.hasOwnProperty(videoRef)) continue


        const { document: videoFile, ...videoData } = videoList[videoRef]

        formData.append('videos[]', JSON.stringify(videoData))
        formData.append('videos[]', videoFile)
    }

    return formData
}

const createFormDataObject = (data) => {
    const formData = new FormData()

    for (const prop in data) {
        if (!data.hasOwnProperty(prop)) continue

        if (prop === 'videos') populateVideosOnFormData(data[prop], formData)
        else formData.append(prop, data[prop])
    }

    return formData
}

const save = event => {
    event.preventDefault()

    try {
        const data = createFormDataObject(getFormData())
        return data
    } catch (e) {
        if (e.message === 'RequiredField') {
            const { field } = e.meta
            Validation.setFieldWithError(field, 'Esse campo é OBRIGATÓRIO!!!')
        }
    }
}

const loadThumb = async (id, imgTag, field) => {
    try {
        const src = await getData(`video/vimeothumbof/${id}`)

        if (!src) Validation.setFieldWithError(field, `ID ${id} não foi encontrado no Vimeo!!!`)
        else imgTag.src = src
    } catch (e) {
        Validation.setFieldWithError(field, `Ocorreu um problema ao carregar o video ${id} no Vimeo!!!`)
    }
}

const triggerLoadThumb = ({ target: blurredElement }) => {
    if (!Validation.validateField(blurredElement, {
        nodeName: 'INPUT',
        classList: 'videoUrl',
        value: true
    })) return false

    const inputElement = blurredElement
    const inputParentList = inputElement.parentNode.parentNode.parentNode
    const imageElement = inputParentList.querySelector('img')

    Validation.setFieldWithoutError(inputElement)

    const id = getVideoIdFromLink(inputElement.value)

    if (!id) Validation.setFieldWithError(inputElement, 'Link/ID inválido')

    else loadThumb(id, imageElement, inputElement)
}

const triggerInputFile = (event) => {
    const { target: clickedElement } = event

    if (!Validation.validateField(clickedElement, {
        nodeName: 'BUTTON',
        classList: 'addTranscription'
    })) return false

    event.preventDefault()

    clickedElement.parentNode.querySelector('input').click()
}

const triggerFileAdded = ({ target: changedElement }) => {
    if (!Validation.validateField(changedElement, {
        nodeName: 'INPUT',
        classList: 'document'
    })) return false


    changedElement.parentNode.querySelector('p').innerText = `Arquivo escolhido: ${changedElement.files[0].name}`
}

const deleteItem = (event) => {
    const { target: clickedElement } = event

    if (!Validation.validateField(clickedElement, {
        nodeName: 'BUTTON',
        classList: 'delete'
    })) return false

    event.preventDefault()

    const item = clickedElement.parentNode
    domFind('#addVideo').removeChild(item)
}

const addListeners = () => {
    addVideoButton.addEventListener('click', e => {
        e.preventDefault()
        renderAddVideo()
    })
    saveCourse.addEventListener('click', e => save(e))
    addVideo.addEventListener('blur', e => triggerLoadThumb(e), true)
    addVideo.addEventListener('click', e => triggerInputFile(e))
    addVideo.addEventListener('change', e => triggerFileAdded(e))
    addVideo.addEventListener('click', e => deleteItem(e))
}

const disableFormDefaultSubmit = () => domFind('#createForm').addEventListener('submit', (e) => e.preventDefault())

const renderPage = () => {
    disableFormDefaultSubmit()
    addListeners()
}

(async () => {
    if (!(await Auth.isAdmin())) return Redirects.toHome()
    renderPage()
})()
