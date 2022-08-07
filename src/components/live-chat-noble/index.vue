<template lang="pug">
div.pb-20.pt-11.bg-black.w-screen.h-full.absolute.z-10
    jq-header.fixed.border-b.z-20(style="border-color: rgba(235, 237, 240,.5)" leftIcon="arrow-left" @e-left-click="onLeftClick") 贵族详情
    van-tabs(swipeable animated v-model:active="active" background="#0d0e15" color="#0d0e15" title-active-color="#ffdf89" title-inactive-color="#81744e")
      van-tab(:title="item.text" v-for="item in list" :key="item.id")
        div.content.text-white.flex.flex-col.px-4.justify-between.h-screen.overflow-y-auto
          div  
            div.w-40.h-40.rounded-full.border.mx-auto
            ul.flex.justify-start.flex-wrap.px-4.py-3.border.rounded-lg.mt-3(style="border-color: rgb(69, 68, 65)")
              li.text-yellow-600.flex.flex-col.items-center.px-1.mb-4(v-for="_item in privileges" :key="item.id" :class="'w-1/3'" v-show="item.privileges.includes(_item.id)")
                div.w-10.h-10.rounded-full.border.mb-1
                h1.text-sm.high-color {{ _item.title }}
                p.text-xs.t-color {{ _item.content }}
          div.flex.justify-between.items-center.my-4
            div.text-sm
              p 开通{{item.text}}: 
                span.high-color {{item.buy}}个球钻/月    
              p 续费{{item.text}}: 
                span.high-color {{item.extends}}个球钻/月
              p 
                span 
                span 球钻余额: 
                span.high-color 100
              p {{item.status === 0 ? '开通' : '续费'}}{{item.text}}等级
            button.w-24.h-9.rounded.text-xs.bg-red-600.text-white 立即{{item.status === 0 ? '开通' : '续费'}}            
</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'
import { ref } from '@vue/reactivity'
import { inject } from '@vue/runtime-core'

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