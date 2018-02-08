module.exports = conf => ({
    onRoute: pathname => /\/$|^$/.test(pathname) ? pathname + 'index.html' : pathname
})