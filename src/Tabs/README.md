## Tabs

### Default
``` tsx
import { Tabs } from 'bulma-preact'
import { render, h } from 'preact'

const items = [
    { title: 'Pictures' },
    { title: 'Music' },
    { title: 'Videos' },
    { title: 'Files' }
]

render(<Tabs items={items} />, container)
```

### Props
Props | Type | Default | Desc
:- | :- | :- | :-
*align* | `"left/right/centered/fullwidth"` | "left" | 对齐方式
*isBoxed* | `boolean` | false | 按钮boxed样式
*isToggle* | `boolean/"rounded"` | false | 按钮toggle样式
*activeIndex* | `number` | 0 | 默认聚焦
*items* | `Tabs.Item[]` | [] | 选项
*showItems* | `[]` | undefined | 选项对应展示内容
*onTabs* | `function(index: number): void` | undefined | 选中事件

### With Options
``` tsx
import { Tabs } from 'bulma-preact'
import { render, h } from 'preact'

const items = [
    { title: 'Pictures', icon: 'image' },
    { title: 'Music', icon: 'music' },
    { title: 'Videos', icon: 'film' },
    { title: 'Files', icon: 'file' }
]
const showItems = [
    <p><img src="https://www.baidu.com/img/baidu_jgylogo3.gif"/></p>,
    <p><audio src="http://www.w3school.com.cn/i/horse.ogg" autoplay controls/></p>,
    <p><video src="http://www.w3school.com.cn/i/movie.ogg" loop autoplay controls/></p>,
    <h3>Nothing!</h3>
]

const onTabs = index => alert(items[index].title)

render(<div>
    <Tabs items={items} activeIndex={0} isBoxed align="centered" /><br/>
    <Tabs items={items} activeIndex={1} isToggle align="fullwidth" /><br/>
    <Tabs items={items} activeIndex={2} isToggle="rounded" isSize="small"/><br/>
    <Tabs items={items} activeIndex={3} showItems={showItems} onTabs={onTabs}/>
</div>, container)
```