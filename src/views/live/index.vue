<template lang="pug">
div.pb-16.pt-11
  jq-header.fixed 直播
    //-   jq-banner
  div.hot.px-2.bg-white.mt-2(style="min-height: 192px;")
    video-list-title(:count="state.hotTotal")
    div.flex.flex-wrap.justify-between
      video-list-item(v-for="item in state.hotList" :key="item.matchId" :item="item")
    van-loading.text-center.pt-12(type="spinner" v-if="state.hotLoading")
    van-empty(description="暂无直播" v-if="!state.hotLoading && !state.hotList?.length")
  div.now.px-2.bg-white.mt-2(style="min-height: 192px;")
    video-list-title(type="now")
    div.flex.flex-wrap.justify-between
      video-list-item(v-for="item in state.liveList" :key="item.matchId" :item="item")
    van-loading.text-center.pt-12(type="spinner" v-if="state.liveLoading")
    van-empty(description="暂无直播" v-if="!state.liveLoading && !state.liveList?.length")
</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'
import JqBanner from '@/components/jq-banner/index.vue'
import VideoListTitle from '@/components/video-list-title/index.vue'
import VideoListItem from '@/components/video-list-item/index.vue'
import { _hotList, _liveList } from '@/service/modules/live.api'
import { onMounted, reactive, ref } from '@vue/runtime-core'

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


</script>