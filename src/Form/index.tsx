import { h, VNode, Component } from 'preact'
import Select, { SelectType as SelectProps } from './Select/index'
import Radio, { RadioGroup, OptionProps, RadioProps, RadioGroupProps } from './Radio/index'
import { ComponentBaseState } from '../interface';
import { createForm } from './Form/index'

export interface FormProps extends ComponentBaseState {}
export interface FormState {}

class Form extends Component<FormProps, FormState> {
    render(node: VNode) {
        return <form {...node.attributes}>{node.children}</form>
    }
}
Object.assign(Form, {
    Select, Radio, createForm
})

export {
    Form,
    SelectProps,
    RadioGroup, OptionProps, RadioProps, RadioGroupProps
}