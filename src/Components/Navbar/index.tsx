import { h, VNode, Component } from 'preact'
import Brand, { NavbarBrandProps } from './Brand'
import Menu, { NavbarMenuProps } from './Menu'
import { getClasses } from '../../utils/Base'
import { ComponentBaseProps } from '../../interface';

export interface NavbarProps extends ComponentBaseProps{
    brand: NavbarBrandProps,
    menu: NavbarMenuProps
}

let index = 0
export class Navbar extends Component<NavbarProps, { isActive: boolean}> {
    id: string
    constructor(props: NavbarProps) {
        super(props)
        this.id = 'bulma-preact-navbar-' + (++index)
        this.state = {
            isActive: false
        }
    }
    onToggle = (isActive: boolean) => {
        this.setState({isActive})
    }
    render () {
        const { id, onToggle } = this
        const { brand, menu } = this.props
        const { isActive } = this.state
        return <div className={getClasses(this.props, 'navbar')} >
            <Brand {...brand} onToggle={onToggle} isActive={isActive}/>
            <Menu {...menu} id={id} isActive={isActive}/>
        </div>
    } 
}