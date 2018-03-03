## Radio

### Radio Props
Props | Type | Default | Desc
:- | :- | :- | :-
*defaultChecked* | `boolean` | false | 初始是否选中		
*checked* | `boolean` | undefined | 指定当前是否选中
*value* | `string` | undefined | 根据 value 进行比较，判断是否选中
*disabled* | `boolean` | false | 是否禁用
### RadioGroup Props
Props | Type | Default | Desc
:- | :- | :- | :-
*defaultValue* | `string` | 无 | 默认选中的值		
*value* | `string` | "" | 选中的值
*options* | `Radio.Option[]` | [] | 选项
*onChange* | `function(value: string)` | undefined | 选中事件
### Radio.Option
Props | Type | Default | Desc
:- | :- | :- | :-
*defaultValue* | `string` | 无 | 默认选中的值		
*value* | `string` | "" | 选中的值
*options* | `Radio.Option[]` | [] | 选项
*onChange* | `function(value: string)` | undefined | 选中事件

### Demo
```tsx
import { render, h,Component } from 'preact'
import { Form, Columns } from 'bulma-preact'
import { render, h } from 'preact'
const { Radio } = Form

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
class RadioExample extends Component {
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
                <Radio value="radio">a</Radio>
      </div>
      <div>
        一组互斥的 Radio 配合使用。
            </div>
      <div>
        <Radio.RadioGroup defaultValue={1}>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </Radio.RadioGroup>
      </div>
      <div>
        Radio 禁用
            </div>
      <div>
        <Radio.RadioGroup options={options} />
      </div>
      <div>
        Radio onChange 事件(style属性，目前有点小bug)
            </div>
      <div>
        <Radio.RadioGroup value={this.state.value} onChange={this.onChange} options={options} >
          <Radio value={1} style={style}>A</Radio>
          <Radio value={2} style={style}>B</Radio>
          <Radio value={3} style={style}>C</Radio>
          <Radio value={4} style={style}>D</Radio>
        </Radio.RadioGroup>
      </div>
    </div>
  }
}
render(<RadioExample />, container)
```
