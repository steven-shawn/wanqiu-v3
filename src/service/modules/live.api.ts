import request from '@/service/request'
import { DEFAULT_PAGE_SIZE } from '@/config/system.conf'

/** -=========== 直播相关接口 ================== */

/**
 * 热门
 * @returns
 */
 export const _hotList = (current: number = 1, size: number = DEFAULT_PAGE_SIZE, all: boolean = false) => {
    return new Promise((resolve, reject) => {
        return request({
            url: '/pc/league/pageHotLeagueInfo',
            method: 'GET',
            params: {
                current,
                size
            }
        }).then(data=> {
            const { records = [], total = 0 } = data
            if (all) {
                resolve({
                    total,
                    records
                })
            } else {
                resolve(records)
            }
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
            const { list = [] } = data
            resolve(list )
        })
    })
}