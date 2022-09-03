/**
 * 比分相关
 */
 import { _league } from '@/service/modules/score.api'
const SET_LEGUES = 'SET_LEGUES'
const SET_CHECKED = 'SET_CHECKED'
const scoreStore = {
    namespaced: true,
    state: {
        leagues: {}, // 联赛id
        inited: false, // 是否调用过
        checked: [], // 选中的联赛id
        checked_schdules: [], // 赛程选中
    },
    mutations: {
        [SET_LEGUES](state:any, leagues: any) {
            state.leagues = leagues
        },
        [SET_CHECKED](state:any, checked: Array<string> | Object) {
            if (Array.isArray(checked)) {
                state.checked = checked
            } else {
                state.checked_schdules = checked.value
            }
            
        }
    },
    actions: {
        async [SET_LEGUES]({ commit, state }) {
            if (!state.inited) {
                const data = await _league()
                commit(SET_LEGUES, data)
                state.inited = true
            }
        }
    }
}

export {
    SET_LEGUES,
    SET_CHECKED
}
export default scoreStore