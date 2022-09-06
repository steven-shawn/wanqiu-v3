import request from '@/service/request'
import { DEFAULT_PAGE_SIZE } from '@/config/system.conf'

/** -=========== 直播相关接口 ================== */


export const _focusLive = () => {
    return new Promise((resolve, reject) => {
        request({
            url: '/pc/league/pageFocusLeagueInfo',
            method: 'GET',
            params: {
                size: 5
            }
        }).then(data => {
            const { records = []} = data
            resolve(records)
        })
    })
}

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
 export const _liveList = (matchId:string = '', size: number = 6, all: boolean = false) => {
    return new Promise((resolve, reject) => {
        return request({
            url: '/pc/league/pageCurrentLeagueInfo',
            method: 'GET',
            params: {
                leagueType: 0,
                matchId,
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
 * 获取主播信息
 * @param id 直播间id
 * @returns 
 */
export const _getAnchor = (id: number) => {
    return request({
        url: `/pc/stustudio/stuAnchor/${id}`,
        method: 'GET',
    })
}

/**
 * 关注主播
 * @param memIdentityId 
 * @returns 
 */
export const _followAnchor = (memIdentityId: string) => {
    return request({
        url: `/pc/usrstdref/${memIdentityId}`,
        method: 'POST'
    })
}

/**
 * 获取我关注的主播列表
 * @param current 
 * @param size 
 * @returns 
 */
export const _archorList = (current: number = 1, size: number = DEFAULT_PAGE_SIZE) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/pc/usrstdref/page',
            method: 'GET',
            params: {
                size,
                current
            }
        }).then(data => {
            const { records = [] } = data || {}
            resolve(records)
        })
    }) 
}

/**********  直播间 */

/**
 * 获取直播间信息
 * @param id 
 * @returns 
 */
export const _getLive = (id: number) => {
    return request({
        url: `/pc/stustudio/${id}`,
        method: 'GET'
    })
}

/**
 * 获取礼物
 * @returns
 */
export const _giftList = () => {
    return request({
        url: '/pc/platformpublic/getOpeGiftManage',
        method: 'GET'
    })
}

/**
 * 获取贵族
 * @returns 
 */
export const _getNoble = () => {
    return request({
        url: '/pc/memmemberrelated/getMemNobleGrade',
        method: 'GET'
    })
}

/**
 * 获取会员开通贵族信息
 * @returns 
 */
export const _userNoble = () => {
    return request({
        url: '/pc/memmemberrelated/findMemNoblePropsDTOb',
        method: 'GET'
    })
}

/**
 * 
 * @param propsNum 道具名称
 * @returns 
 */
export const _buyNoble = (propsNum: number) => {
    return request({
        url: '/pc/memmemberrelated/openOrRenewNoble',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            propsNum
        }
    })
}

/**
 * 技术统计
 * @param matchId 
 * @returns 
 */
export const _processTech = (matchId: string) => {
    const result = {
        circles: [],
        counts: [],
        rest: {

        }
    }
    const titleMap = { 44: '危险进攻', 43: '进攻', 14: '控球率', 4: '射正球门', 34: '射偏球门' }
    return new Promise((resovle, reject) => {
        request({
            url: '/pc/feventtechnic/page',
            method: 'GET',
            params: {
                matchId
            }
        }).then(data => {
            data.map(item => {
                if ([43, 44, 14].includes(item.dataType)) {
                  item.rate = (item.homeData / 1) / (item.homeData / 1 + item.awayData / 1) * 100
                  item.title = titleMap[item.dataType + '']
                  result.circles.push(item)
                } else if ([4,34].includes(item.dataType)) {
                  item.rate = (item.homeData / 1) / (item.homeData / 1 + item.awayData / 1) * 100
                  item.title = titleMap[item.dataType + '']
                  result.counts.push(item)
                  result.rest[item.dataType] = item
                } else {
                    result.rest[item.dataType] = item
                }
              })
            resovle(result)
        })
    })
}

/**
 * 获取文字直播
 * @param matchId 
 * @returns 
 */
export const _getLiveText = (matchId: string) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/pc/ftextlive/page',
            method: 'GET',
            params: {
                matchId
            }
        }).then(data => {
            const { records = [] } = data
            resolve(records)
        })
    }) 
}

/**
 * 获取重要事件
 * @param matchId 
 * @returns 
 */
export const _getLiveEvent = (matchId: string, current:number = 1, size:number = DEFAULT_PAGE_SIZE) => {
    return request({
        url: '/pc/score/queryEventInfoList',
        method: 'GET',
        params: {
            matchId,
            size,
            current
        }
    })
}


/**
 * 查询指数信息
 * @returns 
 */
export const _getIndex = (matchId: string) => {
    return request({
        url: '/pc/wqodds/getWqOdds',
        method: 'GET',
        params: {
            matchId
        }
    })
}
/**
 * 阵容
 * @param matchId 
 * @returns 
 */
export const _lineup = (matchId: string) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/pc/wqlineup/getWqLineupByMatchId',
            method: 'GET',
            params: {
                matchId
            }
        }).then(data => {
            let { homeArray, homeLineup, awayLineup, awayArray} = data
            homeArray = homeArray.split('')
            awayArray = awayArray.split('')
            const homeResult = []
            const awayResult = []
            let homeIndex = 0
            let awayIndex = 0
            // 主阵容
            for(let i = 0; i < homeArray.length; i++) {
                console.log(homeIndex, homeArray[i])
                homeResult.push(awayLineup.slice(homeIndex, homeArray[i] / 1 + homeIndex))
                homeIndex += homeArray[i] / 1
                
            }
            // 客阵容
            for(let i = 0; i < awayArray.length; i++) {
                awayResult.push(awayLineup.slice(awayIndex, awayArray[i] / 1 + awayIndex))
                awayIndex += awayArray[i] / 1
            }

            console.log(homeResult)
            data.homeLineup = homeResult.reverse()
            data.awayLineup = awayResult
            data.homeArray = homeArray.join('-')
            data.awayArray = awayArray.join('-')
            resolve(data)
        })
    }) 
}

/**
 * 获取阵容信息
 * @param matchId 
 * @returns 
 */
export const _lineInfo = (matchId: string) => {
    return request({
        url: '/pc/wqlineup/getMatchSpecificInfoDTO',
        method: 'GET',
        params: {
            matchId
        }
    })
}