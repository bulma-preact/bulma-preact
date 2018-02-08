const { argv } = process
const build = ({
    build: !0,
    docs: !0
})[argv[argv.length - 1]]

const getModuleId = build ? p => p.replace(/demo\//, '') : undefined
module.exports = {
    livereload: !build,
    build,
    gzip: true,
    include: /__include\(["'\s]+([^"'\s]+)["'\s]+(?:,["'\s]+([^"'\s]+)["'\s]+)?\)/g,
    buildFilter: p => !p || /^(src|demo|preact|index\.html)/.test(p),
    middlewares: [
        require('./serve/fixedBuildImport'),
        require('./serve/IndexPage'),
        { middleware: 'typescript', getModuleId }
    ],
    bundles: [
        {
            test: /src\/.*\.[jet]sx?$/,
            dist: 'demo/index.js'
        }, {
            test: /demo\/.*\.[jet]s?$/,
            dist: 'demo/index.js'
        }
    ],
    output: require('path').join(__dirname, './docs')
}
