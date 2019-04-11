import { h, VNode, Component } from 'preact'
import classNames from '../../utils/classnames'
import { getClasses } from '../../utils/Base'
import { ComponentBaseState } from '../../interface';

export interface StateType extends ComponentBaseState {
}
export interface PropsType extends StateType {
    align?: 'right'
    content?: any
    toggle?: boolean
    trigger?: 'click' | 'hover' | 'focus'
    up?: boolean 
}


export class Content extends Component<{ className?: string }, any> {
    render(node: VNode) {
        const { className } = this.props
        return <div className={classNames([className, 'dropdown-content'])}>{node.children}</div>
    }
}
export class Item extends Component<{ className?: string, isActive?: boolean }, any> {
    render(node: VNode) {
        const { className, isActive } = this.props
        return <a className={classNames([className, 'dropdown-item', isActive && 'is-active'])}>{node.children}</a>
    }
}

let Dropdown_Index = 0
export class Dropdown extends Component<PropsType, StateType> {
    state: StateType
    index: number
    constructor(props: PropsType) {
        super(props)
        this.state = {
            isActive: props.isActive || false
        }
        this.index = ++Dropdown_Index
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.isActive !== this.state.isActive) {
            this.setState({
                isActive: nextProps.isActive
            })
        }
    }
    
    onClick = () => {
        const { trigger = 'click', toggle = true } = this.props
        const { isActive } = this.state
        if (trigger === 'click') {
            this.setState({
                isActive: toggle ? !isActive : true
            })
        }
    }
    onFocus = () => {
        const { trigger } = this.props
        if (trigger === 'focus') {
            this.setState({
                isActive: true
            })
        }
    }
    onBlur = () => {
        const t = this
        const { trigger } = this.props
        if (trigger === 'focus') {
            setTimeout(function () {
                t.setState({
                    isActive: false
                })
            }, 200)
        }
    }
    render() {
        const { state, props, onClick } = this
        const { isActive } = state
        const { content = '', align = 'left', trigger = 'click', up = false, children } = props
        const btnProps = Object.assign({}, props, {isActive: false})
        return <div className={classNames({
            'dropdown': true,
            'is-active': isActive,
            'is-right': align === 'right',
            'is-hoverable': trigger === 'hover',
            'is-up': up
        })}>
            <div className="dropdown-trigger" onClick={this.onClick}>
                <button className={getClasses(btnProps, 'button')}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    aria-haspopup="true"
                    aria-controls={`dropdown-menu${this.index}`}
                >
                    {children}
                </button>
            </div>
            <div className="dropdown-menu" id={`dropdown-menu${this.index}`} role="menu">
                {content}
            </div>
        </div>
    }
    static Content = Content
    static Item = Item
}
