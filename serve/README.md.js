const marked = require('marked')
const { transpile }  = require('typescript')
const { highlightAuto } = require('highlight.js')
const { readFileSync } = require('fs')
const { join } = require('path')
const { template } = require('lodash')
const MenuRender = require('./MenuRender')

const REG_AMD = /(^define\(|[^.\w]define\()(?!\s*['"()])/
const setModuleId = (code, moduleId) => code.replace(REG_AMD, `$1"${moduleId}", `)

const tsconfig = require('../tsconfig.json').compilerOptions
const renderMD = md => {
    let demos = []
    const result = marked(md, {
        highlight(code, lang) {
            if (lang === 'tsx') {
                const index = demos.length
                demos.push(setModuleId(transpile(`
                const container = document.querySelectorAll('.content .lang-tsx')[${index}].parentNode.parentNode
                ` + code, tsconfig), `demo-code-${index}`) + `require(['demo-code-${index}'])`)
            }
            return highlightAuto(code).value
        }
    })
    return result + `<script>${demos.join('\n')}</script>`
}


const layout = template(readFileSync(join(__dirname, '../demo/layout.htm')).toString())

module.exports = conf => {
    const {
        build
    } = conf
    return {
        onSet(pathname, data, store) {
            const match = pathname.match(/(\w+)?\/?README\.md$/)
            if (match) {
                const key = match[1] || 'Index'
                const html = layout({
                    conf: {
                        basePath: build ? '/bulma-preact/' : '/'
                    }
                }).replace('$[placeholder]', `
    <div class="container columns">
        <div class="column is-2">${MenuRender(key, build)}</div>
        <div class="column content">${renderMD(data.toString())}</div>
    </div>
                `)
                store._set(pathname.replace(/README\.md$/,'index.html'), html)
            }
        }
    }
}
