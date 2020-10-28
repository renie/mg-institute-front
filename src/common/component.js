import {insertIntoPage, toHTML} from "./dom"


const loadedComponents = {}
const loadingComponents = {}

export const buildAPIPath = (componentName) => `/api/${componentName}`

export const sendPostData = async (component, body) => await fetch(
    buildAPIPath(component),
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body
    }
)
    .then((response) => response.text())

export const importHTML = async (path) => await fetch(path)
    .then((response) => response.text())

export const buildComponentPath = (componentName) => `/components/${componentName}`

export const isComponentLoaded = (component) => loadedComponents.hasOwnProperty(component)
export const isComponentLoading = (component) => loadingComponents.hasOwnProperty(component)

export const loadComponent = async (componentName, variables) => {
    if (isComponentLoaded(componentName)) return toHTML(loadedComponents[componentName], variables)
    if (isComponentLoading(componentName)) return toHTML(await loadingComponents[componentName], variables)

    loadingComponents[componentName] = importHTML(buildComponentPath(componentName))
    loadedComponents[componentName] = await loadingComponents[componentName]
    Reflect.deleteProperty(loadingComponents, componentName)

    return toHTML(loadedComponents[componentName], variables)
}

export const render = (component, selector) => insertIntoPage(component, selector)
