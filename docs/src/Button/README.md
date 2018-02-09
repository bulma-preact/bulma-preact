## Button

create Button with color,size, etc.

``` tsx
import { Button } from 'bulma-preact'
import { render, h } from 'preact'

render(<div className="panel">
    <Button isColor="primary">Button</Button>
    <Button isColor="link">Button</Button>
    <Button isColor="success">Button</Button>
    <Button isColor="danger">Button</Button>
    <Button isLoading >Button</Button>
    <Button isDisabled >Button</Button>
</div>, container)
```