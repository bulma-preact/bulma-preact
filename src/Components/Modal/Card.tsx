import { h, VNode, Component } from 'preact'
import Base, { BasePropsType, getClasses } from '../../utils/Base'

export interface CardProps extends BasePropsType {
    header?: VNode
    body: VNode
    footer?: {
        buttons: ({
            name: string
            isColor?: Colors
            onClick?: {
                (e: Event): void
            }
        })[]
    }
    onClose?: {
        (e:Event): void
    }
}
export const Card = (props: CardProps) => {
    const { header, body, footer, onClose } = props
    return <div className={getClasses(props, 'modal-card')}>
        {header && <div className="modal-card-head">
            <p className="modal-card-title">{header}</p>
            <button className="delete" aria-label="close" onClick={onClose}></button>
        </div>}
        <section className="modal-card-body">{body}</section>
        {footer && <footer className="modal-card-foot">
            {footer.buttons.map(({isColor, onClick, name}, i) => <button className={'button' + (isColor ? ' is-' + isColor : '')} key={'' + i} onClick={onClick}>{name}</button>)}
        </footer>}
    </div>
}