<template lang="pug">
div.m-4.p-4.bg-black.h-240.rounded-lg.text-white.flex.flex-col.justify-between
  div.flex.items-center
    div.h-14.w-14.rounded-full.bg-red-600.mr-4
    div.flex.flex-col
      p.text-base.mb-1.font-bold 伟所说求
      p.flex.mt-1.items-center 
        span.block.w-12.h-4.bg-red-600
        span.text-xs.mx-1 正在直播
        span.block.w-3.h-3.bg-red-600
  div.relative.sign.-top-8
    p.w-4.h-12.bg-yellow-600.rounded-l-md.absolute.right-0.-top-1
    p.absolute.right-0.h-10.w-auto.bg-white.rounded.text-black.text-xs.pr-4.pl-1.flex.items-center 阿萨达as是地方发的阿萨达as是地方发的阿萨达as是地方发的阿萨达as是地方发的
    p.absolute.w-3.h-8.bg-yellow-600.rounded-l-md.right-0.top-1
  div.text-xs
    div.flex.justify-between
      span.mb-1
        span
        span 关注: 12
      span.text-yellow-400 专业主播
    div
      span
      span 热度: 568442.12 
</template>

<style scoped lang="sass">
.h-240
  height: 240px
.sign
  transform: translateX(16px)
</style>

<script lang="ts" setup>
import { onMounted } from 'vue'
onMounted(() => {
  // console.log(111111)
})
</script>
