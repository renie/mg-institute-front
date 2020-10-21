import { loadComponent, insertIntoPage } from '../../../common/dom'
import styles from './index.css'

export const getHeader = async () => await loadComponent('components/header/index.html', {styles})


export const render = async (selector='#header') => insertIntoPage(await getHeader(), selector)
