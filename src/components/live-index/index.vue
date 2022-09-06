<template lang="pug">
div.flex.flex-col.py-4.h-screen.overflow-y-auto.live-process.bg-white-light.pb-12.relative
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
           td.py-2(v-for="(_item, _index) in item[state.tabs[state.activeTab].key + state.type]" :key="_index")
            div.flex.justify-center.items-center(:class="{'flex-col': state.activeTab === 1}")
              p.flex-1.text-center(v-for="(__item, __index) in _item" :key="__index") {{__item}}
  div.switch.fixed.bottom-4.flex.items-center
    p.text-xs.flex-1.h-full.flex.items-center.justify-center(:class="{'Half': state.type === 'Half'}" @click="onType('Half')")
      img.w-3.h-3(src="./icon-active@2x.png")
      span.text-primary(:class="{'invisible': state.type === 'Half'}") 半场
    p.text-xs.flex-1.h-full.flex.items-center.justify-center(:class="{'full': state.type === ''}" @click="onType('')")
      img.w-3.h-3.ml-1(src="./icon-active@2x.png")
      span.text-primary(:class="{'invisible': state.type === ''}") 全场
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { _getIndex } from '@/service/modules/live.api'
const props = defineProps(['matchId'])

const state = reactive({
  activeTab: 0,
  type: 'Half',
  tabs: [
    { id: 1, key: 'handicap', text: '让球', active: true, thead: [
      { id: 11, text: '公司'},
      { id: 12, text: '初始'},
      { id: 13, text: '即时'}
    ] },
    { id: 2, text: '胜平负',key: 'europeOdds', active: false, thead: [
      { id: 21, text: '公司'},
      { id: 22, text: '', invisible: true},
      { id: 23, text: '主胜'},
      { id: 24, text: '平局'},
      { id: 25, text: '客胜'}
    ]},
    { id: 3, text: '总进球', key: 'overUnder', active: false, thead: [
      { id: 31, text: '公司'},
      { id: 32, text: '初始'},
      { id: 33, text: '即时'}
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

const onType = (type:string) => {
  state.type = type
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
.switch
  width: 116px
  height: 28px
  // margin: 0 58px 6px 7px
  // padding: 0 1px 1px 18px
  border-radius: 14px
  box-shadow: 0 0 2px 0 rgba(7, 43, 72, 0.2), inset 0 1px 1px 0 rgba(7, 43, 72, 0.4)
  background-color: #fff
  margin-left:6%
  p
    &.Half
      background: url('./half-active@2x.png') no-repeat center center
      background-size: 100%
    // text-indent: -100px
    &.full
      background: url('./full-active@2x.png') no-repeat center center
      background-size: 100%
</style>