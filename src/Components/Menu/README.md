## Menu
build menu list by tree-object

### Menu Props
```ts
export interface MenuItem {
    href?: string
    title?: string
    key: string
    item: string | VNode
    children?: MenuItem[]
}
export interface MenuGroup {
    label?: string | VNode
    href?: string
    list?: MenuItem[]
}
export interface MenuPropsType {
    onSelect?: {
        (key: string): void
    }
    className?: string
    activeKey?: string
    menus?: MenuGroup[]
}
```


### Demo
``` tsx
import { Menu } from 'bulma-preact'
import { render, h } from 'preact'

const menus = [
    {
        label: 'Columns',
        list: [
            { key: 'Basics', item: 'Basics'},
            { key: 'Sizes', item: 'Sizes'}
        ]
    },
    {
        label: 'Components',
        list: [
            { key: 'Card', item: 'Card' },
            { key: 'Dropdown', item: 'Dropdown', href: '../Dropdown/' },
            { key: 'Menu', item: 'Menu' },
            { key: 'Modal', item: 'Modal' }
        ]
    }
]

render(<Menu activeKey="Menu" menus={menus} onSelect={key => alert(key)}/>, container)
```