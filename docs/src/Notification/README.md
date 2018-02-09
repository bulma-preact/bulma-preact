## Notification

``` tsx
import { Notification } from 'bulma-preact'
import { render, h, Component } from 'preact'

const colors = ['primary', 'link', 'info', 'success', 'warning', 'danger']
class NotificationChanger extends Component {
    state = {
        color: 'primary'
    }
    componentDidMount() {
        const t = this
        setInterval(function () {
            t.setState({color: colors[Math.random() * colors.length | 0]})
        }, 1000)
    }
    render() {
        return <Notification style={{transition: 'all 1s ease'}} className={`is-${this.state.color}`}>Notification</Notification>
    }
}

render(<NotificationChanger/>, container)
```