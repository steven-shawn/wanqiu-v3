<template lang="pug">
div.pb-20.pt-11.bg-gray-100.h-full 
  jq-header.fixed 消息中心
  div.px-4
    ul.flex.flex-col.mt-2
        li.flex.justify-between.items-center.bg-white.mb-2.rounded.shadow-lg.px-4.py-3(v-for="item in 10" :key="item" @click="onItemClick(item)")
            div.text-sm
               div.mb-1 恭喜您升级到14
               div.text-gray-600.text-sm 2022-03-04 22:27:40
            div
               van-icon.text-gray-600(name="arrow")
</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 列表数据
const list = ref([
  { id: 1, icon: '', placeholder: '请输入新的登录密码', router: '/my/setting-changepwd' },
  { id: 2, icon: '', placeholder: '请再次输入新登录密码', router: '' },
  { id: 3, icon: '', placeholder: '请输入验证码', router: '/my/setting-about' },
])

// 点击跳转详情
const onItemClick = item => {
    router.push(`/my/message-detail?id=${item.id}`)
}

</script>
