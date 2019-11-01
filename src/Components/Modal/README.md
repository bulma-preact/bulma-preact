## Modal
create Modal handle active

### Props
```ts
// Modal
export interface ModalProps extends BasePropsType {
    isActive?: boolean
    showClose?: boolean
    onClose?: Function
    card?: CardProps
    withBackground?: boolean
    modalContent?: string | VNode | CardProps
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
export class Modal {
    static showModal(info: string | VNode, options: ModalProps) { }
    static hideModal() {}
}
```

### Demo
``` tsx
import { Modal, Button, Card, ModalCard, Button } from 'bulma-preact'
import { render, h, Component } from 'preact'

class ModalContent extends Component {
    
    componentDidMount () {
        console.log('componentDidMount')
    }
    componentWillUnmount () {
        console.log('componentWillUnmount')
    }
    render ()  {
        return <div className="box">
            <h2>h2</h2>
            <p>content, content<br/> ok!</p>
        </div>
    }
}


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
            body: <ModalContent/>,
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
                    modalContent={this.props.innerCard ? <Card className="panel" header={{title: 'header'}} footer={card.footer} >something!</Card> : <ModalContent/>}
                    onClose={() => alert('close modal')} />
            }
        </span>
    }
}

render(<div className="buttons">
    <ModalShow>Open Modal</ModalShow>
    <ModalShow isCard>Open Card Modal</ModalShow>
    <ModalShow innerCard>Open Inner Card Modal</ModalShow>
    <Button onClick={() => Modal.showModal(<ModalContent/>)}>showModal(Box)</Button>
    <Button onClick={() => Modal.showModal(
        <Card className="panel" header={{title: 'header'}} footer={{
            buttons: [
                {name: 'Yes', isColor: 'success', onClick: (e) => { Modal.close() }},
                {name: 'No', onClick: (e) => {alert('No'); Modal.close()} }
            ]
        }}>nothing!</Card>,
        {
            withBackground: false,
            showClose: false
        }
    )}>showModal(Card with buttons)</Button>
</div>, container)
```