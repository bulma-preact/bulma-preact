const { argv } = process
const build = ({
    build: !0,
    docs: !0
})[argv[argv.length - 1]]

module.exports = {
    livereload: !build,
    build,
    gzip: true,
    include: /__include\(["'\s]+([^"'\s]+)["'\s]+(?:,["'\s]+([^"'\s]+)["'\s]+)?\)/g,
    buildFilter: p => !p || /^(src|index|README)/.test(p),
    middlewares: [
        require('./serve/IndexPage'),
        require('./serve/README.md'),
        { middleware: 'rollup', mapConfig (cfg) {
            delete cfg.external
            cfg.output = {
                name: 'BulmaPreact',
                file: 'bulma-preact.standalone.js',
                sourcemap: 'bulma-preact.standalone.js.map',
                format: 'umd'
            }
            return cfg
        } }
    ],
    bundles: [
        {
            test: /(src|demo)\/(?!config).*\.[jet]sx?$/,
            dist: 'demo/config.js'
        }
    ],
    output: require('path').join(__dirname, './docs')
}
