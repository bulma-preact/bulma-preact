module.exports = conf => {
    
    return {
        onRoute: pathname => /\/$|^$/.test(pathname) ? pathname + 'index.html' : pathname
    }
}