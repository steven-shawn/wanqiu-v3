const SET_ROOM_ID = 'SET_ROOM_ID'
const ROOM_ID = '__ROOM_ID__'
const SET_NOBLE = 'SET_NOBLE'
const SET_GIFT_LIST = 'SET_GIFT_LIST'
import { _getNoble, _giftList } from "@/service/modules/live.api"

const liveStore = {
    namespaced: true,
    state: {
        room_id: localStorage.getItem(ROOM_ID) || '', // 房间id
        nobles: {}, // 贵族列表(由数组转成对象)
        giftList: [],
        giftObj: {}
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
        }
    }
}

export {
    SET_ROOM_ID
}
export default liveStore