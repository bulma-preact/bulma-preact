## Checkbox

### Checkbox Props
Props | Type | Default | Desc
:- | :- | :- | :-
*defaultChecked* | `boolean` | false | 初始是否选中		
*checked* | `boolean` | undefined | 指定当前是否选中
*value* | `string` | undefined | 根据 value 进行比较，判断是否选中
*disabled* | `boolean` | false | 是否禁用
### CheckboxGroup Props
Props | Type | Default | Desc
:- | :- | :- | :-
*defaultValue* | `string` | undefined | 默认选中的值		
*value* | `string` | undefined | 选中的值
*options* | `Checkbox.Option[]` | [] | 选项
*onChange* | `function(value: string)` | undefined | 选中事件
### Checkbox.Option
Props | Type | Default | Desc
:- | :- | :- | :-
*name* | `string` | undefined | 名称		
*value* | `string` | undefined | 值
*disabled* | `boolean` | false | 是否禁用,true为禁用
*style* | `obejct` | undefined | 单个的样式

### Demo
```tsx
import { render, h,Component } from 'preact'
import { Form, Columns } from 'bulma-preact'
import { render, h } from 'preact'
const { Checkbox } = Form
const options = [
    { name: 'Form', value: '1'},
    { name: 'Elements', value: '2'},
    { name: 'Components', value: '3'},
    { name: 'disabled', value: '4',disabled:true}
]
const style = {
    display:'block',
    marginLeft:'5px'
}
class CheckboxExample extends Component {
  state={
      value:''
  }
  onChange = (ev) => {
      console.log('ev',ev.target)
    this.setState({
      value: ev.target.value
    })
  }
  render(){
    return <div>
      <div>
        基本用法
          <Checkbox></Checkbox>
      </div>
    </div>
  }
}
render(<CheckboxExample />, container)
```
