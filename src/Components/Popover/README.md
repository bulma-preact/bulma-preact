### Tooltip

```tsx
import { Popover, Button } from 'bulma-preact'
import { render, h } from 'preact'

render(
    <div>
        <Popover content="this is a popover" trigger="click">
            <Button>click</Button>
        </Popover>
        <Popover content="this is a popover" trigger="hover">
            <Button>hover</Button>
        </Popover>
        <Popover
            content="this is a popover"
            trigger="hover"
            placement="bottomRight"
        >
            <Button>bottom right</Button>
        </Popover>
    </div>,
    container
)
```