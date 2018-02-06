import classNames from '../utils/classnames.js';
import { h, Component } from '/bulma-preact/demo/preact.js';
export default class extends Component {
    constructor() {
        super(...arguments);
        this.getClasses = (baseClass) => {
            const { isColor, isSize, isFloat, isLesses, align, isOutlined, isActive, isHovered, isFocused, isLoading, className } = this.props;
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
            ]).replace(/(^|\s)(\w)/g, '$1is-$2');
        };
    }
    render(node) {
        const { isDisabled } = this.props;
        return h("a", { className: this.getClasses(), disabled: isDisabled }, node.children);
    }
}
