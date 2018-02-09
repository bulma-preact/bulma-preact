const { argv } = process
const build = ({
    build: !0,
    docs: !0
})[argv[argv.length - 1]]

const getModuleId = p => p
module.exports = {
    livereload: !build,
    build,
    gzip: true,
    include: /__include\(["'\s]+([^"'\s]+)["'\s]+(?:,["'\s]+([^"'\s]+)["'\s]+)?\)/g,
    buildFilter: p => !p || /^(src|demo|preact|index|README)/.test(p),
    middlewares: [
        { middleware: 'template', test: /(config\.js)$/ },
        require('./serve/IndexPage'),
        require('./serve/README.md'),
        { middleware: 'typescript', getModuleId }
    ],
    bundles: [
        {
            test: /(src|demo)\/(?!config).*\.[jet]sx?$/,
            dist: 'demo/config.js'
        }
    ],
    output: require('path').join(__dirname, './docs')
}
