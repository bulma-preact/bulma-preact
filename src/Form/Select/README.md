## Select

### Props
Props | Type | Default | Desc
:- | :- | :- | :-
*value* | `string` | "" | value
*options* | `Select.Option[]` | [] | 选项
*multiple & size* | `boolean & number` | undefined | 多选
*onChange* | `function(e: Event): void` | undefined | 选中事件

### Demo
```tsx
import { Form, Columns } from 'bulma-preact'
import { render, h } from 'preact'
const { Select } = Form
const { Column } = Columns
const options = [
    { name: '请选择', value: ''},
    { name: 'Form', value: '1'},
    { name: 'Elements', value: '2'},
    { name: 'Components', value: '3'}
]
render(<Columns>
    <Column>
        <Select options={options} />
    </Column>
    <Column>
        <Select options={options} value="2" isColor="danger"/>
    </Column>
    <Column>
        <Select options={options} value="1" isDisabled/>
    </Column>
    <Column>
        <Select options={options} isRounded/>
    </Column>
    <Column>
        <Select options={options} isSize="small" multiple size={4}/>
    </Column>
</Columns>, container)
```
