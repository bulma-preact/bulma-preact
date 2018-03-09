## Card
create Card with image,header,footer.items etc.

### Props
```ts
export interface CardProps extends BasePropsType {
    image?: VNode
    header?: {
        title: string | VNode
        icon?: string | VNode
    }
    footer?: {
        buttons: ({
            name: string
            onClick?: {
                (e: Event): void
            }
        })[]
    }
}
```

### Demo
``` tsx
import { Card } from 'bulma-preact'
import { render, h } from 'preact'
const image = <img src="https://bulma.io/images/placeholders/1280x960.png"/>
const buttons = ['Yes', 'No'].map(name => ({name}))
render(<div>
    <Card className="panel" header={{title: 'header'}}>something!</Card>
    <Card className="panel" header={{title: 'header'}} footer={{buttons}}>something!</Card>
    <Card className="panel" image={image} header={{title: 'header', icon: 'angle-down'}}>something!</Card>
</div>, container)
```