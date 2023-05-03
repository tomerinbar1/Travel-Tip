export const utils = {
    makeId,
    getTime,
}

function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function getTime() {
    const currDate = new Date().toJSON().slice(0,10).replace(/-/g,'/')
    return currDate
}