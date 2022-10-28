import request from '@/service/request'
import { DEFAULT_PAGE_SIZE } from '@/config/system.conf'

/** -=========== 比分相关接口 ================== */

/**
 * 获取比分列表
 * @returns
 */
 export const _getScoreList = (data = {}) => {
    return new Promise((resolve, reject) => {
        let startTime:any = ''
        if (data.startTime) {
            startTime = new Date(data.startTime)
            startTime = [startTime.getFullYear(), startTime.getMonth() + 1, startTime.getDate()].join('/')
        }
        return request({
            url: data.startTime ? '/pc/score/pageScheduleList' : '/pc/score/queryScoreInfoList',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                ifFirstLevel: data.ifFirstLevel || 1, // 1筛选1级，0 所有
                leagueIds: data.leagueIds.join(','), // 联赛
                dataType: data.dataType || 'f', // 球类
                matchStateStr: data.matchStateStr, // 状态
                startTime, // 日期
                queryDate: startTime,
                size: 10,
                current: 1,
                // queryStr: '',
                uuid: new Date().getTime() + Math.floor(Math.random() * 1000000)
            }
        }).then(data => {
            resolve(data.records || data || [])
        })
    })
}

/**
 * 获取焦点赛事
 * @param dataType 
 * @returns 
 */
export const _focusList = (dataType = 'f') => {
    return new Promise((resolve, reject) => {
        request({
            url: '/pc/score/pageFoucusScheduleList',
            method: 'GET',
            params: {
                dataType
            }
        }).then(data => {
            const { records = []} = data || {}
            resolve(records)
        })
    })
}

/**
 * 关注 / 取消关注
 * @returns 
 */
export const _focus = (matchId: number, method: string = 'POST') => { // 1关注，0取消关注
    return request({
        url: '/pc/usrfucosmatch',
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            matchId
        }
    })
}

/**
 * 获取联赛信息
 * @param leagueType 
 * @param queryType 
 * @returns 
 */
export const _league = (leagueType: string = '0', queryType: string = '0') => {
    return request({
        url: '/pc/league/query',
        method: 'GET',
        params: {
            leagueType,
            queryType
        }
    })
}