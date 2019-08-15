## Form

### Demo
```tsx
import { render, h,Component } from 'preact'
import { Form } from 'bulma-preact'

class FormExample extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    submit = () => {
        this.props.form.validates((errors, values) => {
            if (!errors) {
                this.setState({
                    ...values
                })
            }
        })
    }

    renderResult = () => {
        let res = '';
        for (let key in this.state) {
            res += `${key}: ${this.state[key]}; `
        }
        return res;
    }

    reset = () => {
        this.props.form.resetFields()
    }

    render() {
        const { form } = this.props
        const { fieldDecorator } = form;
        return (
            <div>
                {fieldDecorator('required', {
                    label: 'required',
                    rules: [{
                        required: true, message: 'this item is required'
                    }]
                })(<input class="input" />)}
                {fieldDecorator('pattern', {
                    label: 'pattern',
                    rules: [{
                        pattern: /^\d{4,10}$/, message: 'wrong format'
                    }]
                })(<input class="input" />)}
                <button class="button" onClick={this.submit}>submit</button>
                <button class="button" onClick={this.reset}>reset</button>
                <div>
                    {this.renderResult()}
                </div>
            </div>
        )
    }
}
const MyForm = Form.createForm(FormExample)
render(<MyForm />, container)
```