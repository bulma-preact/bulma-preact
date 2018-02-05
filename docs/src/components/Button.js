import { h } from '/bulma-react/demo/preact.js?0.0.1';
import Base from './Base.js?0.0.1';
export default class extends Base {
    render(node) {
        const { href } = this.props;
        return h("a", { href: href, className: this.getClasses('button') }, node.children);
    }
}
