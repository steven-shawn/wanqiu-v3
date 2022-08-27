<template lang="pug">
div.pb-16
  van-sticky
    div.flex.bg-white.text-sm.px-4.box-border.justify-between.items-center.pt-4.pb-2.shodow
      div.flex.items-center
        p.flex(@click="onReserveList")
          img(src="@/assets/imgs/icon_clock@2x.png" class="w-18-px h-18px")
        p.bg-grey.flex.w-151-px.h-24-px.rounded-full.ml-2.border-1.justify-between.px-2.items-center(@click="route('/search')")
          input.bg-transparent.w-110-px(disabled placeholder="搜索")
          img.bg-transparent(src="@/assets/imgs/icon_search@2x.png" class="w-12-px h-12-px")
      img.w-15.h-7(src="@/assets/imgs/icon_gifts@2x.png" @click="onGifts")
  live-swiper
  div.hot.px-2.mt-2(style="min-height: 192px;")
    video-list-title(:count="state.hotTotal")
    div.flex.flex-wrap.justify-between
      video-list-item(v-for="item in state.hotList" :key="item.matchId" :item="item")
    van-loading.text-center.pt-12(type="spinner" v-if="state.hotLoading")
    van-empty(description="暂无直播" v-if="!state.hotLoading && !state.hotList?.length")
  div.now.px-2.mt-2(style="min-height: 192px;")
    video-list-title(type="now")
    div.flex.flex-wrap.justify-between
      video-list-item(v-for="item in state.liveList" :key="item.matchId" :item="item")
    van-loading.text-center.pt-12(type="spinner" v-if="state.liveLoading")
    van-empty(description="暂无直播" v-if="!state.liveLoading && !state.liveList?.length")
</template>

<script setup lang="ts">
import VideoListTitle from '@/components/video-list-title/index.vue'
import VideoListItem from '@/components/video-list-item/index.vue'
import { _hotList, _liveList } from '@/service/modules/live.api'
import { onMounted, reactive } from '@vue/runtime-core'
import LiveSwiper from '@/components/live-swiper/index.vue'
import router from '@/router'

const PAGE_LEN = 6

const state = reactive({
  hotLoading: true,
  liveLoading: true,
  hotList: [],
  hotTotal: 0, // 多少条直播
  liveList: []
})

onMounted(async () => { 
  state.hotLoading = true
  _hotList(1,PAGE_LEN, true).then(data => {
     const { total, records } = data
     state.hotLoading = false
     state.hotList = records
     state.hotTotal = total
  })

  // // 正在
  state.liveLoading = true
  _liveList().then(data => {
    state.liveLoading = false
    state.liveList = data
  })
})

/****  方法区  */

// 路由调准
const route = (url: string) => {
  router.push(url)
}

// 预约列表
const onReserveList = () => {
  console.log('on reserve')
}

/// 礼物
const onGifts = () => {
  console.log('on gifts')
}

</script>