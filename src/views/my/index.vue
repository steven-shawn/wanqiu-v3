<template lang="pug">
div.pb-20.pt-11.bg-gray-100.h-full 
  jq-header.fixed(leftIcon="setting" rightIcon="chat-o" @e-left-click="onLeftClick" @e-right-click="onRightClick") 我的
  div.px-4
    jq-avatar.my-2
    div.diamond-box.w-full.h-24.rounded.flex.justify-between
        div.flex.flex-col.text-white.justify-center.pl-4.text-primary.w-full
            div.flex.w-full.justify-between
                div.text-sm.text-primary 我的球钻
                div.text-xs.mr-4.text-primary.flex.items-center(@click="onRoute({router: '/my/charge'})")
                  span 充值明细
                  van-icon.rotate-180(name="arrow-left" size="12px")
            div.flex.justify-between.w-full.items-end
                div.flex.items-end
                    span.diamond.block.h-7.w-7
                    strong.text-3xl.font-medium.mx-1.translate-y.text-primary {{store.state.user.userInfo.diamond  || '0'}}
                    span.text-xs.text-primary 个
                div.flex.items-center.mr-4
                    button.w-16.h-6.bg-red-600.rounded.text-white.text-xs.charge
    ul.flex.bg-white.rounded.my-2.px-4.py-3.justify-between
        li.flex.flex-col.items-center.flex-1(v-for="item in tabList" :key="item.id" @click="onRoute(item)")
            div.w-11.h-9.mb-2.img-bg.flex.justify-center.items-center
                van-image.w-7.h-7(:src="Util.require(`assets/imgs/my/icon_${item.icon}.png`)")
            div.text-xs.text-primary {{item.text}}
    ul.flex.flex-col.my-3.bg-white.rounded.shadow-lg
        li.flex.justify-between.h-10.items-center.border-b(v-for="item in cellList" :key="item.id" @click="onRoute(item)")
            span.block.w-5.h-5.mx-4
                van-image(:src="Util.require(`assets/imgs/my/icon_${item.icon}.png`)")
            span.flex-1.text-xs.text-primary {{item.text}}
            van-icon.text-gray-600.mr-4(name="arrow")
</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'
import JqAvatar from '@/components/jq-avatar/index.vue'
import Util from '@/utils'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { _getBalance } from '@/service/modules/user.api'

const store = useStore()
const router = useRouter()

// 我的关注...
const tabList = ref([
    {id: 1, text: '我的关注', router: '/my/concern', icon: 'collect'},
    {id: 2, text: '我的预约', router: '/my/reserve', icon: 'reserve'},
    {id: 3, text: '申请主播', router: '/my/apply-anchor', icon: 'apply'},
    {id: 4, text: '申请专家', router: '/my/apply-anchor', icon: 'expert'}
])

// 我的等级...
const cellList = ref([
    {id: 1, text: '我的等级', icon: 'level', router: '/my/level' },
    {id: 2, text: '活动中心', icon: 'acti', router: '' },
    {id: 3, text: '喇叭历史', icon: 'trump', router: '' },
    {id: 4, text: '我的房管', icon: 'admin', router: '' },
    {id: 5, text: '在线客服', icon: 'service', router: '' },
    {id: 6, text: '常见问题', icon: 'ques', router: '/my/faq' }
])

// 点击跳转到指定的路由
const onRoute = item => {
    router.push(item.router)
}

// 点击设置图标
const onLeftClick = () => {
  router.push('/my/setting')
}

// 点击消息图标
const onRightClick = () => {
  router.push('/my/message')
}

onMounted(() => { // 获取余额
    store.dispatch('SET_BALANCE')
    // _getBalance().then(data => {
    //     console.log(data)
    // })
})

</script>

<style scoped lang="sass">
.charge
    background: url('@/assets/imgs/my/bg-charge.png') no-repeat center center
    background-size: 100%
.img-bg
    background: url('@/assets/imgs/my/icon_bg.png') no-repeat center center
    background-size: 100%
.diamond-box
    background: url('@/assets/imgs/my/bg-diamond.png') no-repeat left top
    background-size: 100%
    .diamond
        background: url('@/assets/imgs/my/icon_diamond.png') no-repeat center bottom
        background-size: 100%
.translate-y
    transform: translateY(7px)
</style>