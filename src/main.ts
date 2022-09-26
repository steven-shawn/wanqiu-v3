import { createApp } from 'vue'

// tailwind
import '@/assets/style/index.scss'
import '@/assets/style/tailwind-extends.scss' // TODO: 抽取到index.scss中

// store
import store from '@/store'

// router
import router from '@/router'

// vant
import Vant, { Notify } from 'vant'
import 'vant/lib/index.css'

// plugins
// import '@/plugins'

// Root component
import App from './App.vue'


const app = createApp(App) 
app.directive('waiting', { // 敬请期待
    beforeMount(el) {
        el.removeEventListener('click', ()=>{}, true) // 移除，在捕获阶段就要移除
        el.addEventListener('click', (e: Event) => { // 重新添加
            e.preventDefault()
            e.stopPropagation()
                Notify({type: 'primary', message: '敬请期待'})
        },true)
    },
    unmounted(el) {
        el.removeEventListener('click', ()=>{})
    }
})

app.directive('auth', { // 登陆检查
    beforeMount(el) {
        el.removeEventListener('click', ()=>{}, true) // 移除，在捕获阶段就要移除
        el.addEventListener('click', (e: Event) => { // 重新添加
            e.preventDefault()
            e.stopPropagation()
            if (!store.state.user.userInfo.access_token) {
                router.push('/login')
            }
        }, true)
    },
    unmounted(el) {
        el.removeEventListener('click', ()=>{})
    }
})

app.use(store).use(Vant).use(router).mount('#app')