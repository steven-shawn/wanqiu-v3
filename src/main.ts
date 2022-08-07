import { createApp } from 'vue'

// tailwind
import '@/assets/style/index.css'

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
