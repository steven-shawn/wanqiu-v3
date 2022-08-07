<template lang="pug">
div.flex.flex-col.p-4.h-screen.overflow-y-auto.live-process
  div.flex.justify-between.my-3.border.rounded.text-sm.text-blue-600.mx-auto.overflow-hidden.bg-white.flex-shrink-0(style="width: 240px")
    p.flex-1.text-center.py-2(:class="{'bg-blue-600 text-white' : item.active}" v-for="item in tabs" :key="item.id" @click="onTabClick(item)") {{item.text}}
  ul.bg-white.shadow-lg.rounded-md
    li
      div.flex.justify-between.items-center.h-11.px-3
        h1.font-bold.text-sm 百家指数
        span.text-xs.text-gray-600 主要公司
      table.w-full.text-center
       thead
         tr.text-xs.h-9.bg-gray-200
           th.text-black(:class="'w-1/5'") 公司
           th.text-black.font-thin 主
           th.text-black.font-thin 初
           th.text-black.font-thin 客
           th.text-black.font-thin 主
           th.text-black.font-thin 即
           th.text-black.font-thin 客
       tbody.text-xs
         tr.h-9(v-for="(item, index) in 10" :key="item" :class="{'bg-gray-200': index % 2 === 1 }")
           td 百家乐
           td 1
           td 2
           td 3
           td 4
           td 5
           td 6
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// tab切换
const tabs = ref([
    { id: 1, text: '让球', active: true },
    { id: 2, text: '欧赔', active: false },
    { id: 3, text: '大小球', active: false }
])

const onTabClick = item => {
    tabs.value.map(val => {
        val.active = val.id === item.id
    })
}

</script>


<style scoped lang="sass">
.h-screen
    margin-top: -296px
    padding-top: 296px
</style>