module.exports = conf => {
    return conf.build ? {
        onSet(pathname, data) {
            if (/demo\/index/.test(pathname)) {
                return data.toString().replace('../src/index', 'src/index')
            }
        },
        setBefore: 0
    } : {}
}