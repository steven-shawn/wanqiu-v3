import request from '@/service/request'
import { DEFAULT_PAGE_SIZE } from '@/config/system.conf'

/** -=========== 日程相关接口 ================== */

/**
 * 获取比分列表
 * @returns
 */
 export const _getScoreList = (form = {}) => {
    let day = new Date(form.queryDate)
    day = [day.getFullYear(), (day.getMonth() + 1 + '').padStart(2, '0'), (day.getDate() + '').padEnd(2, '0')]
    console.log(form)
    return new Promise((resolve, reject) => {
        return request({
            url: '/pc/score/pageSchedulDTOList',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                matchStateStr: form.matchStateStr, // 比赛状态 0 进行中、1 未开始、2 已完成、3 异常,
                leagueIds: form.leagueIds.join(',') || '',
                dataType: form.dataType || 'f', // f 足球 b 篮球 f 足球 b 篮球
                queryDate: day.join('-'), // yyyy-mm-dd
                isHot: form.isHot || 0, //  0 否 1 是
                current:  form.current || 1,
                size: form.size
            }
        }).then(data => {
            console.log(data)
            if (data) {
                const { records = [] } = data
                resolve(records)
            } else {
                resolve([])
            }
        })
    })
}