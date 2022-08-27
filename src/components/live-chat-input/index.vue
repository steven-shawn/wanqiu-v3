<template lang="pug">
div.h-11.flex.bg-white.w-screen.justify-between.items-center.px-3.fixed.bottom-0
    div.flex.flex-1.bg-gray-200.h-9.mr-2.rounded.items-center.justify-between
        span.block.w-4.h-4.bg-red-600.mx-2
        p.flex.flex-1.items-center
          input.block.w-4.h-4.bg-transparent.flex-1.h-9.text-xs(placeholder="发弹幕,参与互动")
          span.block.w-4.h-4.bg-blue-600.ml-2
        span.block.w-4.h-4.bg-red-600.mx-2
    div.w-8.h-8.rounded-full.mr-2(@click="onShowNoble")
      img(src="./icon_noble@2x.png")
    div.w-8.h-8.rounded-full
      img(src="./icon_pok@2x.png")
    div.w-8.h-8.rounded-full.ml-2(@click="onShowGift")
      img(src="./icon_gift@2x.png")

</template>

<script lang="ts" setup>
// import { PopCtrl } from '@/types/live.type'

import { inject } from 'vue'


const popCtrl =  inject('popCtrl')

// 通知父组件
const emits = defineEmits(['e-show-noble'])

// 点击显示贵族
const onShowNoble = () => {
  popCtrl.showNoble = true
  emits('e-show-noble')
}

// 点击显示礼物界面
const onShowGift = () => {
  popCtrl.showGift = true
}

</script>
