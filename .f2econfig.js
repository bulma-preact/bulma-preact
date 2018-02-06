const { argv } = process
const build = ({
    build: !0,
    docs: !0
})[argv[argv.length - 1]]

module.exports = {
    livereload: !build,
    build,
    gzip: true,
    include: /__include\(["'\s]*([^"'\s]+)["'\s]*(?:,["'\s]*([^"'\s]+)["'\s]*)?\)/g,
    buildFilter: p => !p || /^(src|demo|index\.html)/.test(p),
    middlewares: [
        require('./serve/IndexPage'),
        { middleware: 'template', test: /\.html*/ },
        require('./serve/fixedModuleName'),
        { middleware: 'typescript'}
    ],
    output: require('path').join(__dirname, './docs')
}
