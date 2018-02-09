module.exports = conf => ({
    onRoute: pathname => pathname.replace(/(src\/\w+)\/*$|^\/*$/, '$1/index.html')
})