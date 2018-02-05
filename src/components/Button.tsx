import { h, VNode } from 'preact'
import Base, { BasePropsType } from './Base'

export default class extends Base{
    render (node: VNode) {
        const {
            href
        } = this.props

        return <a href={href} className={this.getClasses('button')}>{node.children}</a>
    }
}