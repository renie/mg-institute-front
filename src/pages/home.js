import { render as renderHeader } from './components/header'

const renderPage = async () => renderHeader()

renderPage().then(console.log)
