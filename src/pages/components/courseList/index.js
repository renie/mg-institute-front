import { render as genericRender, loadComponent } from '../../../common/component'

import * as listStyles from './index.scss'
import * as itemStyles from './course.scss'

export const getListComponent = async () => await loadComponent('courseList', {styles: listStyles})
export const getItemComponent = async (item) => await loadComponent('courseList/course', {styles: itemStyles, item})

export const renderItems = async (items) => await Promise
    .all(items
        .map(async (item) => await getItemComponent(item)))

export const render = async (selector = '#courseList', data) => {
    const listComponent = await getListComponent()

    const items = await renderItems(data)
    items.forEach((item) => listComponent.appendChild(item))

    genericRender(listComponent, selector)
}
