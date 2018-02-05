/**
 * Copy from change
 * https://github.com/JedWatson/classnames/blob/master/index.js
 * @version 34a05a5  on 11 Sep 2017
 */
const classNames = function classNames(...args):string {
    let classes = []
    args.forEach(arg => {
        if (!arg) {
            return
        }
        const argType = typeof arg
        if (argType === 'string' || argType === 'number') {
            classes.push(arg)
        } else if (Array.isArray(arg) && arg.length) {
            let inner = classNames.apply(null, arg)
            if (inner) {
                classes.push(inner)
            }
        } else if (argType === 'object') {
            Object.keys(arg).forEach(key => {
                arg[key] && classes.push(key)
            })
        }
    })
    return classes.join(' ')
}

export default classNames