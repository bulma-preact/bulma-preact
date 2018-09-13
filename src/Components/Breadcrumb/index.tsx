import { h, VNode, Component } from 'preact'
import Base, { BasePropsType, getClasses } from '../../utils/Base'

export type Separator = 'arrow' | 'bullet' | 'dot' | 'succeeds'
export interface BreadcrumbItem {
    name: string | VNode
    href?: string
    icon?: string
}
export interface BreadcrumbPropsType extends BasePropsType{
    activeIndex?: number
    separator?: Separator
    items?: BreadcrumbItem[]
}
export interface MenuStateType {
    activeIndex?: number
}

export class Breadcrumb extends Component<BreadcrumbPropsType, MenuStateType> {
    defaultClass = 'breadcrumb'
    constructor(props: BreadcrumbPropsType) {
        super(props)
        this.state = {
            activeIndex: props.activeIndex || (props.items ? props.items.length - 1 : 0)
        }
    }
    render() {
        const { items = [], separator } = this.props
        const { activeIndex } = this.state
        const className = 'breadcrumb' + (separator ? ` has-${separator}-separator` : '')
        return <nav className={getClasses(this.props, className)} aria-label="breadcrumbs">
            <ul>
                {items.map((item, i) => <li key={'' + i} className={i === activeIndex && 'is-active'}>
                    <a href={item.href} aria-current={i === activeIndex && 'page'}>
                        {item.icon && <span className="icon is-small"><i className={'fa fa-' + item.icon}></i></span>}
                        <span>{item.name}</span>
                    </a>
                </li>)}
            </ul>
        </nav>
    }
}