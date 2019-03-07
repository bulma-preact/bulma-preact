import { h, VNode, Component } from 'preact'
import Select from './Select/index'
import Radio from './Radio/index'
import { ComponentBaseState } from '../interface';

export interface FromProps extends ComponentBaseState {}
export interface FormState {}

class Form extends Component<FromProps, FormState> {
    render(node: VNode) {
        return <form {...node.attributes}>{node.children}</form>
    }
}

export {
    Form,
    Select,
    Radio
}