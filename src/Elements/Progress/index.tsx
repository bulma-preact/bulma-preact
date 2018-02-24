import { h, VNode } from 'preact'
import Base from '../../utils/Base'

export class Progress extends Base {
    defaultClass = 'progress'
    render(node: VNode) {
        const { style, value, max = 100 } = this.props
        const className = this.getClasses()
        return <progress style={style} className={className} value={value} max={max}>{node.children}</progress>
    }
}