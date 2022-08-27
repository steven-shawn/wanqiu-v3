<template lang="pug">
div.flex.flex-col.p-4.h-screen.overflow-y-auto.live-line
  div.rounded-lg.shadow-lg.mt-4.bg-green-600.text-xs.text-white
    div.h-11.flex.justify-between.items-center.bg-green-400.px-2.rounded-t-md
      div.flex
        span.block.w-5.h-5.mr-1.bg-red-600
        span.text-sm 奥术大师所
      div.flex.flex-col
        span 阵型: 4-3-2-1
        span 教练: 发萨达是的是的  
    div.bg-red-600.w-full.px-2.bg(style="height: 500px")
      ul.flex.justify-center(v-for="(item, index) in list" :key="index" style="height: 50px")
       li.flex.flex-col.justify-center.items-center.text-center(v-for="_item in item" :key="_item" :class="'w-1/5'")
         span.block.w-8.h-8.rounded-full.bg-blue-600.flex-shrink-0
         span.text-xs.break-words.overflow-clip 埃尔林·哈兰德
    div.h-11.flex.justify-between.items-center.bg-green-400.px-2.rounded-b-md
      div.flex
        span.block.w-5.h-5.mr-1.bg-red-600
        span.text-sm 奥术大师所
      div.flex.flex-col
        span 阵型: 4-3-2-1
        span 教练: 发萨达是的是的
  div.rounded-lg.shadow-lg.mt-4.bg-white.text-xs
    div.h-11.flex.justify-between.items-center.px-2.rounded-t-md.font-bold.border-b 替补阵容
    div.flex
      ul.flex-1.px-2
        li.flex.items-center.border-b.h-9
          span.block.w-5.h-5.mr-2.bg-red-600
          span 乌拉圭队
        li.border-b.h-11.flex.items-center(v-for="item in 10")
          span.bg-black.text-white.rounded-full.w-5.h-5.text-center.mr-2.flex.items-center.justify-center {{item}}
          span.block.w-8.h-8.bg-red-500.rounded-full
          span.ml-2.text-xs 埃尔林·哈兰德
      ul.flex-1.px-2.bg-gray-100
        li.flex.items-center.border-b.h-9
          span.block.w-5.h-5.mr-2.bg-red-600
          span 乌拉圭队
        li.border-b.h-11.flex.items-center(v-for="item in 10")
          span.bg-black.text-white.rounded-full.w-5.h-5.text-center.mr-2.flex.items-center.justify-center {{item}}
          span.block.w-8.h-8.bg-red-500.rounded-full
          span.ml-2.text-xs 埃尔林·哈兰德 

</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = ref([
    [1],
    [2,3],
    [4,5,6],
    [7,8,9,10],
    [11,12,13,14,15],
    [-11,-12,-13,-14,-15],
    [-7,-8,-9,-10],
    [-4,-5,-6],
    [-2,-3],
    [-1]
])
</script>



<style scoped lang="sass">
.h-screen
    margin-top: -296px
    padding-top: 296px
.bg
  background: url('./bg@2x.png') no-repeat
  background-size: 100%    
</style>