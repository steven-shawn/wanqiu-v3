<template lang="pug">
div.pb-20.pt-11.bg-gray-100.h-full 
  jq-header.fixed 设置
  div.px-4.py-4
    ul.flex.flex-col
        li.h-10.bg-white.mb-2.shadow-lg.rounded-lg.flex.justify-between.items-center.px-4(v-for="item in list" :key="item.id" @click="onRoute(item)")
            span.text-xs {{item.title}}
            van-icon.text-gray-600(name="arrow")
    button.h-10.bg-primary.w-full.rounded.mt-2.text-white.text-xs 退出登录        
</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 列表数据
const list = ref([
  { id: 1, icon: '', title: '登录密码', router: '/my/setting-changepwd' },
  { id: 2, icon: '', title: '检查更新', router: '' },
  { id: 3, icon: '', title: '关于我们', router: '/my/setting-about' },
  { id: 4, icon: '', title: '清除缓存', router: '' }
])

// 点击跳转的or 其他业务逻辑
const onRoute = item => {
    if (item.router) {
        router.push(item.router)
    }
}

</script>
