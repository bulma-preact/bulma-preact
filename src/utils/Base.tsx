import classNames from '../utils/classnames'
import { h, Component, VNode } from 'preact'

export interface BaseStateType extends ComponentBaseState, Loading {
}

export interface BasePropsType extends ComponentBaseProps, BaseStateType {
}

export default class extends Component<BasePropsType, BaseStateType> {
    getClasses = (baseClass?: string): string => {
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
        } = this.props
        return (baseClass ? baseClass + ' ' : '') + classNames([
            isColor,
            isSize,
            isFloat,
            isLesses,
            align,
            isOutlined && 'outlined',
            isActive && 'active',
            isHovered && 'hovered',
            isFocused && 'focused',
            isLoading && 'loading',
            className
        ]).replace(/(^|\s)(\w)/g, '$1is-$2')
    }
    render(node: VNode) {
        const { isDisabled } = this.props
        return <a className={this.getClasses()} disabled={isDisabled}>{node.children}</a>
    }
}