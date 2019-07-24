## Dropdown
对象数组检索组件

### Props
Props | Type | Default | Desc
:- | :- | :- | :-
*style* | null | undefined | 原生Style
*items* | `T[]` | [] | 对象数组
*columns* | `string[]` | [] | 列
*onChange* | null | (filter: (obj: T) => boolean) => void | 参数为过滤对象数组的方法
*isUp* | `false` | bool | 下拉框位置

### Demo
```tsx
import { InputQL } from 'bulma-preact'
import { render, h, Component } from 'preact'

const items = [
    { name: 'Abcd', age: 14, sex: 'male' },
    { name: 'Hebellt', age: 24, sex: 'famale' },
    { name: 'Ellext', age: 34, sex: 'famale' },
    { name: 'Gogutt', age: 31, sex: 'male' },
    { name: 'Muttus', age: 27, sex: 'male' },
    { name: 'Fuss', age: 65, sex: 'famale' },
    { name: 'Fust', age: 34, sex: 'male' },
];
const columns = ['name', 'age', 'sex'];

class Demo extends Component {

    state = {
        filter: (item) => true
    }
    onChange = (valid, filter) => {
        if (valid) {
            this.setState({filter})
        }
    }
    render () {
        const { filter } = this.state
        return <div className="content">
            <InputQL isUp items={items} columns={columns} onChange={this.onChange} style={{width: 400}}/>
            <ul style={{height: 400}}>
                {items.filter(filter).map(item => <li>{item.name} {item.age} {item.sex}</li>)}
            </ul>
        </div>
    }
}

render(<Demo />, container)
```