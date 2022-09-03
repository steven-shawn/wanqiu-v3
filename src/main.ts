import { createApp } from 'vue'

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

createApp(App).use(store).use(Vant).use(router).mount('#app')
