import { h, VNode, Component, render, FunctionalComponent } from 'preact'
import Base, { BasePropsType, getClasses } from '../../utils/Base'
import { Card, CardProps } from './Card'
import IPreact from 'ipreact'
const { connect, getState, dispatch } = IPreact()({})

export interface ModalProps extends BasePropsType {
    isActive?: boolean
    showClose?: boolean
    onClose?: Function
    card?: CardProps
    withBackground?: boolean
    modalContent?: string | VNode | CardProps | FunctionalComponent
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
    render() {
        const { style, showClose, modalContent, withBackground = true } = this.props
        const { isActive } = this.state
        const className = getClasses(Object.assign({}, this.props, { isActive }), 'modal')
        return <div style={style} className={className}>
            {withBackground && <div className="modal-background"></div>}
            <div className="modal-content">
                {typeof modalContent === 'function' ? modalContent({}) : modalContent}
            </div>
            {showClose && <button className="modal-close is-large" aria-label="close" onClick={this.onClose}></button>}
        </div>
    }
    static showModal(info: string | VNode | FunctionalComponent, options?: ModalProps) { }
    static close() { }
    static hideModal() {}
}

export class ModalCard extends Modal {
    render() {
        const { style, onClose, withBackground, card } = this.props
        const { isActive } = this.state
        const className = getClasses(Object.assign({}, this.props, { isActive }), 'modal')
        return <div style={style} className={className}>
            {withBackground && <div className="modal-background"></div>}
            <Card {...card} onClose={this.onClose} isSize="small" />
        </div>
    }
}

export const ModalShow = connect(() => getState())((props: ModalProps) => <Modal {...props} onClose={() => {
    props.onClose && props.onClose()
    dispatch(state => ({...state, isActive: false}))
}}/>)

let modal: VNode<Modal>
Modal.showModal = (modalContent, options = {showClose: true, withBackground: true}) => {
    if (!modal) {
        render(modal = <ModalShow />, document.body)
    }
    dispatch((state): ModalProps => {
        const { showClose, withBackground } = options
        return { ...state, modalContent, showClose, withBackground, isActive: true }
    })
}
Modal.hideModal = Modal.close = () => {
    dispatch(state => ({ ...state, isActive: false }))
}