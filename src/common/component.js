import {insertIntoPage, toHTML} from "./dom"


const loadedComponents = {}
const loadingComponents = {}

export const importHTML = async (path) => await fetch(path)
    .then(response => response.text())

export const buildComponentPath = (componentName) => `components/${componentName}`

export const isComponentLoaded = (component) => loadedComponents.hasOwnProperty(component)
export const isComponentLoading = (component) => loadingComponents.hasOwnProperty(component)

export const loadComponent = async (componentName, variables) => {
    if (isComponentLoaded(componentName)) return loadedComponents[componentName]
    if (isComponentLoading(componentName)) return toHTML(await loadingComponents[componentName], variables)

    loadingComponents[componentName] = importHTML(buildComponentPath(componentName))
    loadedComponents[componentName] = await loadingComponents[componentName]
    Reflect.deleteProperty(loadingComponents, componentName)

    return toHTML(loadedComponents[componentName], variables)
}

export const render = (component, selector) => insertIntoPage(component, selector)
