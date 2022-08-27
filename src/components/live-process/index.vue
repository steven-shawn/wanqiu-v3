<template lang="pug">
div.flex.flex-col.p-4.h-screen.overflow-y-auto.live-process
  div.bg-white.rounded-md.shadow-lg.w-full.px-4.pb-4.mt-4
    div.flex.justify-between.border-b.items-center.h-12
      div.flex.items-center
        span.block.w-5.h-5.bg-red-600
        span.text-xs.ml-2 玻璃为何
      div.flex.flex-row-reverse.items-center
        span.block.w-5.h-5.bg-red-600
        span.text-xs.mr-2 阿斯顿发的  
    div.flex.border-b
      ul.flex.w-full.my-2
        li.flex-1.flex.flex-col.border-r.justify-center.items-center(v-for="item in 3" :key="item")
            h2.text-xs.my-1.text-gray-600 进攻
            div.flex.justify-between.items-center.mb-1
                p.text-xs 42
                van-circle.circle.mx-2(v-model:current-rate="currentRate" layer-color="#666" color="red" :rate="30" :speed="100" :stroke-width="20")
                p.text-xs 34
    div.mt-4(v-for="item in 2" :key="item")            
      div.flex.justify-between.mt-2
        div.flex
            span.block.w-4.h-4.bg-red-600.mr-1(v-for="item in 4" :key="item")
        div.text-xs.text-gray-600.flex-1.text-center 射门数
        div.flex
            span.block.w-4.h-4.bg-red-600.ml-1(v-for="item in 4" :key="item")
      div.flex.justify-center.mt-1.rounded-lg.overflow-hidden
        div.flex-1.h-1.bg-gray-600
            van-progress.flex.justify-end.left(:percentage="25" :show-pivot="false")
        div.flex-1.h-1.bg-gray-600.rounded-lg.overflow-hidden
            van-progress(:percentage="75" :show-pivot="false" color="red")            
        div.flex
  div.bg-white.rounded-md.shadow-lg.w-full.px-4.pb-4.mt-4
    h1.h-11.flex.justify-center.items-center.border-b.text-xs 重要事件直播
    ul.px-2.border-b
      li.flex.justify-center.items-center.my-4(v-for="item in 10" :key="item")
        span.flex-1.text-right 1
        span.block.w-6.h-6.border.rounded-full.mx-2
        span.flex-1 2222
    ol.flex.flex-wrap.mt-4
      li.flex.items-center.mb-2(v-for="item in 10" :key="item" :class="'w-1/4'")
        p.w-4.h-4.bg-red-600.mr-2
        p.text-xs 进球      
</template>


<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const currentRate = ref(0)

onMounted(() => {
  // console.log(11111)
})

</script>


<style lang="sass">
.live-process
  .left
    .van-progress__portion
       position: relative
</style>
<style scoped lang="sass">
.h-screen
    margin-top: -296px
    padding-top: 296px
.circle
   width: 32px
   height: 32px
</style>
