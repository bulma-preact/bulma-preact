const { argv } = process
const build = argv[argv.length - 1] === 'build'
const fixedModuleName = require('./build/fixedModuleName')
module.exports = {
    livereload: !build,
    build,
    gzip: true,
    include: /__include\(["'\s]*([^"'\s]+)["'\s]*(?:,["'\s]*([^"'\s]+)["'\s]*)?\)/g,
    buildFilter: p => !p || /^(src|demo|preact\.js|index\.html)/.test(p),
    middlewares: [
        fixedModuleName,
        { middleware: 'typescript'}
    ],
    output: require('path').join(__dirname, './docs')
}
