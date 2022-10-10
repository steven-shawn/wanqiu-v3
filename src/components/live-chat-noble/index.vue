<template lang="pug">
div#noble.pb-20.pt-11.w-screen.h-full.absolute.z-10
    jq-header.fixed.border-b.z-20.text-primary(style="border-color: rgba(235, 237, 240,.5)" 
      leftIcon="arrow-left" @e-left-click="onLeftClick") 成为贵族 万众瞩目
    van-tabs(swipeable animated v-model:active="state.active" background="#fff" color="#667885" 
      title-active-color="#072b48" title-inactive-color="#072b48")
      van-tab(:title="item.gradeName" v-for="(item, index) in state.list" :key="item.level")
        div.content.text-white.flex.flex-col.px-4.justify-between.h-screen.overflow-y-auto
          div
            div.w-40.h-40.mx-auto.mt-4.flex.justify-center.items-center
              img(:src="(`${IMG_URL}${item.logoUrl}`)")
            ul.flex.justify-start.flex-wrap.px-4.py-3.box-shadow.rounded-lg.mt-3.bg-white(style="border-color: rgb(69, 68, 65)")
              li.text-yellow-600.flex.flex-col.items-center.px-1.mb-4(v-for="_item in item.noblePrivilege" 
                :key="item.id" :class="'w-1/3'")
                div.w-10.h-10.rounded-full.mb-1
                  img(:src="(`${IMG_URL}${_item.pictureUrl}`)")
                h1.text-sm.text-primary {{ _item.title }}
                p.text-xs.text-grey-light.text-center(v-html="_item.illustrate")
        div.flex.justify-between.items-center.py-4.box-shadow.bg-white.absolute.bottom-0.w-full.px-4
          div.text-sm
            p.text-grey-light 开通{{item.gradeName}}:
              span.text-primary {{item.openDiamond}}个球钻/月
            p.text-grey-light 续费{{item.gradeName}}:
              span.text-primary {{item.renewalDiamond}}个球钻/月
            p.flex.items-center
              img.w-4.h-4.mr-1(src="@/assets/imgs/my/icon_diamond.png")
              span.text-grey-light 球钻余额:
              span.text-primary {{store.state.user.userInfo.diamond}}
            p.text-grey-light 由主播“{{props.archorhName}}”为你开通
          div.flex.flex-col.justify-between
            p.flex.flex-col.text-grey-light.text-xs.mb-2(v-if="item.propsNum")
              span 有效期至
              span.text-primary {{item.nobleExpireDate}}
            button.w-24.h-9.rounded.text-xs.bg-red-600.text-white(:class="{'extends': item.propsNum}" @click="onBuy(item)")
    van-popup.rounded(v-model:show="state.show" style="overflow:visible ;")
      div.pupup.rounded-2xl.p-0
        img.absolute.left-0.-top-9.z-10(src="./popup-head@2x.png")
        img.absolute.-right-2.-top-2.z-10.w-5.h-5(src="./icon-close@2x.png" @click="state.show = false")
        div.border.mt-5.relative.logo-box
          //- img.logo-box.bg.absolute(:src="IMG_URL + state.list[state.active].bigLogoUrl")
          img.logo.absolute(:src="IMG_URL + state.list[state.active].effectUrl")

        div.text-primary.text-lg.mt-4.text-center 成功开通{{APP_NAME}}贵族【{{state.list[state.active].gradeName}}】
        div.mt-12.text-xs.pl-6
          p.text-grey-light 贵族有效期：
          p.text-primary.mt-1 {{state.list[state.active].nobleExpireDate}}
        div.mt-3.text-xs.pl-6
          p.text-grey-light 喇叭有效期：
          p.text-primary.mt-1 {{state.list[state.active].remainNum}}

</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'
import { reactive } from '@vue/reactivity'
import { inject, onMounted } from '@vue/runtime-core'
import { _getNoble, _userNoble, _buyNoble } from '@/service/modules/live.api'
import { SET_BALANCE } from '@/store/types.store'
import { IMG_URL, APP_NAME } from '@/config/system.conf'
import { useStore } from 'vuex'
import { Notify } from 'vant'
const store = useStore()

const props = defineProps(['archorhName'])

// 数据区域
const state = reactive({
  show: false,
  active: '',
  list: [],
  orders: []
})

const popCtrl = inject('popCtrl')

// 返回(其实是关闭)
const onLeftClick = () => {
    popCtrl.showNoble = false
}

// 购买或者续费
const onBuy = async (item) => {
  // console.log(state.active)
  // return
  await _buyNoble(item.propsNum || item.gradeName)
  Notify({type: 'success', message: item.propsNum ? '续费成功' : '开通成功'})
  store.dispatch(`user/${SET_BALANCE}`) /// 更新余额
  await getNoble()
  state.show = true
}

const getNoble = async () => {
  state.orders = {}
  const data = await _userNoble()
  data.map(item => { // 转化成对象
    state.orders[item.propsNum] = item
  })

  _getNoble().then(data => {
    state.list = data
    state.list.map(item => {
      if(state.orders[item.gradeNum]) {
        Object.assign(item, state.orders[item.gradeNum])
      }
    })
  })
}

onMounted(() => { // 渲染
  getNoble()
})


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
      // width: 240px
      height: 240px  
      left: 50%
      // margin-left: -120px
      transform: translate(-50%, 0px)
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