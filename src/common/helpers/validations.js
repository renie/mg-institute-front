import * as form from '../../pages/components/forms/index.scss'

export const getRequiredValue = (field) => {
    if (!field.value) {
        const error = Error('RequiredField')
        error.meta = { field }
        throw error
    }
    return field.value
}

export const validateField = (field, options) => {
    for (const prop in options) {
        if (!options.hasOwnProperty(prop)) continue

        const expectedValue = options[prop]

        if (prop === 'value' && !field.value.trim()) return false
        if (prop === 'classList' && !field.classList.contains(expectedValue)) return false

        if (prop !== 'value' && prop !== 'classList') {
            if (!(field[prop] === expectedValue)) return false
        }
    }

    return true
}

export const setFieldWithError = (field, message) => {
    field.value = ''
    field.dataset.originalPlaceholder = field.placeholder
    field.placeholder = message
    field.classList.add(form.error)
}

export const setFieldWithoutError = (field) => {
    field.placeholder = field.originalPlaceholder
    field.classList.remove(form.error)
}
