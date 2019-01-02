const { argv } = process
const build = ({
    build: !0,
    docs: !0
})[argv[argv.length - 1]]

module.exports = {
    livereload: !build,
    build,
    gzip: true,
    buildFilter: p => !p || /^(src|index|README)/.test(p),
    middlewares: [
        // { middleware: 'template', test: /\.(md|html)$/ },
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
    output: require('path').join(__dirname, './docs')
}
