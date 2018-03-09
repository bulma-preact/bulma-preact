## Messages
create Content with color, etc.

### Props
```ts
export interface MessagesProps extends BasePropsType {
    header?: string
    onClose?: Function
}
```

### Demo
``` tsx
import { Messages } from 'bulma-preact'
import { render, h } from 'preact'

render(<div className="panel">
    <Messages isColor="link" header="message 1" showClose onClose={() => alert(1)}>
        <h2>h2</h2>
        <p>content, content<br/> ok!</p>
    </Messages>
    <Messages isColor="danger" header="message 2">
        <h2>h2</h2>
        <p>content, content<br/> ok!</p>
    </Messages>
</div>, container)
```