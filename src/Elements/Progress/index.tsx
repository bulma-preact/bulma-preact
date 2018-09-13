import { h, VNode } from 'preact'
import Base from '../../utils/Base'

export class Progress extends Base {
    defaultClass = 'progress'
    render() {
        const { style, value, max = 100, children } = this.props
        const className = this.getClasses()
        return <progress style={style} className={className} value={value} max={max}>{children}</progress>
    }
}