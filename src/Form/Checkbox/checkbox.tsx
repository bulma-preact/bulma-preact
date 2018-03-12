import { h, VNode, Component } from 'preact'
import classNames from '../../utils/classnames'
import Base, { BasePropsType, BaseStateType, getClasses } from '../../utils/Base'
import CheckboxGroup from './group'
// import CheckboxButton from './checkboxButton'

export interface CheckboxType extends BasePropsType {
    defaultChecked?: boolean   //	默认选中的值	any	无
    name?: string   //	CheckboxGroup 下所有 input[type = "checkbox"] 的 name 属性	string	无\
    checked?: boolean  //	用于设置当前选中的值	any	无
    disabled?: boolean  //	是否禁止掉	any	无
}
export interface StateType extends ComponentBaseState {
    checked?: boolean  //	用于设置当前选中的值	any	无
}

class Checkbox extends Component<CheckboxType, StateType> {
    static CheckboxGroup: typeof CheckboxGroup;
    //  static Button: typeof CheckboxButton;
    state: StateType;
    input: any;

    constructor(props: CheckboxType) {
        super(props);
        this.state = {
            checked: false,
        };
        this.input =null;
    }
    // getClasses = (defaultClass) => {
    //     const { multiple } = this.props
    //     return getClasses(this.props, classNames(defaultClass, multiple && 'is-multiple'))
    // }
    componentWillMount(){
        this.setState({
            checked:this.props.checked === undefined ? this.props.defaultChecked : false,
        })
        
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.checked !== undefined && nextProps.checked !== this.state.checked) {
            this.setState({
                checked: nextProps.checked
            })
        }
    }
    onChange = (e) => {
        const { props } = this;
        if (props.disabled) {
            return;
        }
        if (!('checked' in props)) {
            // console.log('ad',e.target.name);
              this.setState({
                checked: e.target.checked,
              });
        }

        /* 回调 */
        typeof(props.onChange)==='function' && props.onChange(e);
    };

    /* 后续拓展用到，将自身事件抛给父元素例如onClick等 */
    saveInput = (node) => {
        this.input = node;
    }
    render(node: VNode) {
        const { style = {}, defaultChecked = false, checked, name, value,disabled, } = this.props
        // const checkboxClassName = this.getClasses('checkbox')
        let _checked = this.state.checked;
        return (
                <label class="checkbox" style={style}>
                    <input type="checkbox" name={name} value={value}
                        onChange={this.onChange}
                        disabled={disabled}
                        checked
                        ref={this.saveInput}/>
                    {this.props.children}
                </label>
        )
    }
}

export default Checkbox

