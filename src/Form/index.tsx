import { h, VNode, Component } from 'preact'
import Select, { SelectType as SelectProps } from './Select/index'
import Radio, { RadioGroup, OptionProps, RadioProps, RadioGroupProps } from './Radio/index'
import { ComponentBaseState } from '../interface';

export interface FormProps extends ComponentBaseState {}
export interface FormState {}

class Form extends Component<FormProps, FormState> {
    render(node: VNode) {
        return <form {...node.attributes}>{node.children}</form>
    }
}

export {
    Form,
    Select, SelectProps,
    Radio, RadioGroup, OptionProps, RadioProps, RadioGroupProps
}