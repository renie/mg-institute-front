import {insertIntoPage, toHTML} from "./dom"


export const importHTML = async (path) => await fetch(path)
    .then(response => response.text())

export const buildComponentPath = (componentName) => `components/${componentName}`

export const loadComponent = async (componentName, variables) => toHTML(await importHTML(buildComponentPath(componentName)), variables)

export const render = (component, selector) => insertIntoPage(component, selector)
