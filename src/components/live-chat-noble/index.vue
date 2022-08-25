<template lang="pug">
div#noble.pb-20.pt-11.w-screen.h-full.absolute.z-10
    jq-header.fixed.border-b.z-20.text-primary(style="border-color: rgba(235, 237, 240,.5)" leftIcon="arrow-left" @e-left-click="onLeftClick") 成为贵族 万众瞩目
    van-tabs(swipeable animated v-model:active="active" background="#fff" color="#667885" title-active-color="#072b48" title-inactive-color="#072b48")
      van-tab(:title="item.text" v-for="item in list" :key="item.id")
        div.content.text-white.flex.flex-col.px-4.justify-between.h-screen.overflow-y-auto
          div
            div.w-40.h-40.mx-auto.mt-4
              img(:src="Util.$require(`components/live-chat-noble/level-${item.id}@2x.png`)")
            ul.flex.justify-start.flex-wrap.px-4.py-3.box-shadow.rounded-lg.mt-3.bg-white(style="border-color: rgb(69, 68, 65)")
              li.text-yellow-600.flex.flex-col.items-center.px-1.mb-4(v-for="_item in privileges" :key="item.id" :class="'w-1/3'" v-show="item.privileges.includes(_item.id)")
                div.w-10.h-10.rounded-full.border.mb-1
                h1.text-sm.text-primary {{ _item.title }}
                p.text-xs.text-grey-light.text-center {{ _item.content }}
        div.flex.justify-between.items-center.py-4.box-shadow.bg-white.absolute.bottom-0.w-full.px-4
          div.text-sm
            p.text-grey-light 开通{{item.text}}:
              span.text-primary {{item.buy}}个球钻/月
            p.text-grey-light 续费{{item.text}}:
              span.text-primary {{item.extends}}个球钻/月
            p.flex.items-center
              img.w-4.h-4.mr-1(src="@/assets/imgs/my/icon_diamond.png")
              span.text-grey-light 球钻余额:
              span.text-primary 100
            p.text-grey-light 由主播“猛哥说球”为你开通
          button.w-24.h-9.rounded.text-xs.bg-red-600.text-white 立即{{item.status === 0 ? '开通' : '续费'}}
</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'
import { ref } from '@vue/reactivity'
import { inject } from '@vue/runtime-core'
import Util from '@/utils'

const active = ref('')

const list = ref([
    { id: 1, text: '帝皇', buy: 1100, extends: 550, status: 1, active: true, privileges: [1,2,3,4,5,6,7] },
    { id: 2, text: '国王', buy: 1100, extends: 550, status: 0, active: false, privileges: [2,3,4,5,6,7,8] },
    { id: 3, text: '主教', buy: 1100, extends: 550, status: 0, active: false, privileges: [1,2,3,4,5,6] },
    { id: 4, text: '侯爵', buy: 1100, extends: 550, status: 0, active: false, privileges: [1,2,3,4,5,6] },
    { id: 5, text: '骑士', buy: 1100, extends: 550, status: 0, active: false, privileges: [1,2] },
])

const privileges = ref([
    { id: 1, icon: 'horse', title: '专属坐骑', content: '神尊金龙 傲视无双【贵族入场公屏通知】' },
    { id: 8, icon: 'speak', title: '发言特权', content: '招财瑞兽，财运亨通 【贵族入场公屏通知】' },
    { id: 2, icon: 'promo', title: '超值优惠', content: '贵族续费 5折优惠' },
    { id: 3, icon: 'logo', title: '贵族标识', content: '专属身份 帝皇勋章' },
    { id: 4, icon: 'barrage', title: '贵族弹幕', content: '享受与众不同的 弹幕展示' },
    { id: 5, icon: 'set', title: '贵宾席', content: '入座直播间贵宾席 特显尊贵' },
    { id: 6, icon: 'notify', title: '开通通知', content: '开通续费 直播间广播通知' },
    { id: 7, icon: 'trump', title: '全频喇叭', content: '赠送20个全频道喇叭 畅所欲言' }
])

const popCtrl = inject('popCtrl')

// 返回(其实是关闭)
const onLeftClick = () => {
    popCtrl.showNoble = false
}



</script>

<style scoped lang="sass">
#noble
  background-color: #e8e8e8
$text-color: #81744e
$text-active-color: #ffdf89
.content
    color: $text-color
    margin-top: -88px
    padding-top: 88px
    .t-color
        color: $text-color
    .high-color
        color: $text-active-color
</style>