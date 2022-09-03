import { createStore } from 'vuex'
import user from '@/store/modules/user.store'
import score from '@/store/modules/score.store'
import live from '@/store/modules/live.store'

const store = createStore({
    modules: {
        user,
        score,
        live
    },
    getters: {
        token: state => state.user.userInfo.token,
        info: state => state.user.userInfo,
        banners: state => state.user.banners
    }
})

export default store