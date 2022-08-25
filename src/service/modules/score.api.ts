import request from '@/service/request'
import { DEFAULT_PAGE_SIZE } from '@/config/system.conf'

/** -=========== 比分相关接口 ================== */

/**
 * 获取比分列表
 * @returns
 */
 export const _getScoreList = (data = {}) => {
    return new Promise((resolve, reject) => {
        return request({
            url: '/pc/score/queryScoreInfoList',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                ifFirstLevel: data.ifFirstLevel || 1, // 1筛选1级，0 所有
                leagueIds: data.leagueIds || '',
                dataType: data.dataType || 'f',
                matchStateStr: data.matchStateStr,
                uuid: new Date().getTime() + Math.floor(Math.random() * 1000000)
            }
        }).then(data => {
            resolve(data || [])
        })
    })
}

export const _focusList = (dataType = 'f') => {
    return new Promise((resolve, reject) => {
        request({
            url: '/pc/score/pageFoucusScheduleList',
            method: 'GET',
            params: {
                dataType
            }
        }).then(data => {
            resolve(data.records)
        })
    })
}

/**
 * 关注 / 取消关注
 * @returns 
 */
export const _focus = (competitionId: number, method: string = 'POST') => { // 1关注，0取消关注
    return request({
        url: '/pc/usrfucosmatch',
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            competitionId
        }
    })
}