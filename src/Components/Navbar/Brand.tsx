import { h, VNode, Component } from 'preact'
import { MenuItem } from '../Menu/index'


export interface NavbarBrandProps extends MenuItem {
    onToggle?: {
        (active:boolean): void
    }
    isActive?: boolean
    dataTarget?: string
}

export default ({ href, title, item, dataTarget, isActive, onToggle }: NavbarBrandProps) => <div className="navbar-brand">
    <a href={href} className="navbar-item" title={title}>
        {item}
    </a>
    {dataTarget && <div className={'navbar-burger burger' + (isActive ? ' is-active' : '')} data-target={dataTarget} onClick={e => onToggle(!isActive)}>
        <span></span>
        <span></span>
        <span></span>
    </div>}
</div>