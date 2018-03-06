const marked = require('marked')
const { transpile }  = require('typescript')
const { highlightAuto } = require('highlight.js')
const { readFileSync } = require('fs')
const { join } = require('path')
const { template } = require('lodash')
const MenuRender = require('./MenuRender')

// const setModuleId = (code, moduleId) => code.replace(/(^define\(|[^.\w]define\()(?!\s*['"()])/, `$1"${moduleId}", `)
const setModuleId = (code, moduleId) => code.replace(/require\("(.*?)"\)/g, (all, m) => {
    const keywords = {
        'bulma-preact': 'BulmaPreact',
        'preact': 'BulmaPreact.Preact'
    }
    return keywords[m]
})

const tsconfig = {
    "module": "commonjs",
    "jsx": "react",
    "jsxFactory": "h",
    "target": "es2015"
}
const renderMD = md => {
    let demos = []
    const html = marked(md, {
        gfm: true,
        highlight(code, lang) {
            if (lang === 'tsx') {
                const index = demos.length
                demos.push(setModuleId(transpile(`
                const container = document.querySelectorAll('.content-holder .lang-tsx')[${index}].parentNode.nextElementSibling
                ` + code, tsconfig), `demo-code-${index}`))
            }
            return highlightAuto(code).value
        }
    })
    const result = html.replace(/(<pre><code class="lang-tsx">[\s\S\t\r\n]*?<\/code><\/pre>)/g,
        '</div>$1<div class="demo-holder" style="padding: .5em 0 2em"></div><div class="content">')
    const scripts = demos.map(demo => `(function (exports) {${demo}})({})`).join(';\n')
    return `<div class="content">${result}</div><script>${scripts}</script>`
}


const layout = template(readFileSync(join(__dirname, '../demo/layout.htm')).toString())

module.exports = conf => {
    const {
        build
    } = conf
    return {
        onSet(pathname, data, store) {
            const REG = /(src\/)?((\w+\/){1,2})?README\.md$/
            const match = pathname.match(REG)
            if (match) {
                const key = match[2] ? match[2].replace(/\/$/, '') : 'Index'
                const html = layout({
                    conf: {
                        basePath: '/'
                    }
                }).replace('$[placeholder]', `
    <div class="container columns">
        <div class="column is-2">${MenuRender(key, build)}</div>
        <div class="column content-holder">${renderMD(data.toString())}</div>
    </div>
                `)
                store._set(pathname.replace(REG, '$2index.html'), html)
            }
        }
    }
}
