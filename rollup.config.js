const typescript = require('rollup-plugin-typescript2')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const { join } = require('path')

module.exports = {
    input: 'src/index.ts',
    plugins: [
        typescript({
            tsconfig: join(__dirname, './tsconfig.es5.json')
        }),
        nodeResolve(),
        commonjs()
    ],
    external: ['preact', 'ipreact'],
    onwarn: function (warning) {
        switch (warning.code) {
            case 'THIS_IS_UNDEFINED': return
        }
        console.warn(warning.message)
    },
    output: {
        name: 'BulmaPreact',
        globals: {
            preact: 'Preact',
            ipreact: 'IPreact'
        },
        file: 'dist/bulma-preact.js',
        sourcemap: 'dist/bulma-preact.js.map',
        format: 'umd',
        banner: `
/**
 * @name bulma-preact
 * @version ${require('./package.json').version}
 */
`
    }
}