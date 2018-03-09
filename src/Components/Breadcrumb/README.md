## Breadcrumb
build breadcrumb

### Breadcrumb Props
```ts
export type Separator = 'arrow' | 'bullet' | 'dot' | 'succeeds'
export interface BreadcrumbItem {
    name: string | VNode
    href?: string
    icon?: string
}
export interface BreadcrumbPropsType extends BasePropsType{
    activeIndex?: number
    separator?: Separator
    items?: BreadcrumbItem[]
}
export interface MenuStateType {
    activeIndex?: number
}
```


### Demo
``` tsx
import { Breadcrumb } from 'bulma-preact'
import { render, h } from 'preact'

const items = [
    { name: 'Index', href: '/', icon: 'home' },
    { name: 'Components', icon: 'puzzle-piece' },
    { name: 'Breadcrumb', icon: 'thumbs-up' },
]

render(<div>
    <Breadcrumb items={items}/>
    <Breadcrumb items={items} separator="dot" align="centered"/>
    <Breadcrumb items={items} separator="arrow" align="right" activeIndex={1} isSize="small"/>
</div>, container)
```