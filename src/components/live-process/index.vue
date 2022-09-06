<template lang="pug">
div.flex.flex-col.py-4.h-screen.overflow-y-auto.live-process
  div.bg-white.rounded-md.shadow-lg.w-full.px-4.pb-4.mt-4
    div.flex.justify-between.border-b.items-center.h-12
      div.flex.items-center
        span.block.w-5.h-5
          img(:src="`${props.info.homeLogo}`")
        span.text-xs.ml-2 {{props.info.homeChs}}
      div.flex.flex-row-reverse.items-center
        span.block.w-5.h-5
          img(:src="`${props.info.awayLogo}`")
        span.text-xs.mr-2 {{props.info.awayChs}}  
    div.flex.border-b
      ul.flex.w-full.my-2(v-if="state.circles.length")
        li.flex-1.flex.flex-col.border-r.justify-center.items-center(v-for="item in state.circles" :key="item.dataType")
            h2.text-xs.my-1.text-primary {{item.title}}
            div.flex.justify-between.items-center.mb-1
                p.text-xs {{item.homeData}}
                van-circle.circle.mx-2(v-model:current-rate="item.rate" 
                  layer-color="#072b48" color="#ce1313" :rate="item.rate" :speed="100" :stroke-width="60" size="30px")
                p.text-xs {{item.awayData}}
    div.mt-4(v-for="(item, index) in state.counts" :key="item")            
      div.flex.justify-between.mt-2.items-center
        div.text-xs.text-gray-600.flex-1.text-center {{item.title}}
      div.flex.justify-center.mt-1.overflow-hidden.items-center
        div.flex.items-center
            span.block.w-4.h-4.ml-1.flex.items-center(v-for="(_item, _index) in leftList" :key="_item.id")
              img(:src="getImageUrl(`${_item.img}@2x.png`)" v-if="_item.img && index ===0" class="w-full")
              span.text-xs.text-primary(v-else) {{state.rest[_item._id && index === 1 ? _item._id : _item.id] && state.rest[_item._id && index === 1 ? _item._id : _item.id].homeData || '-'}}
        div.flex-1.h-1.bg-primary.rounded-lg.overflow-hidden.mx-2
            van-progress(:percentage="item.rate" :show-pivot="false" color="#ce1313")            
        div.flex.items-center
          span.block.w-4.h-4.ml-1.flex.items-center(v-for="_item in leftList.slice(0).reverse()" :key="_item.id")
            img(:src="getImageUrl(`${_item.img}@2x.png`)" v-if="_item.img && index === 0" class="w-full")
            span.text-xs.text-primary(v-else) {{state.rest[_item._id && index === 1 ? _item._id : _item.id] && state.rest[_item._id && index === 1 ? _item._id : _item.id].awayData || '-'}} 
  div.bg-white.rounded-md.shadow-lg.w-full.pb-4.mt-4
    h1.h-11.flex.justify-between.items-center.text-xs.text-primary.bg-grey
      p.h-full.flex-1.text-center.leading-10.pt-1(:class="{'active': state.activeTab === 0}" @click="onTab(0)") 文字直播
      p.h-full.flex-1.text-center.leading-10.pt-1(:class="{'active': state.activeTab === 1}" @click="onTab(1)") 重要事件
    div.flex.justify-end.items-center.px-4.py-4.border-b(v-if="state.activeTab === 1")
      span.text-xs.text-primary 只看进球
      van-switch.ml-2(v-model="state.checked" size="15px")
    ul.px-2(:class="state.activeTab === 0 ? 'pt-4': ''")
      template(v-if="state.activeTab === 0")
        li.flex.flex-col.px-4(v-for="item in 10" :key="item")
          div.flex.justify-between.w-full.items-center
            p.flex.items-center
              img.w-3.h-3.mr-2(src="@/assets/logo.png")
              span.text-xs.text-primary 41′ - 第6个进球 - (德牧)  
            img.w-3.h-3(src="@/assets/logo.png")
          p.flex.items-center.border-l.my-1.mx-1.text-xs.text-white text
      template(v-else)
        li.flex.px-4.justify-center.items-center(v-for="(item, index) in 10" :key="item" :class="index === 0 ? 'pt-4': ''")
          p.bg-grey.flex-1.rounded.py-2.flex.items-end.flex-col.px-2(class="w-11/12" :class="{'invisible': item % 2 === 0}")
            span.text-xs.text-primary 0-1
            img.w-4.h-4(src="@/assets/logo.png")
          p.line.mx-2 7'
          p.bg-grey.flex-1.rounded.py-2.flex.flex-col.px-2(class="w-11/12" :class="{'invisible': item % 2 !== 0 }")
            span.text-xs.text-primary 0-1
            img.w-4.h-4(src="@/assets/logo.png")
  ol.flex.flex-wrap.mt-4.bg-white.p-4
    li.flex.items-center.mb-3(v-for="item in symbols" :key="item.id" :class="'w-1/5'")
      p.w-4.h-4.mr-1
        img(src="@/assets/logo.png")
      p.text-xs.text-primary {{item.text}}   
</template>


<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { IMG_URL } from '@/config/system.conf';
import { _processTech, _getLiveText, _getLiveEvent } from '@/service/modules/live.api'
const props = defineProps({
  info: {}
})


const getImageUrl = (name: string) => {
    return new URL(`./${name}`, import.meta.url).href;
}

const state = reactive({
  circles: [],
  counts: [],
  rest: {},
  activeTab: 0, // tab
  checked: false // switch
})

const leftList = [
  { id: 6, img: 'cornor' },
  { id: 13, img: 'red' },
  { id: 11, img: 'yellow' },
  { id: 4, img: '', _id: 34 }
]

const symbols = [
  { id: 1, text: '进球', img: '1'},
  { id: 2, text: '射正', img: '1'},
  { id: 3, text: '射偏', img: '1'},
  { id: 4, text: '点球', img: '1'},
  { id: 5, text: '点球未进', img: '1'},
  { id: 6, text: '乌龙球', img: '1'},
  { id: 7, text: '助攻', img: '1'},
  { id: 8, text: '角球', img: '1'},
  { id: 9, text: '黄牌', img: '1'},
  { id: 10, text: '红牌', img: '1'},
  { id: 11, text: '换人', img: '1'},
  { id: 12, text: '两黄一红', img: '1'},
  { id: 13, text: 'VAR', img: '1'},
]

const onTab = (type: number) => {
  // if (state.activeTab === type) {
  //   return
  // }
  state.activeTab = type
  if (state.activeTab === 0) {
    _getLiveText(props.info.matchId).then(data => {
      console.log('live text', data)
    })
  } else {
    _getLiveEvent(props.info.matchId).then(data => {
      console.log('evt', data)
    })
  }
}

onMounted(() => {
  _processTech(props.info.matchId).then(result => {
    state.circles = result.circles
    state.counts = result.counts
    state.rest = result.rest
  })
  onTab(0)
})

</script>


<style lang="sass">
.live-process
  .left
    .van-progress__portion
       position: relative
</style>
<style scoped lang="sass">
p
  &.active
    background: url('./title-active@2x.png') no-repeat center bottom
    background-size: 100% 100%
  &.line
    &:before, &:after
      content: ''
      display: block
      width: 1px
      height: 1rem
      background: #edf0f2
      margin: 0 auto  
.h-screen
    margin-top: -296px
    padding-top: 296px
.circle
   width: 32px
   height: 32px
</style>
