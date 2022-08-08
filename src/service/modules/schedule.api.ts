import request from '@/service/request'
import { DEFAULT_PAGE_SIZE } from '@/config/system.conf'

/** -=========== 日程相关接口 ================== */

/**
 * 获取比分列表
 * @returns
 */
 export const _getScoreList = (queryStr: string = '0') => {
    return new Promise((resolve, reject) => {
        return request({
            url: '/pc/score/pageSchedulDTOList',
            method: 'POST',
            Host: 'http://xqadminapi.tyltxt.com',
            data: {
                queryStr
            }
        }).then(data => {
            console.log(data)
            const { list } = data
            resolve(list || [])
        })
    })
}