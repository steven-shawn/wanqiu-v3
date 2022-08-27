import request from '@/service/request'
import { DEFAULT_PAGE_SIZE } from '@/config/system.conf'

/**
 * 获取首页热门直播
 * @returns
 */
 export const _hotList = () => {
    return new Promise((resolve, reject) => {
        return request({
            url: '/live/live/hotRoom',
            method: 'POST'
        }).then(data => {
            const { list } = data
            resolve(list || [])
        })
    })
}

/**
 * 正在直播的
 * @param pageNum 页码
 * @param pageSize 页面大小
 * @returns
 */
export const _liveList = (pageNum: Number = 1, pageSize: Number = DEFAULT_PAGE_SIZE) => {
    return new Promise((resolve, reject) => {
        return request({
            url: '/live/live/All',
            method: 'POST',
            data: {
                pageNum,
                pageSize
            }
        }).then(data => {
            const { list } = data
            resolve(list || [])
        })
    })
}