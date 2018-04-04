const PROPS = {
    y: d => d.getFullYear(),
    Y: d => d.getFullYear(),
    M: d => d.getMonth() + 1,
    d: d => d.getDate(),
    h: d => d.getHours() % 12,
    H: d => d.getHours(),
    m: d => d.getMinutes(),
    s: d => d.getSeconds()
}
const toFixed = (n, l) => ('00' + n).slice(-2)
const REG = new RegExp(`([${Object.keys(PROPS).join('')}])(?:\\1|\\b)`, 'g')

export const format = (d:Date, fmt?:string) => (fmt || 'Y-MM-dd HH:mm:ss').replace(REG, function (kk, k) {
    const show = PROPS[k](d)
    if (kk !== k) {
        return toFixed(show, 2)
    }
    return show
})
