import { render as genericRender, loadComponent } from '../../../common/component'

import styles from './index.css'


export const getHeader = async () => await loadComponent('header', {styles})

export const render = async (selector = '#header') => genericRender(await getHeader(), selector)
