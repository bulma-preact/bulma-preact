import * as Preact from 'preact'
import { h, VNode, Component } from 'preact'
import classNames from '../../utils/classnames'
import Base, { BasePropsType, BaseStateType, getClasses } from '../../utils/Base'
import Checkbox from './checkbox';

export interface Option {
  name: string
  value: string
  disabled: boolean
  style:object
}
export interface CheckboxType extends BasePropsType {
  defaultValue?: string   //	默认选中的值	any	无
  name?: string   //	CheckboxGroup 下所有 input[type = "checkbox"] 的 name 属性	string	无
  options?: Option   //以配置形式设置子元素	string[] | Array < { name: string value: string disabled?: boolean } > 无
  value?: string  //	用于设置当前选中的值	any	无
}

export interface CheckboxGroupProps extends BasePropsType {
  defaultValue?: any;
  value?: any;
  name?: string;
  children?: any;
  options?: Option[];
}

export interface CheckboxGroupState {
  value: any;
}

/* 获取children中checked 为true的 value值 */
function getCheckedValue(children: VNode) {
  let value = null;
  let isMatched = false;//是否匹配到了
  if (children instanceof Array && children.length > 0) {
    children.forEach((checkbox: any) => {
      if (checkbox && checkbox.props && checkbox.props.checked) {
        value = checkbox.props.value;
        isMatched = true;
      }
    })
  }
  return isMatched ? { value } : undefined;
}

export default class CheckboxGroup extends Component<CheckboxGroupProps, CheckboxGroupState> {
  static defaultProps = {
    disabled: false,
  };

  constructor(props: CheckboxGroupProps) {
    super(props);
    let value;
    
    /* 优先检测value，其次是defaultValue,如果都没有，通过checked获取 */
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    } else {
      const checkedValue = getCheckedValue(props.children);
      value = checkedValue && checkedValue.value;
    }
    this.state = {
      value,
    };
  }

  componentWillReceiveProps(nextProps: CheckboxGroupProps) {
    /* if value 绑定在上层父组件 else value 在内部 */
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    } else {
      const checkedValue = getCheckedValue(nextProps.children);
      if (checkedValue) {
        this.setState({
          value: checkedValue.value,
        });
      }
    }
  }



  onCheckboxChange = (ev) => {
    const lastValue = this.state.value;
    const { value } = ev.target;
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }

    /* 执行回调 */
    (typeof(this.props.onChange)==='function' && value !== lastValue) && this.props.onChange(ev);
    
  }

  render() {
    const props = this.props;
    const { style, className = '', options } = props;

    let children = props.children;

    /* 如果存在 options, 优先使用options */
    if (options && options.length > 0) {
      children = options.map((option, index) => {
        return (
          <Checkbox
            key={index}
            disabled={option.disabled || this.props.disabled}
            value={option.value}
            onChange={this.onCheckboxChange}
            checked={this.state.value === option.value}
            style={option.style}
          >
            {option.name}
          </Checkbox>
        );
      });
    }

    return (
      <div className="control" style={style}>
        {children}
      </div>
    );
  }
}
