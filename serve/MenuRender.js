const { h } = require('preact')
const render = require('preact-render-to-string')
const { Menu } = require('../dist/bumla-preact')
const { readdirSync, existsSync } = require('fs')
const { join } = require('path')

const root = join(__dirname, '../src/')
const list = readdirSync(root).filter(name => {
    return existsSync(join(root, name + '/README.md'))
})

const renderComponent = (activeKey, build) => render(h(Menu, {
    activeKey,
    menus: [
        {
            list: list.map(name => ({
                name,
                key: name,
                href: (build ? '/bulma-preact/' : '/') + name + '/'
            }))
        }
    ]
}))

module.exports = renderComponent

console.log(renderComponent('Menu'))