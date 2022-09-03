import { _getBalance } from '@/service/modules/user.api';
import { USER_INFO } from "@/config/system.conf"
import { SET_INFO, SET_BANNER, SET_BALANCE, SET_LOGOUT } from "@/store/types.store"
import { _banners } from '@/service/modules/user.api'
/**
 * 用户模块,存放用户信息等
 */
const userStore = {
    namespaced: true,
    state: {
        userInfo: JSON.parse(localStorage.getItem(USER_INFO)  || "{}"),
        banners: []
    },
    mutations: {
        [SET_INFO](state:any, info: any) {
            state.userInfo = {...state.userInfo, ...info}
            localStorage.setItem(USER_INFO, JSON.stringify(state.userInfo))
        },
        [SET_BANNER](state: any, banners: any) {
            state.banners = banners
        },
        [SET_LOGOUT] (state:any) {
            state.userInfo = {}
            localStorage.setItem(USER_INFO, JSON.stringify({}))
        }
    },
    actions: {
        // async [SET_BANNER]({ commit, state }) { // 设置banner  没有用到
        //     let data = state.banners
        //     if (!data || !data.length) {
        //         data = await _banners()
        //         const { list } = data
        //         if (list && list.length) {
        //             data = list
        //         }
        //     }
        //     commit(SET_BANNER, data)
        // },
        async [SET_BALANCE]({commit}) { // 设置余额
            const data = await _getBalance()
            const { diamond } = data
            commit(SET_INFO, {diamond})
        }
    }
}


export default userStore