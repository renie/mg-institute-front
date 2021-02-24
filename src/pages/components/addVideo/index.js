import { render as genericRender, loadComponent } from '../../../common/component'
import { domFind } from '../../../common/dom'

import * as styles from './index.scss'
import * as form from '../forms/index.scss'


export const getAddVideo = async (index) => await loadComponent('addVideo', {styles, index, form})

export const render = async (selector = '#addVideo') => {
    genericRender(await getAddVideo(domFind(selector).children.length), selector)
}
