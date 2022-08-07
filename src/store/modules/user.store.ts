import { USER_INFO } from "@/config/system.conf"
import { SET_INFO, SET_BANNER } from "@/store/types.store"
import { _banners } from '@/service/modules/user.api'
/**
 * 用户模块,存放用户信息等
 */
const userStore = {
    state: {
        userInfo: JSON.parse(localStorage.getItem(USER_INFO)  || "{}"),
        banners: []
    },
    mutations: {
        [SET_INFO](state:any, info: any) {
            state.userInfo = info
            localStorage.setItem(USER_INFO, JSON.stringify(info))
        },
        [SET_BANNER](state: any, banners: any) {
            state.banners = banners
        }
    },
    actions: {
        async [SET_BANNER]({ commit, state }) { // 设置banner
            let data = state.banners
            if (!data || !data.length) {
                data = await _banners()
                const { list } = data
                if (list && list.length) {
                    data = list
                }
            }
            commit(SET_BANNER, data)
        }
    }
}


export default userStore