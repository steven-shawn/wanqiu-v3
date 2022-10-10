<template lang="pug">
div.pb-20.pt-11.bg-gray-100.h-full 
  jq-header.fixed 关于我们
  div.px-4.py-4
    div.flex.flex-col.justify-center.items-center
        div.w-24.h-24.rounded-full.bg-red-600
        p.text-gray-600.my-2.text-xs {{APP_NAME}} V 1.0.0
    div.h-10.bg-white.mb-2.shadow-lg.rounded-lg.flex.justify-between.items-center.px-4
        span.text-xs 版本信息
        span.text-xs V 1.0.0
    div.flex.flex-col.absolute.bottom-4.text-xs
        div.flex.justify-center.w-full
            span.text-blue-600 用户协议
            span.mx-1 |
            span.text-blue-600 隐私政策
        div.text-gray-600.mt-1 版权所有 {{APP_NAME}}体育 2022            
</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'
import { APP_NAME } from '@/config/system.conf'
</script>

<style scoped lang="sass">
.bottom-4
    left: 50%
    transform: translateX(-50%)
</style>
