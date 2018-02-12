import { h, VNode } from 'preact'
import Base from '../utils/Base'

// TODO
export default class extends Base {
    defaultClass = 'notification'
    render(node: VNode) {
        const { isDisabled, style } = this.props
        return <div className={this.getClasses()} disabled={isDisabled} style={style}>{node.children}</div>
    }
}