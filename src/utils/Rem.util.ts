/**
 * 设置页面缩放比例,使其可以适配不同的终端
 */
const setRem = () => {
    // const ww = window.innerWidth
    // const zoom = ww / 375 // set the rate to window and design width
    // const body = document.body || document.documentElement.body
    // body.style.zoom = zoom
}

export const setStyle = () => { // real
    if (window) {
        window.onload = setRem
        window.onresize = setRem
    }
}

export default {
    setStyle
}