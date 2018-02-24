## Progress

### Colors
```tsx
import { Progress } from 'bulma-preact'
import { render, h } from 'preact'

render(<div>
    <Progress isColor="primary" value="15">30%</Progress>
    <Progress isColor="success" value="30">30%</Progress>
    <Progress isColor="danger" value="90">90%</Progress>
</div>, container)
```


### Sizes
```tsx
import { Progress } from 'bulma-preact'
import { render, h } from 'preact'

render(<div>
    <Progress isSize="small" value="15">30%</Progress>
    <Progress value="30">60%</Progress>
    <Progress isSize="large" value="90">90%</Progress>
</div>, container)
```