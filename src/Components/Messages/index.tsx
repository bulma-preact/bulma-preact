import { h, VNode, Component } from 'preact'
import Base, { BasePropsType, getClasses } from '../../utils/Base'

export interface MessagesProps extends BasePropsType {
    header?: string
    showClose?: boolean
    onClose?: Function
}
export class Messages extends Component<MessagesProps, {}> {
    constructor (props) {
        super(props)
    }
    render (node) {
        const { style, header, onClose, showClose } = this.props
        const className = getClasses(this.props, 'message')
        return <article style={style} className={className}>
            <div className="message-header">
                <p>{header}</p>
                {showClose && <button className="delete" aria-label="delete" onClick={e => onClose()}></button>}
            </div>
            <div className="message-body">
                {node.children}
            </div>
        </article>
    }
}