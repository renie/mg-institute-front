import { Auth, Redirects } from '../common/helpers/'


const signInBtn = document.querySelector('#signin')
const emailSigninField = document.querySelector('#emailLogin')
const passSigninField = document.querySelector('#passwordLogin')
const loginErrorMessage = document.querySelector('#loginErrorMessage')


const disableButton = btn => {
    btn.disabled = true
    btn.classList.add('is-loading')
}

const enableButton = btn => {
    btn.classList.remove('is-loading')
    btn.disabled = false
}

const userConfirmForcedLogin = () => confirm('Esse usuário já está conectado! Efetuando esse login, o outro dispositivo será desconectado. Gostaria de entrar assim mesmo?')

const isUserLoggedAlready = e => e.data?.type === 'LOGGED_USER'

const shouldTryForcingLogin = e => isUserLoggedAlready(e) && userConfirmForcedLogin()


const signIn = async (evt, forced = false) => {
    evt.preventDefault()

    const clickedBtn = evt.target
    disableButton(clickedBtn)

    try {
        await Auth.doLogin({
            email: emailSigninField.value,
            password: passSigninField.value,
            wipeOldSessions: forced
        })

        Redirects.toLoggedHome()
    } catch (e) {
        if (shouldTryForcingLogin(e)) signIn(evt, true)

        loginErrorMessage.classList.remove('is-hidden')
        enableButton(clickedBtn)
    }
}

const checkIfShouldSendForm = evt => evt.code === 'Enter' && signInBtn.click()

const setListeners = () => {
    signInBtn.addEventListener('click', signIn)
    emailSigninField.addEventListener('keyup', checkIfShouldSendForm)
    passSigninField.addEventListener('keyup', checkIfShouldSendForm)
}

const renderPage = async () => {
    if (await Auth.checkLogin(false)) Redirects.toLoggedHome()

    setListeners()
}

renderPage()
