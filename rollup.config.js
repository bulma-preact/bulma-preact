export default {
    input: './lib/index.js',
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