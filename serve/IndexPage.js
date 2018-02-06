module.exports = conf => ({
    onRoute: pathname => /^[\w\-\/]*$/.test(pathname) ? 'index.html' : pathname
})