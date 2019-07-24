import { h, VNode, Component } from 'preact'
import classNames from '../../utils/classnames'

export interface InputQLProps<T = {}> {
    style?: any
    items: T[]
    columns: string[]
    onChange?: (valid: boolean, filter?: (obj: T) => boolean) => void
    isUp?: boolean
}
interface State {
    active?: boolean
    valid?: boolean
    dropdowns?: string[]
    active_index?: number
}

let Dropdown_Index = 0
export class InputQL extends Component<InputQLProps, State> {

    index: number
    constructor(props: InputQLProps) {
        super(props)
        this.index = ++Dropdown_Index
        this.state = {
            valid: true,
            dropdowns: [],
            active_index: -1
        }
    }

    updateState = (state: State, filter?: any) => {
        const { onChange } = this.props
        onChange && onChange(state.valid, filter)
        this.setState(state)
    }
    renderMeta = () => {
        const { columns = [], items = [] } = this.props
        const reg = /^(\w+)\s+(==|!=|>|<|≈)\s+['"]?([^\s'"]+)['"]?(\s*)$/
        const reg1 = /^(\w+)\s+$/
        const reg2 = /^(\w+)\s+(==|!=|>|<|≈)\s+$/
        const ql = this.input.value

        let valid = true
        let dropdowns = []

        if (!ql) {
            this.updateState({ valid, dropdowns: columns })
            return;
        }

        const group = ql.split(' || ');
        const group_filter = []
        for (let i = 0; i < group.length; i++) {
            const expr = group[i];
            const temps = expr.split(' && ');
            const temps_filter = []
            for (let j = 0; j < temps.length; j++) {
                const kv = temps[j];
                const isLast = i === group.length - 1 && j === temps.length - 1;
                if (reg.test(kv)) {
                    const [_, k, o, v, s] = kv.match(reg)
                    if (columns.indexOf(k) === -1) {
                        this.updateState({valid: false})
                        return;
                    }
                    if (isLast) {
                        dropdowns = s.length ? ['&&', '||'] : items.map(o => o[k]).filter(n => !!n)
                    }
                    temps_filter.push({ k, o, v: v.trim() })
                } else if (isLast) {
                    if (reg1.test(kv)) {
                        this.updateState({ valid: false, dropdowns: '==|!=|>|<|≈'.split('|') })
                        return;
                    } else if (reg2.test(kv)) {
                        const [_, k] = kv.match(reg2)
                        this.updateState({ valid: false, dropdowns: items.map(o => o[k]).filter(n => !!n)  })
                        return;
                    } else {
                        this.updateState({ valid: false, dropdowns: columns })
                        return;
                    }
                }
            }
            
            group_filter.push((obj: any) => temps_filter.filter(({ k, o, v }) => {
                let value: any = v.replace(/^['"](.*?)['"]$/, '$1');
                switch (typeof obj[k]) {
                    case 'number': value = Number(v); break;
                }
                switch (o) {
                    case '==': return obj[k] == value;
                    case '!=': return obj[k] != value;
                    case '>': return obj[k] > value;
                    case '<': return obj[k] < value;
                    case '≈': return (obj[k] || '').toString().indexOf(v) > -1;
                    default:
                        return false
                }
            }).length === temps.length)
        }

        let filter: any
        if (valid) {
            filter = (obj: any) => !!group_filter.find(fn => fn(obj));
        }
        this.updateState({ valid, dropdowns }, filter)
    }

    input: HTMLInputElement
    refInput = (input: HTMLInputElement) => {
        this.input = input
    }

    onInput = () => {
        this.renderMeta()
        this.setState({active: true})
    }
    onBlur = () => {
        setTimeout(() => {
            this.setState({active: false})
        }, 40);
    }
    onKeyDown = (e: KeyboardEvent) => {
        let { active_index, dropdowns = [] } = this.state
        const len = dropdowns.length
        switch (e.keyCode) {
            case 38:
                e.preventDefault()
                this.setState({
                    active_index: (active_index + len - 1) % len
                });
                break;
            case 40:
                e.preventDefault()
                this.setState({
                    active_index: (active_index + len + 1) % len
                });
                break;
            case 13:
                e.preventDefault()
                this.onItemSelect(dropdowns[active_index]);
                this.setState({
                    active: false,
                    active_index: -1
                });
                break;
        }
    }

    onItemSelect = (item: string) => {
        this.input.value = this.input.value.replace(/\S+$/, '') + item + ' '
        this.input.focus()
        setTimeout(this.onInput, 20);
    }
    render() {
        const { state, props } = this
        const { valid, active, dropdowns, active_index } = state
        const { style, isUp } = props

        return <div className={classNames({
            'dropdown': true,
            'is-active': active && !!dropdowns.length,
            'is-up': !!isUp
        })}>
            <div className="dropdown-trigger">
                <input type="text" className={classNames({
                    'input': true,
                    'is-danger': !valid
                })} style={style} ref={this.refInput} onInput={this.onInput} onKeyDown={this.onKeyDown} onFocus={this.onInput} onBlur={this.onBlur}/>
            </div>
            <div className="dropdown-menu" id={`dropdown-menu${this.index}`} role="menu">
                <div class="dropdown-content" style={{maxHeight: 300, overflow: 'auto'}}>
                    {dropdowns.map((item, i) => <a class={classNames({
                        'dropdown-item': true,
                        'is-active': active_index === i
                    })} onClick={() => this.onItemSelect(item)} key={item}>{item}</a>)}
                </div>
            </div>
        </div>
    }
}
