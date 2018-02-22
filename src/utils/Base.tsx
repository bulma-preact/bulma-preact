import { isClassNames } from '../utils/classnames'
import { h, Component, VNode } from 'preact'

export interface BaseStateType extends ComponentBaseState, Loading {
}

export interface BasePropsType extends ComponentBaseProps, BaseStateType {
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
        className
    } = props
    return (defaultClass ? defaultClass + ' ' : '') + isClassNames([
        isColor,
        isSize,
        isFloat,
        isLesses,
        align,
        isBoxed && 'boxed',
        isOutlined && 'outlined',
        isActive && 'active',
        isHovered && 'hovered',
        isFocused && 'focused',
        isLoading && 'loading'
    ]) + (className ? (' ' + className) : '')
}
export default class extends Component<BasePropsType, BaseStateType> {
    defaultClass = ''
    getClasses = () => getClasses(this.props, this.defaultClass)
    render(node: VNode) {
        const { isDisabled, style } = this.props
        return <a className={this.getClasses()} disabled={isDisabled} style={style}>{node.children}</a>
    }
}