import { template } from 'dot'


export const domFind = (selector, parent = document, multiple = false) => {
    const func = (multiple
        ? Reflect.get(parent, 'querySelectorAll')
        : Reflect.get(parent, 'querySelector'))
    return Reflect.apply(func, parent, [selector])
}

export const parseStringToHTML = (string) => (new DOMParser()).parseFromString(string, 'text/html')

export const parseVariablesToHTMLString = (variables, htmlString) => template(htmlString)(variables)

export const toHTML = (componentHTMLString, variables) => (variables
    ? parseStringToHTML(parseVariablesToHTMLString(variables, componentHTMLString))
    : parseStringToHTML(componentHTMLString)
).querySelector('body > *')

export const shouldReplace = (parent) => parent.dataset && parent.dataset.hasOwnProperty('replace')

export const addToParent = (component, parent) => parent.appendChild(component)

export const replaceParent = (component, parent) => (component.id = parent.id) && parent.parentNode.replaceChild(component, parent)

export const insertIntoPage = (component, selector) => {
    const parent = domFind(selector)
    return shouldReplace(parent)
        ? replaceParent(component, parent)
        : addToParent(component, parent)
}

