import { isClassNames } from '../utils/classnames'
import { h, Component, VNode } from 'preact'

export interface BaseStateType extends ComponentBaseState, Loading {
}

export interface BasePropsType extends ComponentBaseProps, BaseStateType {
    key:any
}

export const getClasses = (props: BasePropsType|any, defaultClass): string => {
    const {
        isBoxed,
        isColor,
        isSize,
        isFloat,
        isLesses,
        align,
        isOutlined,
        isActive,
        isHovered,
        isFocused,
        isLoading,
        isRounded,
        className
    } = props
    return (defaultClass ? defaultClass + ' ' : '') + isClassNames([
        isColor,
        isSize,
        isFloat,
        isLesses,
        align,
        isRounded && 'rounded',
        isBoxed && 'boxed',
        isOutlined && 'outlined',
        isActive && 'active',
        isHovered && 'hovered',
        isFocused && 'focused',
        isLoading && 'loading'
    ]) + (className ? (' ' + className) : '')
}
export default class extends Component<BasePropsType, BaseStateType> {
    inline = false
    defaultClass = ''
    getClasses = () => getClasses(this.props, this.defaultClass)
    getEvents = () => {
        const props = this.props
        let res = {}
        Object.keys(props).map(k => {
            if (/^on[A-Z]/.test(k)) {
                res[k] = props[k]
            }
        })
        return res
    }
    render(node: VNode) {
        const { isDisabled, style } = this.props
        const className = this.getClasses()
        return this.inline
            ? <a style={style} className={className} disabled={isDisabled} {...this.getEvents()}>{node.children}</a>
            : <div style={style} className={className} disabled={isDisabled} {...this.getEvents()}>{node.children}</div>
    }
}