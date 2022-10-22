const SET_ROOM_ID = 'SET_ROOM_ID'
const ROOM_ID = '__ROOM_ID__'
const SET_NOBLE = 'SET_NOBLE'
const SET_GIFT_LIST = 'SET_GIFT_LIST'
const SET_SERVICE_LINK = 'SET_SERVICE_LINK'

import { _getNoble, _giftList, _getServiceLink } from "@/service/modules/live.api"

const liveStore = {
    namespaced: true,
    state: {
        room_id: localStorage.getItem(ROOM_ID) || '', // 房间id
        nobles: {}, // 贵族列表(由数组转成对象)
        giftList: [],
        giftObj: {},
        serviceLink: '' // 客服链接
    },
    mutations: {
        [SET_ROOM_ID](state:any, id: number) {
            state.room_id = id
            localStorage.setItem(ROOM_ID, id + '')
        },
        [SET_NOBLE](state: any, list: Object) {
            state.nobles = list
        },
        [SET_GIFT_LIST](state: any, list: Array<Object>) {
            state.giftList = list
            const giftObj = {}
            list.map(item => {
                giftObj[item.giftName] = item
            })
            state.giftObj = giftObj
        },
        [SET_SERVICE_LINK](state:any, link: string) {
            state.serviceLink = link
        }
    },
    actions: {
        async [SET_NOBLE]({ commit, state }) {
            if (!Object.keys(state.nobles).length) {
                const data = await _getNoble()
                const ArrayToObjeject = {}
                data.map(item => {
                    ArrayToObjeject[item.gradeNum] = item
                })
                commit(SET_NOBLE, ArrayToObjeject)
            }
        },
        async [SET_GIFT_LIST]({ commit, state }) {
            if (!state.giftList.length) {
                const data = await _giftList()
                commit(SET_GIFT_LIST, data)
            }
        },
        async [SET_SERVICE_LINK] ({ commit, state}) {
            if (!state.serviceLink) {
                const data = await _getServiceLink()
                // const current = data.find(item =>  item.linkType / 1 === 2)
                // if (current) {
                //     commit(SET_SERVICE_LINK, current.linkAddress)
                // }
                if (data) {
                    commit(SET_SERVICE_LINK, data.linkAddress)
                }
            }
        }
    }
}

export {
    SET_ROOM_ID
}
export default liveStore