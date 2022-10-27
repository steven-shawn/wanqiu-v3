import { createApp } from 'vue'
// import { IOS_DOWNLOAD_URL, SERVICE_URL } from '@/config/system.conf'
import { Loading, Notify, Dialog } from 'vant'
import { _getDownloadUrl } from '@/service/modules/user.api'
import { APP_NAME } from '@/config/system.conf'

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
            Dialog.confirm({
                title: '',
                cancelButtonText: '关闭',
                // showCancelButton: false,
                message: `下载${APP_NAME}体育APP\n更多精彩内容体验`,
                beforeClose: (action) => {
                    if (action === 'confirm') { // 确定
                        _getDownloadUrl().then(url => {
                            Dialog.close()
                            window.location.href = url
                        })
                    } else { // 取消
                        Dialog.close()
                    }
                },
            })
        },true)
    },
    unmounted(el) {
        el.removeEventListener('click', ()=>{})
    }
})

app.use(store).use(Vant).use(router).mount('#app')
