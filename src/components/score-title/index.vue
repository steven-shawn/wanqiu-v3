<template lang="pug">
div.flex.flex-col.px-1.py-2.bg-white.rounded.border-box 
    ul.flex.border-b.pb-2
        li.w-16.h-7.flex.justify-center.items-center.bg-gray-200.rounded.mr-2(v-for="item in ballList" :key="item.id" :class="{'active': item.active}" @click="onTopLiClick(item)" v-show="item.show")
            component(:is="item.component" :color="item.active ? '#fff' : '#666'")
            span.text-sm.ml-1 {{item.text}}
    div.flex.justify-between.items-center.mt-2
        ol.flex.items-center
            li.relative.text-sm.px-2(v-for="item in typeList" :key="item.id" @click="onBottomClick(item)" :class="{'text-red-600 font-bold': item.active}"  v-show="item.show") {{item.text}}
        div.text-sm(v-if="type === 'score'")
          span 隐藏 0
          button.bg-gray-200.rounded-md.px-2.ml-1 完整          
</template>

<script setup lang="ts">
import Util from '@/utils'
import basketballSvg from './svg/basketball-svg.vue'
import footballSvg from './svg/football-svg.vue'
import hotSvg from './svg/hot-svg.vue'
import otherSvg from './svg/other-svg.vue'

import { ref, shallowRef } from "vue"

// 是哪个tab的
const props = defineProps({
    type: {
        type: String,
        default: 'score' // score 比分， schedule 赛程
    }
})

const ballList = ref([
    { id: 1, text: '热门', icon: 'hot', active: true, component: shallowRef(hotSvg), show: props.type === 'schedule' },
    { id: 2, text: '足球', icon: 'football', active: false, component: shallowRef(basketballSvg), show: true },
    { id: 3, text: '篮球', icon: 'basketball', active: false, component: shallowRef(footballSvg), show: true },
    { id: 4, text: '其他', icon: 'other', active: false, component: shallowRef(otherSvg), show: true }
])

const typeList = ref([
    {id: 1, text: '进行中', active: true, show: true },
    {id: 2, text: '未开始', active: false, show: props.type === 'score' },
    {id: 3, text: '完场', active: false, show: props.type === 'score' },
    {id: 4, text: '异常', active: false, show: props.type === 'score' },
    {id: 5, text: '赛程', active: false, show: props.type === 'schedule' }
])

// 点击顶部li
const onTopLiClick = val => {
    ballList.value.map(item => {
        item.active = val.id === item.id
    })
    onBottomClick(typeList.value[0])
}

// 点击底部li
const onBottomClick = val => {
    typeList.value.map(item => {
        item.active = val.id === item.id
    })
}
</script>

<style scoped lang="sass">
ul
  li.active
    background: red
    color: #fff
ol
  li:before
    display: block
    content: ''
    width: 1px
    height: 10px
    background: rgb(229, 231, 235)
    position: absolute
    top: 50%
    left: 0
    transform: translateY(-50%)
    margin-right: 5px  
</style>
