## Menu
build menu list by tree-object

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
            { key: 'Dropdown', item: 'Dropdown' },
            { key: 'Menu', item: 'Menu' },
            { key: 'Modal', item: 'Modal' }
        ]
    }
]

render(<Menu activeKey="Menu" menus={menus}/>, container)
```