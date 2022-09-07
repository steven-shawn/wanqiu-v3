

<template lang="pug">
div.bg-white.w-full.text-primary.rounded-t-xl.shadow-lg.shadow-black
  h1.flex.justify-between.px-4.items-center.border-b.h-10(style="border-color: rgba(102, 97, 97,.5)")
    span.flex.h-full.items-center.text-sm.border-b-2 礼物
    span(@click="onClose") x
  ul.flex.justify-between.flex-col.items-center.flex-wrap.h-250.overflow-x-auto.px-2.py-1.my-2
    li.border.flex.flex-col.justify-between.items-center.mr-1.rounded-lg.pt-2(v-for="item in state.list" 
     :key="item.id" style="width: 88px; height: 116px" :class="{'border-primary': state.active === item.id}" @click="state.active = item.id")
     div.w-12.h-12.rounded-full.mb-1
       img(:src="`${IMG_URL}${item.pictureUrl}`")
     p.text-xs.text-primary {{item.giftName}}
     p.text-xs.w-full.text-center.py-1(:class="state.active === item.id ? 'bg-primary text-white rounded' : ''" @click.stop="onSend(item)") {{item.diamondPrice}}球钻
  div.h-11.flex.justify-between.items-center.bg-white.shadow-lg.shadow-black.px-4.text-xs.mx-4.rounded-lg
    p.flex.items-center
     img.w-4.h-4(src="./icon_diamond@2x.png")
     span.ml-1.text-sm 球钻 {{store.state.user.userInfo.diamond}}
    p
      span.text-sm 充值
      van-icon.rotate-180.ml-1(name="arrow-left")                
</template>

<script lang="ts" setup>
import { inject, onMounted, reactive } from 'vue'
import { _giftList, _sendGift } from '@/service/modules/live.api'
import { IMG_URL } from '@/config/system.conf';
import { useStore } from 'vuex';
import { Notify } from 'vant';

const store = useStore()

const popCtrl =  inject('popCtrl')

const state = reactive({
  active: '',
  list: []
})

onMounted(() => {
  _giftList().then(data => {
    state.list = data
    if (state.list.length) {
      state.active = state.list[0]['id']
    }
    
  })
})

// 发送礼物
const onSend = async (item) => {
  console.log(item)
  const rid = store.state.live.room_id
  await _sendGift({gid: item.id, rid})
  store.dispatch('user/SET_BALANCE') // 更新余额
  Notify({type: 'success', message: item.giftName + '发送成功'})
}

const onClose = () => {
    popCtrl.showGift = false
}
</script>


<style scoped lang="sass">
.h-250
  height: 250px
</style>
