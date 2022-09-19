import { createApp } from 'vue'
import { getOS } from '@/utils'
import { IOS_DOWNLOAD_URL, SERVICE_URL } from '@/config/system.conf'
import { Notify } from 'vant'

// tailwind
import '@/assets/style/index.scss'
import '@/assets/style/tailwind-extends.scss' // TODO: 抽取到index.scss中

// store
import store from '@/store'

// router
import router from '@/router'

// vant
import Vant from 'vant'
import 'vant/lib/index.css'

// plugins
// import '@/plugins'

// Root component
import App from './App.vue'

const app = createApp(App) 
app.directive('download', {
    beforeMount(el) {
        el.removeEventListener('click', ()=>{}, true) // 移除，在捕获阶段就要移除
        el.addEventListener('click', (e: Event) => { // 重新添加
            e.preventDefault()
            e.stopPropagation()
            const os = getOS()
            if (os.isPhone) { // iphone 
                window.location.href = IOS_DOWNLOAD_URL
            } else { // 其他
                Notify({type: 'danger', message: '目前只支持ios客户端下载'})
            }
        },true)
    },
    unmounted(el) {
        el.removeEventListener('click', ()=>{})
    }
})

app.use(store).use(Vant).use(router).mount('#app')
