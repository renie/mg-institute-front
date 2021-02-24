import { render as genericRender, loadComponent } from '../../../common/component'

import * as styles from './index.scss'


export const getHeader = async () => await loadComponent('header', {styles})

export const render = async (selector = '#header') => genericRender(await getHeader(), selector)
