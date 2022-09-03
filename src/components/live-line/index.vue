<template lang="pug">
div.flex.flex-col.py-4.h-screen.overflow-y-auto.live-line
  div.rounded-lg.shadow-lg.mt-4.text-xs.text-white.bg-green.relative
    div.h-11.flex.justify-between.items-center.px-2.rounded-t-md.font-bold.border-b.bg-white.text-black 首发阵容
    div.h-11.flex.justify-between.items-center.px-2.rounded-t-md.absolute.w-full.top-14
      div
        div.flex.bg-shadow
          span.block.w-5.h-5.mr-1.bg-none
            img(:src="info.homeLogo")
          span.text-sm {{info.homeChs}}
        div.flex.flex-col
          span 阵型: {{state.lines.homeArray || '--'}}
          span 教练: {{state.info.homeCoachCn}}
      div.flex.flex-col
        span 主裁判: {{state.info.nameChs || '--'}} 
        span 地点: {{state.info.locationCn || '--'}}      
    div.w-full.px-2.h-403-px.flex.flex-col.justify-around.relative.py-2.box-border(style="height: 355px")
      ul.flex.justify-center(v-for="(item, index) in state.lines.homeLineup" :key="index" style="height: 50px")
       li.flex.flex-col.justify-center.items-center.text-center(v-for="_item in item" :key="_item" :class="'w-1/5'")
         span.block.w-8.h-8.rounded-full.flex-shrink-0.bg-white.relative
          img.rounded-full(src="@/assets/logo.png")
          span.block.rounded-full.bg-white.w-4.h-4.absolute.top-0.left-0.text-primary(:class="'-translate-x-1/2 -translate-y-1/2'") {{_item.number}}
         span.text-xs.break-words.overflow-clip {{_item.nameChs}}
      div.text-opacity-80.text-xs.absolute.left-2.bottom-1 阵容胜率：{{state.info.homeRate || '--'}}  
    div.w-full.px-2.h-403-px.flex.flex-col.justify-around.relative.py-2.box-border
      div.text-opacity-80.text-xs.absolute.left-2.top-1 阵容胜率：{{state.info.awayRate || '--'}} 
      ul.flex.justify-center(v-for="(item, index) in state.lines.awayLineup" :key="index" style="height: 50px")
       li.flex.flex-col.justify-center.items-center.text-center(v-for="_item in item" :key="_item" :class="'w-1/5'")
         span.block.w-8.h-8.rounded-full.flex-shrink-0.bg-white.relative.rounded-full.w-4.h-4
          img.rounded-full(src="@/assets/logo.png")
          span.block.rounded-full.bg-grey-light.w-4.h-4.absolute.top-0.left-0.text-white.mt-2(:class="'-translate-x-1/2 -translate-y-1/2'") {{_item.number}}
         span.text-xs.break-words.overflow-clip {{_item.nameChs}}     
    div.h-11.flex.justify-between.items-center.px-2.rounded-b-md.absolute.bottom-6
      div
        div.flex.bg-shadow
          span.block.w-5.h-5.mr-1
            img(:src="info.awayLogo")
          span.text-sm {{info.awayChs}}
        div.flex.flex-col
          span 阵型: {{state.lines.awayArray || '--'}}
          span 教练: {{state.info.awayCoachCn || '--'}}
  div.rounded-lg.shadow-lg.mt-4.bg-white.text-xs
    div.h-11.flex.justify-between.items-center.px-2.rounded-t-md.font-bold.border-b 替补阵容
    div.flex
      ul.flex-1
        li.flex.items-center.border-b.h-9.bg-grey.px-2
          span.block.w-5.h-5.mr-2
            img(:src="info.homeLogo")
          span {{info.homeChs}}
        li.border-b.h-11.flex.items-center.mx-2(v-for="item in state.lines.homeBackup")
          //- span.bg-black.text-white.rounded-full.w-5.h-5.text-center.mr-2.flex.items-center.justify-center {{item.number}}
          span.block.w-8.h-8.rounded-full.home-bg.text-xs.flex.justify-center.items-center.text-white {{item.number}}
          span.ml-2.text-xs {{item.nameChs}}
      ul.flex-1
        li.flex.items-center.border-b.h-9.bg-grey.px-2
          span.block.w-5.h-5.mr-2
            img(:src="info.awayLogo")
          span {{info.awayChs}}
        li.border-b.h-11.flex.items-center.mx-2(v-for="item in state.lines.awayBackup")
          //- span.bg-black.text-white.rounded-full.w-5.h-5.text-center.mr-2.flex.items-center.justify-center {{item.number}}
          span.block.w-8.h-8.rounded-full.away-bg.text-xs.flex.justify-center.items-center.text-white {{item.number}}
          span.ml-2.text-xs {{item.nameChs}} 

</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import {_lineup, _lineInfo } from '@/service/modules/live.api'

const props = defineProps(['info'])

const state = reactive({
  lines: {},
  info: {}
})

onMounted(() => {
  _lineup(props.info.matchId).then(data => {
    state.lines = data
  })
  _lineInfo(props.info.matchId).then(data => {
    state.info = data
  })
})

</script>



<style scoped lang="sass">
.h-403-px
  height: 403px
  // border: 1px solid blue  
.bg-shadow
  width: 138px
  height: 26px
  margin: 0 4px 2px 0
  padding: 3px 44px 3px 8px
  border-radius: 13px
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%)
.home-bg
  background: url('./home-bg@2x.png') no-repeat center center
  background-size: 100%
.away-bg
  background: url('./away-bg@2x.png') no-repeat center center
  background-size: 100%   
.bg-green
  background: #4b8135  
.h-screen
    margin-top: -296px
    padding-top: 296px
.bg-green
  background: #4b8135 url('./bg@2x.png') no-repeat center center
  background-size: 100% 100%
  height: 850px   
</style>