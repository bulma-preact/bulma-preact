import { h, VNode, Component } from 'preact'
import classNames from '../../utils/classnames'
import Base, { BasePropsType, BaseStateType, getClasses } from '../../utils/Base'

export interface Option {
    name: string
    value: string
}
export interface SelectType extends BasePropsType {
    options?: Option[]
    multiple?: boolean
    icon?: string
}

class Select extends Component<SelectType, BaseStateType> {
    constructor(props: SelectType) {
        super(props)
    }
    getClasses = (defaultClass) => {
        const { multiple } = this.props
        return getClasses(this.props, classNames(defaultClass, multiple && 'is-multiple') )
    }
    onChange = (e: Event) => {
        const { onChange } = this.props
        onChange && onChange(e)
    }
    render(node: VNode) {
        const { isDisabled, style, name, options = [], value = '', icon, multiple, size } = this.props
        const selectClassName = this.getClasses('select')
        const iconClassName = this.getClasses('icon')
        return <div className="control">
            <div className={selectClassName} style={style}>
                <select name={name} disabled={isDisabled} multiple={multiple} size={size} onChange={this.onChange}>
                    {options && options.map(o => <option value={o.value} key={o.value} selected={value === o.value}>{o.name}</option>)}
                </select>
            </div>
            {icon && <span class={iconClassName}>
                <i class={`fa fa-${icon}`}></i>
            </span>}
        </div>
    }
}

export default Select