/**
 * 动态引入图片
 * @param path 路劲，必须是全路劲
 * @returns 
 */
export const $require = (path: string) => {
    return new URL(`../${path}`, import.meta.url).href
}

export default {
    $require
}