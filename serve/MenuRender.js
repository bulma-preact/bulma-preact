const { h } = require('preact')
const render = require('preact-render-to-string')
const { Menu } = require('../dist/bumla-preact')
const { readdirSync, existsSync, statSync } = require('fs')
const { join } = require('path')

const root = join(__dirname, '../src/')
const getList = () => readdirSync(root).filter(name => /^[A-Z]/.test(name)).map(name => {
    let menu = {
        item: name,
        key: name
    }
    let sub_components = []
    const sub_path = join(root, name)
    if (statSync(sub_path).isDirectory()) {
        readdirSync(sub_path).forEach(sub => {
            if (statSync(join(sub_path, sub)).isDirectory()) {
                sub_components.push({
                    item: sub,
                    key: name + '/' + sub,
                    href: '/' + name + '/' + sub + '/'
                })
            }
        })
    }
    if (existsSync(join(sub_path, 'README.md'))) {
        menu.href = '/' + name + '/'
    }
    if (sub_components.length) {
        menu.children = sub_components
    }
    return menu
})

const renderComponent = (activeKey, build) => render(h(Menu, {
    activeKey,
    menus: [
        {
            label: 'Index',
            list: [{
                item: 'Index',
                key: 'Index',
                href: '/'
            }]
        },
        {
            label: 'Components',
            list: getList()
        }
    ]
}))

module.exports = renderComponent
