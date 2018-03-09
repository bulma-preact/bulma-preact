import { h, VNode, Component } from 'preact'
import Base, { BasePropsType, getClasses } from '../../utils/Base'
import { Card, CardProps } from './Card'

export interface ModalProps extends BasePropsType {
    isActive?: boolean
    showClose?: boolean
    onClose?: Function
    card?: CardProps
    modalContent?: string | VNode | CardProps
}

export class Modal extends Component<ModalProps, { isActive : boolean }> {
    constructor(props: ModalProps) {
        super(props)
        this.state = {
            isActive: props.isActive
        }
    }
    componentWillReceiveProps(nextProps: ModalProps) {
        if (this.state.isActive !== nextProps.isActive) {
            this.setState({
                isActive: nextProps.isActive
            })
        }
    }
    componentDidMount () {
        const t = this
        document && document.addEventListener('keyup', e => {
            if (t.state.isActive && e.key === "Escape") {
                t.onClose()
            }
        })
    }
    
    onClose = () => {
        const { onClose } = this.props
        onClose && onClose()
        this.setState({
            isActive: false
        })
    }
    render(node) {
        const { style, onClose, showClose, modalContent } = this.props
        const { isActive } = this.state
        const className = getClasses(Object.assign({}, this.props, { isActive }), 'modal')
        return <div style={style} className={className}>
            <div className="modal-background"></div>
            <div className="modal-content">
                {modalContent}
            </div>
            {showClose && <button className="modal-close is-large" aria-label="close" onClick={this.onClose}></button>}
        </div>
    }
}

export class ModalCard extends Modal {
    render(node) {
        const { style, onClose, showClose, card } = this.props
        const { isActive } = this.state
        const className = getClasses(Object.assign({}, this.props, { isActive }), 'modal')
        return <div style={style} className={className}>
            <div className="modal-background"></div>
            <Card {...card} onClose={this.onClose} isSize="small" />
        </div>
    }
}