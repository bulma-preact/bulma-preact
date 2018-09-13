import { h, VNode, Component } from 'preact'
import Base, { BasePropsType, getClasses } from '../../utils/Base'

export interface CardProps extends BasePropsType {
    image?: VNode
    header?: {
        title: string | VNode
        icon?: string | VNode
    }
    footer?: {
        buttons: ({
            name: string
            onClick?: {
                (e: Event): void
            }
        })[]
    }
}
export class Card extends Component<CardProps, {}> {
    constructor(props: CardProps) {
        super(props)
    }
    render () {
        const { image, header, footer, children} = this.props
        return <div className={getClasses(this.props, 'card')}>
            {header && <div className="card-header">
                <div className="card-header-title">{header.title}</div>
                {header.icon && <a href="javascript:;" className="card-header-icon">
                    {typeof header.icon === 'string' ? <span className={'fa fa-' + header.icon}></span> : header.icon}
                </a>}
            </div>}
            {image && <div className="card-image">{image}</div>}
            <div className="card-content">{children}</div>
            {footer && footer.buttons && <div className="card-footer">
                {footer.buttons.map((item, index) => <a className="card-footer-item" key={'' + index} onClick={item.onClick}>{item.name}</a>)}
            </div>}
        </div>
    }
}