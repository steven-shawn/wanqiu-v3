import request from '@/service/request'
import { DEFAULT_PAGE_SIZE } from '@/config/system.conf'

/** -=========== 直播相关接口 ================== */

/**
 * 热门
 * @returns
 */
 export const _hotList = (size: number = 6) => {
    return new Promise((resolve, reject) => {
        return request({
            url: '/pc/league/pageHotLeagueInfo',
            method: 'GET',
            params: {
                size
            }
        }).then(data=> {
            console.log(data)
            const { records } = data
            resolve(records || [])
        })
    })
}


/**
 * 直播
 * @returns
 */
 export const _liveList = (size: number = 6) => {
    return new Promise((resolve, reject) => {
        return request({
            url: '/pc/league/pageCurrentLeagueInfo',
            method: 'GET',
            params: {
                size
            }
        }).then(data=> {
            console.log(data)
            const { list } = data
            resolve(list || [])
        })
    })
}