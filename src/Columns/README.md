## Columns

``` tsx
import { Columns, Notification as N } from 'bulma-preact'
import { render, h } from 'preact'
const { Column } = Columns

render(<Columns className="is-desktop">
    <Column><N isColor="primary">column1</N></Column>
    <Column><N isColor="danger">column2</N></Column>
    <Column col={5}>
        <Columns className="is-mobile">
            <Column><N isColor="success">3-1</N></Column>
            <Column><N isColor="warning">3-2</N></Column>
        </Columns>
    </Column>
</Columns>, container)
```
