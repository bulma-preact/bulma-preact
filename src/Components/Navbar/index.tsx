import { h, VNode, Component } from 'preact'
import Brand, { NavbarBrandProps } from './Brand'
import Menu, { NavbarMenuProps } from './Menu'
import { getClasses } from '../../utils/Base'

export interface NavbarProps extends ComponentBaseProps{
    brand: NavbarBrandProps,
    menu: NavbarMenuProps,
    onLink?: {
        (key: string): void
    }
}

let index = 0
export class Navbar extends Component<NavbarProps, { isActive: boolean}> {
    brand: NavbarBrandProps
    menu: NavbarMenuProps
    constructor(props: NavbarProps) {
        super(props)
        let id = 'bulma-preact-navbar-' + (++index)
        this.menu = { id, start: props.menu.start, end: props.menu.end }
        this.brand = Object.assign({dataTarget: id}, props.brand)
        this.state = {
            isActive: false
        }
    }
    onToggle = (isActive: boolean) => {
        this.setState({ isActive })
    }
    render () {
        const { brand, menu } = this
        const { isActive } = this.state
        return <div className={getClasses(this.props, 'navbar')}>
            <Brand {...brand} onToggle={this.onToggle} isActive={isActive}/>
            <Menu {...menu} isActive={isActive}/>
        </div>
    } 
}