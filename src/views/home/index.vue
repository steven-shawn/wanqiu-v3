<template lang="pug">
div#home
  //img(src="@/assets/imgs/login_bg@2x.png")
  div.pb-16.pt-11
    jq-header.fixed 首页
    //jq-banner
    div.hot.px-2.bg-white.mt-2
      video-list-title(:count="hotList.length" title="热门直播")
      div.flex.flex-wrap.justify-between
        video-list-item(v-for="item in hotList" :key="item.id" :item="item")
    div.now.px-2.bg-white.mt-2
      video-list-title(type="now")
      div.flex.flex-wrap.justify-between
        video-list-item(v-for="item in liveList" :key="item.id" :item="item")
</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'
import JqBanner from '@/components/jq-banner/index.vue'
import VideoListTitle from '@/components/video-list-title/index.vue'
import VideoListItem from '@/components/video-list-item/index.vue'
import { _hotList, _liveList } from '@/service/modules/live.api'
import { onMounted, ref } from '@vue/runtime-core'

const hotList = ref([])
const liveList = ref([])

onMounted(() => {
  // 热门
  _hotList().then(list => {
    hotList.value = list
  })
  // 正在
  _liveList().then(list => {
    liveList.value = list
  })
})


</script>