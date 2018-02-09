import { h, VNode, Component } from 'preact'
import classNames from '../utils/classnames'

export interface StateType { }

export interface ColumnProps extends JSX.HTMLAttributes{
    col?: ColumnSizes
}

export class Column extends Component<ColumnProps, StateType> {
    render(node: VNode) {
        const {
            className,
            col
        } = this.props
        return <div className={classNames(['column', col && ('is-' + col), className])}>{node.children}</div>
    }
}

class Columns extends Component<ColumnProps, StateType> {
    render(node: VNode) {
        const {
            className
        } = this.props

        return <div className={classNames(['columns', className])}>{node.children}</div>
    }
}
Object.assign(Columns, { Column })
export default Columns