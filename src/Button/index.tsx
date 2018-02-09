import { h, VNode } from 'preact'
import Base from '../utils/Base'

export default class extends Base {
    render(node: VNode) {
        const {
            href,
            isDisabled
        } = this.props

        return <a href={href} className={this.getClasses('button')} disabled={isDisabled}>{node.children}</a>
    }
}