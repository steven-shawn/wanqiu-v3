<template lang="pug">
div.pb-20.pt-11.bg-gray-100.h-full 
  jq-header.fixed 修改登录密码
  div.px-4.py-4
    ul.flex.flex-col
        li.h-10.bg-white.mb-2.shadow-lg.rounded-lg.flex.justify-between.items-center.px-4(v-for="item in list" :key="item.id")
            input.text-xs(:placeholder="item.placeholder")
    button.h-10.bg-red-600.w-full.rounded.mt-2.text-white.text-xs 确认设置        
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

</script>
