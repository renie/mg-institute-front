import { render as genericRender, loadComponent } from '../../../common/component'

import styles from './index.css'


export const getAddVideo = async () => await loadComponent('addVideo', {styles})

export const render = async (selector = '#addVideo') => {
    genericRender(await getAddVideo(), selector)
}
