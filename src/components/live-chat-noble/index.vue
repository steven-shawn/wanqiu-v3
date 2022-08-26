<template lang="pug">
div#noble.pb-20.pt-11.w-screen.h-full.absolute.z-10
    jq-header.fixed.border-b.z-20.text-primary(style="border-color: rgba(235, 237, 240,.5)" leftIcon="arrow-left" @e-left-click="onLeftClick") 成为贵族 万众瞩目
    van-tabs(swipeable animated v-model:active="active" background="#fff" color="#667885" title-active-color="#072b48" title-inactive-color="#072b48")
      van-tab(:title="item.text" v-for="(item, index) in list" :key="item.id")
        div.content.text-white.flex.flex-col.px-4.justify-between.h-screen.overflow-y-auto
          div
            div.w-40.h-40.mx-auto.mt-4
              img(:src="Util.$require(`components/live-chat-noble/level-${item.id}@2x.png`)")
            ul.flex.justify-start.flex-wrap.px-4.py-3.box-shadow.rounded-lg.mt-3.bg-white(style="border-color: rgb(69, 68, 65)")
              li.text-yellow-600.flex.flex-col.items-center.px-1.mb-4(v-for="_item in privileges" 
                :key="item.id" :class="'w-1/3'" v-show="item.privileges.includes(_item.id)")
                div.w-10.h-10.rounded-full.mb-1
                  img(:src="Util.$require(`components/live-chat-noble/${_item.id === 1 ? _item.icon + (index + 1) : _item.icon}@2x.png`)")
                h1.text-sm.text-primary {{ _item.title }}
                p.text-xs.text-grey-light.text-center(v-html="typeof(_item.content) === 'string' ? _item.content : _item.content[index]")
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
          div.flex.flex-col.justify-between
            p.flex.flex-col.text-grey-light.text-xs.mb-2(v-if="item.status === 1")
              span 有效期至
              span.text-primary 2022-02-01 10:10:10
            button.w-24.h-9.rounded.text-xs.bg-red-600.text-white(:class="{'extends': item.status === 1}")
    van-popup.rounded(v-model:show="state.show" style="overflow:visible ;")
      div.pupup.rounded-2xl.p-0
        img.absolute.left-0.-top-9.z-10(src="./popup-head@2x.png")
        img.absolute.-right-2.-top-2.z-10.w-5.h-5(src="./icon-close@2x.png" @click="state.show = false")
        div.border.mt-5.relative.logo-box
          img.logo-box.bg.absolute(src="./level-1_bg@2x.png")
          img.logo.absolute(src="./level1@2x.png")

        div.text-primary.text-lg.mt-4.text-center 成功开通金球贵族【主教】
        div.mt-12.text-xs.pl-6
          p.text-grey-light 贵族有效期：
          p.text-primary.mt-1 2022-1-15 02:15:48 至 2022-2-15 02:15:48
        div.mt-3.text-xs.pl-6
          p.text-grey-light 喇叭有效期：
          p.text-primary.mt-1 2022-1-15 02:15:48 至 2022-2-15 02:15:48

</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'
import { ref, reactive } from '@vue/reactivity'
import { inject } from '@vue/runtime-core'
import Util from '@/utils'

// 数据区域
const state = reactive({
  show: false
})
const active = ref('')

const list = ref([
    { id: 1, text: '骑士', buy: 1100, extends: 550, status: 0, active: false, privileges: [1,2,3,4,5,6] },
    { id: 2, text: '侯爵', buy: 1100, extends: 550, status: 0, active: false, privileges: [1,2,3,4,5,6] },
    { id: 3, text: '主教', buy: 1100, extends: 550, status: 0, active: false, privileges: [1,2,3,4,5,6] },
    { id: 4, text: '国王', buy: 1100, extends: 550, status: 0, active: false, privileges: [1,2,3,4,5,6,7] },
    { id: 5, text: '帝皇', buy: 1100, extends: 550, status: 1, active: true, privileges: [1,2,3,4,5,6,7,8] },
])

const privileges = ref([
    { id: 1, icon: 'rider_', title: '专属坐骑', content: ['烈焰飞马，纵横弛聘<br/>【贵族入场公屏通知】', 
      '冰原捷豹，摄影追风<br/>【贵族入场公屏通知】', 
      '神威猛虎，虎啸九州<br/>【贵族入场公屏通知】',
      '招财瑞兽，财运亨通<br/>【贵族入场公屏通知】',
      '烈焰飞马，纵横弛聘<br/>【贵族入场公屏通知】'] },
    // { id: 8, icon: 'speak', title: '发言特权', content: '招财瑞兽，财运亨通 【贵族入场公屏通知】' },
    { id: 2, icon: 'promo', title: '超值优惠', content: '贵族续费<br/>5折优惠' },
    { id: 3, icon: 'logo', title: '贵族标识', content: '专属身份<br/>帝皇勋章' },
    { id: 4, icon: 'barrage', title: '贵族弹幕', content: '享受与众不同的<br/>弹幕展示' },
    { id: 5, icon: 'set', title: '贵宾席', content: '入座直播间贵宾席<br/>特显尊贵' },
    { id: 6, icon: 'notify', title: '开通通知', content: '开通续费<br/>直播间广播通知' },
    { id: 7, icon: 'trump', title: '全频喇叭', content: '赠送5个全频道喇叭<br/>畅所欲言' },
    { id: 8, icon: 'gift', title: '贵族礼物', content: '帝皇专享<br/>豪华礼物' }
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
  button
    background: url(./bg-buy@2x.png) no-repeat center center
    background-size: 100% 100%
    &.extends
      background: url(./bg-extends@2x.png) no-repeat center center
      background-size: 100% 100%
  .pupup
    width: 320px
    height: 520px
    // margin: 7px 4px 0 0
    // padding: 20px 0 40px
    // border-radius: 10px
    // border-style: solid
    // border-width: 2px
    // border-image-source: linear-gradient(to left, #e7ab55 100%, #fbdf8e 81%, #e5b548 49%, #fbe091 23%, #e7ab55 0%)
    // border-image-slice: 1
    .logo-box
      width: 320px
      height: 280px
    .logo
      width: 240px
      height: 240px  
      left: 50%
      margin-left: -120px
      top: 50%
      margin-top: -120px

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