## Dropdown
下拉菜单

### Props
Props | Type | Default | Desc
:- | :- | :- | :-
*align* | `"right"` | undefined | 对齐方式
*content* | `Dropdown.Content` | "" | 菜单内容
*trigger* | `"click/hover/focus"` | "click" | 触发方式
*up* | `boolean` | false | 菜单弹出方向
*isActive* | `boolean` | false | 默认展开菜单

### Demo
```tsx
import { Dropdown } from 'bulma-preact'
import { render, h } from 'preact'
const { Content, Item } = Dropdown

const content = <Content>
    <Item>Dropdown item</Item>
    <Item isActive>Other dropdown item</Item>
    <a className="dropdown-item" href="https://bulma.io/documentation/components/dropdown/">With Link</a>
    <hr class="dropdown-divider"/>
    <Item>Last dropdown item</Item>
</Content>

render(<div>
<Dropdown content={content}>
    <span>Dropdown button</span>
    <span className="icon is-small">
        <i className="fa fa-angle-down" aria-hidden="true"></i>
    </span>
</Dropdown>
<Dropdown content={content} up trigger="hover">
    <span>is up</span>
    <span className="icon is-small">
        <i className="fa fa-angle-up" aria-hidden="true"></i>
    </span>
</Dropdown>
<Dropdown content={content} align="right" trigger="focus">
    <span>align right</span>
    <span className="icon is-small">
        <i className="fa fa-angle-down" aria-hidden="true"></i>
    </span>
</Dropdown>
<Dropdown content={content} isActive isColor="danger">
    <span>auto expended</span>
    <span className="icon is-small">
        <i className="fa fa-angle-down" aria-hidden="true"></i>
    </span>
</Dropdown>
</div>, container)
```