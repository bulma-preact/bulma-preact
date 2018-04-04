## Navbar
build Navbar by object

### Menu Props
[MenuItem](../Menu/)
```js
export interface NavbarBrandProps extends MenuItem {
    dataTarget?: string
}
export interface NavbarMenuProps {
    id?: string
    start: MenuGroup[]
    end?: VNode[]
}
export interface NavbarProps extends ComponentBaseProps{
    isFixedTop: boolean
    brand: NavbarBrandProps,
    menu: NavbarMenuProps,
    onLink?: {
        (key: string): void
    }
}
```


``` tsx
import { Navbar } from 'bulma-preact'
import { render, h } from 'preact'

const brand = {
    href: '/',
    key: 'index',
    item: <img src="https://bulma.io/images/bulma-logo.png" height={28}/>
}

const menu = {

    end: [
        {
            label: 'Form',
            href: '../../Form/'
        },
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
                { key: 'Dropdown', item: 'Dropdown', href: '../Dropdown/'},
                { key: 'Menu', item: 'Menu' },
                { key: 'Modal', item: 'Modal' }
            ]
        }
    ]
}

render(<Navbar className="is-transparent" brand={brand} menu={menu}/>, container)
```