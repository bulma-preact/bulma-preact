import classNames from '../utils/classnames'
import { h, Component, VNode } from 'preact'

export interface BaseStateType extends ComponentBaseState, Loading {
}

export interface BasePropsType extends ComponentBaseProps, BaseStateType {
}

export const getClasses = (props: any, defaultClass): string => {
    const {
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
    return (defaultClass ? defaultClass + ' ' : '') + classNames([
        isColor,
        isSize,
        isFloat,
        isLesses,
        align,
        isOutlined && 'outlined',
        isActive && 'active',
        isHovered && 'hovered',
        isFocused && 'focused',
        isLoading && 'loading'
    ]).replace(/(^|\s)(\w)/g, '$1is-$2') + (className ? (' ' + className) : '')
}
export default class extends Component<BasePropsType, BaseStateType> {
    defaultClass = ''
    getClasses = () => getClasses(this.props, this.defaultClass)
    render(node: VNode) {
        const { isDisabled, style } = this.props
        return <a className={this.getClasses()} disabled={isDisabled} style={style}>{node.children}</a>
    }
}