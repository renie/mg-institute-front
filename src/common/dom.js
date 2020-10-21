import propPath from 'property-path'
export const getVariablesRegex = (variable) => new RegExp(`\\$\\{([a-zA-Z0-9._]+)\\}`, 'g')

export const importHTML = async (path) => await fetch(path)
    .then(response => response.text())

export const toHTML = (componentHTMLString) => (new DOMParser())
    .parseFromString(componentHTMLString, 'text/html')
    .querySelector('body > *')

export const parseVariablesToHTMLString = (variables, htmlString) => Object
        .keys(variables)
        .reduce((lastModified, prop) => lastModified
            .replace(getVariablesRegex(prop), (_, className) => propPath.get(variables, className))
        , htmlString)

export const loadComponent = async (componentPath, variables) => {
    const componentHTML = await importHTML(componentPath)
    if (!variables) return toHTML(componentHTML)

    return toHTML(parseVariablesToHTMLString(variables, componentHTML))
}

export const insertIntoPage = (component, selector) => document
    .querySelector(selector)
    .appendChild(component)
