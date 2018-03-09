## Modal
create Modal handle active

### Props
```ts
// Modal
export interface ModalProps extends BasePropsType {
    isActive?: boolean
    showClose?: boolean
    onClose?: Function
    modalContent?: string|VNode
}
// Modal.Card
export interface CardProps extends BasePropsType {
    header?: VNode
    body: VNode
    footer?: {
        buttons: ({
            name: string
            isColor?: Colors
            onClick?: {
                (e: Event): void
            }
        })[]
    }
}
```

### Demo
``` tsx
import { Modal, Button, Card, ModalCard } from 'bulma-preact'
import { render, h, Component } from 'preact'

const modalContent = <div className="box">
    <h2>h2</h2>
    <p>content, content<br/> ok!</p>
</div>

class ModalShow extends Component {
    constructor (props) {
        super(props)
        this.state = { isActive: false }
    }
    onClick = () => {
        this.setState({isActive: true})
    }
    onClose = () => {
        this.setState({isActive: false})
    }
    render (node) {
        const { onClose } = this
        const card = {
            header: 'Title',
            body: modalContent.children,
            footer: {
                buttons: [
                    {name: 'Yes', isColor: 'success', onClick: (e) => {alert('Yes'); onClose()}},
                    {name: 'No', onClick: (e) => alert('No')}
                ]
            }
        }

        return <span>
            <Button onClick={this.onClick}>{node.children}</Button>
            {this.props.isCard
                ?
                <ModalCard isActive={this.state.isActive} card={card} onClose={() => alert('close card')} />
                :
                <Modal isActive={this.state.isActive} showClose
                    modalContent={this.props.innerCard ? <Card className="panel" header={{title: 'header'}} footer={card.footer} >something!</Card> : modalContent}
                    onClose={() => alert('close modal')} />
            }
        </span>
    }
}
render(<div className="buttons">
    <ModalShow>Open Modal</ModalShow>
    <ModalShow isCard>Open Card Modal</ModalShow>
    <ModalShow innerCard>Open Inner Card Modal</ModalShow>
</div>, container)
```