import { createStore } from 'vuex'
import user from '@/store/modules/user.store'

const store = createStore({
    modules: {
        user
    },
    getters: {
        token: state => state.user.userInfo.token,
        info: state => state.user.userInfo,
        banners: state => state.user.banners
    }
})

export default store