// TODO: 废气
function set(key:string, value:any) {
    localStorage.setItem(key, value)
}

function get(key: string) {
    localStorage.getItem(key)
}

function remove(key: string) {
    localStorage.removeItem(key)
}