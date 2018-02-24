import { h, VNode, Component } from 'preact'
import { isClassNames } from '../../utils/classnames'

export interface StateType {
    activeIndex: number
}
export interface PropsType {
    align?: Alignments | 'fullwidth'
    isSize?: Sizes
    isBoxed?: boolean
    isToggle?: boolean | 'rounded'
    activeIndex?: number
    items: Item[]
    showItems?: any[]
    onTabs?: {
        (index: number): void
    }
}

export interface Item {
    title: string,
    icon?: string
}

export class Tabs extends Component<PropsType, StateType> {
    props: PropsType
    state: StateType
    constructor(props: PropsType) {
        super(props)
        this.state = {
            activeIndex: props.activeIndex | 0
        }
    }
    onClick = (activeIndex: number) => {
        const { onTabs } = this.props
        onTabs && onTabs(activeIndex)
        this.setState({
            activeIndex
        })
    }
    render() {
        const { state, props, onClick } = this
        const { activeIndex } = state
        const { align, isSize, isBoxed, isToggle, items = [], showItems } = props
        return <div className="tabs-holder">
            <div className={'tabs ' + isClassNames([
                align,
                isSize,
                isBoxed && 'boxed',
                isToggle && (isToggle === true ? 'toggle' : `toggle is-toggle-${isToggle}`)
            ])}>
                <ul>{items.map(({ title, icon }, i) => <li key={`${i}`}
                    className={i === activeIndex ? 'is-active' : ''}
                    onClick={e => onClick(i)}
                    >
                        <a>
                        {icon && <span class="icon is-small"><i className={`fa fa-${icon}`}></i></span>}
                        <span>{title}</span>
                        </a>
                    </li>)}</ul>
            </div>
            {showItems && <div className="tabs-show">{showItems[activeIndex]}</div>}
        </div>
    }
}