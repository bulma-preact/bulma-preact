require.config({
    baseUrl: '<%-conf.build ? "/bulma-preact/" : "/"%>',
    paths: {
        'preact': 'demo/preact'
    }
})
define('bulma-preact', ['src/index'], m => m)