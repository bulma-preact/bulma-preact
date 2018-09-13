import { h, VNode, Component, render } from 'preact'
import Base, { BasePropsType, getClasses } from '../../utils/Base'
import IPreact from 'ipreact'
const { connect, getState, dispatch } = IPreact()({})

export interface MessagesProps {
    style?: any
    isColor?: string
    header?: string
    showClose?: boolean
    onClose?: Function
}
export class Messages extends Component<MessagesProps, {}> {
    constructor (props) {
        super(props)
    }
    render () {
        const { style, header, onClose, showClose, children } = this.props
        const className = getClasses(this.props, 'message')
        return <article style={style} className={className}>
            <div className="message-header">
                <p>{header}</p>
                {showClose && <button className="delete" aria-label="delete" onClick={e => onClose()}></button>}
            </div>
            <div className="message-body">
                {children}
            </div>
        </article>
    }
    static showMessage:{
        (info, header?): void
    }
}

const MessageShow = connect(() => getState())(({
    header,
    isColor,
    isActive,
    info
}) => <div className={`modal${isActive ? ' is-active' : ''}`}>
    <Messages isColor={isColor} header={header} onClose={() => dispatch(state => {
        return { ...state, isActive: false }
    })} style={{minWidth: 300}}>{info}</Messages>
</div>)

let message
Messages.showMessage = (info, options = {}) => {
    const t = 1000 + info.length * 100
    const { header = '信息', isColor = 'primary', timeout = t } = options
    if (!message) {
        render(message = <MessageShow />, document.body)
    }
    dispatch(state => {
        return { info, header, isActive: true, isColor }
    })
    setTimeout(function() {
        dispatch(state => ({...state, isActive: false}))
    }, timeout);
}