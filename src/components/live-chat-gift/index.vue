

<template lang="pug">
div.bg-black.w-full.text-white.rounded-t-xl
  h1.flex.justify-between.px-4.items-center.border-b.h-10(style="border-color: rgba(102, 97, 97,.5)")
    span.flex.h-full.items-center.text-sm.border-b-2 礼物
    span(@click="onClose") x
  ul.flex.justify-between.flex-col.items-center.flex-wrap.h-250.overflow-x-auto.px-2.py-1.my-2
    li.border.flex.flex-col.justify-center.items-center.mr-1.rounded-lg(v-for="item in 17" :key="item" style="width: 88px; height: 116px")
     div.w-12.h-12.rounded-full.border.mb-3
     p.text-xs.text-white {{item}}
     p.text-xs.text-gray-500 1球钻
  div.h-11.flex.justify-between.items-center.bg-gray-600.px-4.text-xs.mx-4.rounded-lg
    p
     span 
     span 球钻0
    p 充值 >                
</template>

<script lang="ts" setup>
import { inject } from 'vue'

const popCtrl =  inject('popCtrl')

const onClose = () => {
    popCtrl.showGift = false
}
</script>


<style scoped lang="sass">
.h-250
  height: 250px
</style>
