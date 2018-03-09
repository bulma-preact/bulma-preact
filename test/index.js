const { h } = require('preact')
const render = require('preact-render-to-string')

const { Button } = require('../dist/bulma-preact')
let button = render(h(Button, {}, ['button']))

console.log(button)
