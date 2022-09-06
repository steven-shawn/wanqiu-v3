<template lang="pug">
div.flex.flex-col.py-4.h-screen.overflow-y-auto.live-process.bg-white-light
  div.flex.justify-between.text-sm.overflow-hidden.flex-shrink-0
    p.flex-1.text-center.py-3.pt-4.box-border.text-primary(:class="{'active text-black' : item.active}" 
    v-for="(item, index) in state.tabs" :key="item.id" @click="onTabClick(item, index)") {{item.text}}
  ul.bg-white.shadow-lg.rounded-md
    li
      //div.flex.justify-between.items-center.h-11.px-3
        h1.font-bold.text-sm 百家指数
        span.text-xs.text-gray-600 主要公司
      table.w-full.text-center
       thead
         tr.text-xs.h-9.bg-gray-200
           th.text-black(:class="{'w-1/5': index === 0, 'text-white-light': item.invisible}" 
           v-for="(item, index) in state.tabs[state.activeTab].thead" :key="item.id") {{item.text}}
       tbody.text-xs.px-6
         tr.h-9(v-for="(item, index) in state.list" :key="item" :class="{'bg-white-light': index % 2 === 1 }")
           td {{item.companyName}}
           td.py-2(v-for="_item in state.tabs[state.activeTab].thead.slice(1)" :key="_item.id")
            div.flex.justify-center.items-center(:class="{'flex-col': state.activeTab === 1}")
              p.flex-1.text-center(v-for="(__item, __index) in _item.list" :key="__index") {{__item}}
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { _getIndex } from '@/service/modules/live.api'
const props = defineProps(['matchId'])

const state = reactive({
  activeTab: 0,
  tabs: [
    { id: 1, text: '让球', active: true, thead: [
      { id: 11, text: '公司'},
      { id: 12, text: '初始', list: [1,2,3]},
      { id: 13, text: '即时', list: [4,5,6]}
    ] },
    { id: 2, text: '胜平负', active: false, thead: [
      { id: 21, text: '公司'},
      { id: 22, text: '初始', invisible: true, list: ['初始', '即时']},
      { id: 23, text: '主胜', list: [1,2]},
      { id: 24, text: '平局', list: [3,4]},
      { id: 25, text: '客胜', list: [5,6]}
    ]},
    { id: 3, text: '总进球', active: false, thead: [
      { id: 31, text: '公司'},
      { id: 32, text: '初始', list: [1,2,3]},
      { id: 33, text: '即时', list: [4,5,6]}
    ]  }
  ],
  list: []
})

const onTabClick = (item, index) => {
  console.log(index)
    state.activeTab = index
    state.tabs.map(val => {
        val.active = val.id === item.id
    })
}

onMounted(async () => {
  state.list = await _getIndex(props.matchId)
  console.log(state.list)
})

</script>


<style scoped lang="sass">
p
  &.active
    background: url('../live-process/title-active@2x.png') no-repeat center center
    background-size: 100% 100%  
.h-screen
    margin-top: -296px
    padding-top: 296px
</style>