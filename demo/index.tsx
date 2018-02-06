import { h, render } from 'preact'

import { Button } from '../src/index'
document.body.innerHTML = ''
render(<Button isColor="primary">Button</Button>, document.body)
