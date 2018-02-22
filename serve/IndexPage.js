module.exports = conf => ({
    onRoute: pathname => pathname.replace(/^([A-Z]\w+)\/*$|^\/*$/, '$1/index.html')
})