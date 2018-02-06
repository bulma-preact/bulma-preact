import { h } from '/bulma-preact/demo/preact.js';
import Base from './Base.js';
export default class extends Base {
    render(node) {
        const { href } = this.props;
        return h("a", { href: href, className: this.getClasses('button') }, node.children);
    }
}
