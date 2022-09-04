import request from '@/service/request'
import { DEFAULT_PAGE_SIZE } from '@/config/system.conf'



//  -----  搜索

/**
 * 快捷列表
 * @returns 
 */
export const _quickList = (limit:number = DEFAULT_PAGE_SIZE) => {
    return request({
        url: '/pc/mainSearch/queryQuickTitle',
        method: 'GET',
        params: {
            limit
        }
    })
}

/**
 * 查询列表(赛程，比分)
 * @param queryStr
 * @returns 
 */
export const _searchList = (queryStr: string, current:number = 1, size: number = DEFAULT_PAGE_SIZE) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/pc/mainSearch/queryEsWqScheduleList', // /pc/mainSearch/queryStuStodioList
            method: 'GET',
            params: {
                queryStr,
                pageSize: DEFAULT_PAGE_SIZE,
                size,
                current
            }
        }).then(data => {
            const { list = [] } = data || {}
            resolve(list)
        })
    }) 
    
}

/**
 * 搜索主播
 * @param queryStr 
 * @param current 
 * @param size 
 * @returns 
 */
export const _searchArchor = (queryStr: string, current:number = 1, size: number = DEFAULT_PAGE_SIZE) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/pc/mainSearch/queryStuStodioList',
            method: 'GET',
            params: {
                queryStr,
                size,
                current
            }
        }).then(data => {
            const { list = [] } = data || {}
            resolve(list)
        })
    }) 
    
}

/**
 * 推荐搜索
 * @param searchWord 
 * @param current 
 * @param size 
 * @returns 
 */
export const _searchRcommend = (searchWord: string, current:number = 1, size: number = DEFAULT_PAGE_SIZE) => {
    return new Promise((resovle,reject) => {
        request({
            url: '/pc/league/pageRecommendLeagueInfo',
            method: 'GET',
            params: {
                searchWord,
                current,
                size
            }
        }).then(data => {
            const { records = []} = data || {}
            resovle(records)
        })
    })
    
}