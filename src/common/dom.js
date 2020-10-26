import getPath from 'object-path-get'


export const getVariablesRegex = () => new RegExp(`\\$\\{([a-zA-Z0-9._]+)\\}`, 'g')

export const parseStringToHTML = (string) => (new DOMParser()).parseFromString(string, 'text/html')

export const parseVariablesToHTMLString = (variables, htmlString) => Object
        .keys(variables)
        .reduce((lastModified, prop) => lastModified
            .replace(getVariablesRegex(prop), (_, objectPath) => getPath(variables, objectPath))
        , htmlString)

export const toHTML = (componentHTMLString, variables) => (variables
        ? parseStringToHTML(parseVariablesToHTMLString(variables, componentHTMLString))
        : parseStringToHTML(componentHTMLString)
).querySelector('body > *')

export const shouldReplace = parent => parent.dataset && parent.dataset.hasOwnProperty('replace')

export const addToParent = (component, parent) => parent.appendChild(component)

export const replaceParent = (component, parent) => (component.id=parent.id) && parent.parentNode.replaceChild(component, parent)

export const insertIntoPage = (component, selector) => {
    const parent = document.querySelector(selector)
    return shouldReplace(parent)
        ? replaceParent(component, parent)
        : addToParent(component, parent)
}
