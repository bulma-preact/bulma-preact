import { h, Component, render, VNode } from 'preact';
import { containerStyle, arrowPlacement } from './placement';

interface PropsType {
    content: string | VNode
    domHeight: number;
    domWidth: number;
    popoverStyles: any;
    popoverClassName: string;
    placement: string;
    onReady?: (n: HTMLElement) => void;
}

interface StateType {
    height: number,
    width: number
}
class Popover extends Component<PropsType, StateType> {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            width: 0,
        }
    }

    componentDidMount() {
        const { base } = this;
        this.setState({
            height: base.offsetHeight,
            width: base.offsetWidth
        })
        if (this.props.onReady) {
            this.props.onReady(base);
        }
    }

    render() {
        const {
            domHeight,
            domWidth,
            popoverStyles = {},
            popoverClassName,
            content,
            placement
        } = this.props;
        const { height, width } = this.state;

        return (
            <div
                className="popup-container"
                style={containerStyle(placement, width, height, domWidth, domHeight)}
            >
                <div
                    className="popup-arrow"
                    style={arrowPlacement(placement, width, height, domWidth, domHeight)}
                >
                </div>
                <div
                    className={`popup-inner ${popoverClassName}`}
                    style={{
                        display: 'inline-block',
                        position: 'relative',
                        padding: '10px 15px',
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)',
                        zIndex: 1,
                        textAlign: 'left',
                        color: '#444',
                        ...popoverStyles
                    }}
                >
                    {content}
                </div>
            </div>

        )
    }
}

export default Popover;