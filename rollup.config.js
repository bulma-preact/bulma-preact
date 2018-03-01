const typescript = require('rollup-plugin-typescript2')

module.exports = {
    input: './src/index.ts',
    plugins: [
        typescript()
    ],
    external: ['preact'],
    output: {
        name: 'BumlaPreact',
        globals: {
            preact: 'preact'
        },
        file: './dist/bumla-preact.js',
        sourcemap: './dist/bumla-preact.js.map',
        format: 'umd',
        banner: `
/**
 * @name bumla-preact
 * @version ${require('./package.json').version}
 */
`
    }
}