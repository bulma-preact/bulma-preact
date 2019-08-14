import { h, Component, render, VNode, ComponentConstructor, FunctionalComponent } from 'preact';
import Popup from './Popup';

export interface StateType {
    visible: boolean;
    childNode: HTMLElement;
}
export interface PropsType {
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    content: string | VNode;
    children: VNode;
    trigger?: 'click' | 'hover',
    popoverClassName?: string,
    popoverStyles?: any,
    placement?: 'topLeft' | 'topCenter' | 'topRight' | 'leftTop'
    | 'leftCenter' | 'leftBottom' | 'rightTop' | 'rightCenter'
    | 'rightBottom' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'
}

class Popover extends Component<PropsType, StateType> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            childNode: null
        }
    }

    onVisibleChange = (visible) => (e) => {
        this.setState({ visible });
        if (this.props.onVisibleChange) {
            this.props.onVisibleChange(visible);
        }
    }

    closeTooltip = (e) => {
        const { childNode } = this.state;
        if (e.target === this.base || (childNode && childNode.contains(e.target))) {
            return
        }
        this.setState({ visible: false })
    }

    componentDidMount() {
        this.props.trigger === 'click'
        && document.addEventListener('click', this.closeTooltip);
    }

    componentWillUnmount() {
        this.props.trigger === 'click'
        && document.removeEventListener('click', this.closeTooltip)
    }

    receiveChildren = (childNode) => {
        this.setState({ childNode })
    }

    renderTooltip = (): VNode => {
        const {
            content,
            popoverClassName = "",
            popoverStyles = {},
            placement = 'topLeft',
        } = this.props;
        const domNode = this.base;
        return domNode && (
            <Popup
                content={content}
                domHeight={domNode.offsetHeight}
                domWidth={domNode.offsetWidth}
                popoverClassName={popoverClassName}
                popoverStyles={popoverStyles}
                placement={placement}
                onReady={this.receiveChildren}
            />
        )
    }

    render() {
        const {
            children,
            trigger = 'hover',
            content
        } = this.props;
        const { visible } = this.state;
        const childNode = children[0];
        const node = childNode.children[0];
        const nodeName = childNode.nodeName;
        const key = childNode.key;
        const attributes = childNode.attributes || {};
        const params = {
            ...attributes,
            onClick: trigger === 'click' && this.onVisibleChange(true),
            onMouseEnter: trigger === 'hover' && this.onVisibleChange(true),
            onMouseLeave: trigger === 'hover' && this.onVisibleChange(false),
            style: {
                position: 'relative',
                cursor: 'pointer',
                ...attributes.style || {},
            },
            key,
            className: (attributes || {}).class,
        }

        return h(
            nodeName,
            params,
            node,
            (this.props.visible || visible) && content && this.renderTooltip(),
        );
    }
}

export default Popover;
