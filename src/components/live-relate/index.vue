<template lang="pug">
div.flex.flex-col.h-screen.overflow-y-auto.live-relate
    div.now.px-2(v-if="liveList.length")
        video-list-title(type="now" title="相关直播")
        div.flex.flex-wrap.justify-between
            video-list-item(v-for="item in liveList" :key="item.id" :item="item")
    van-empty(v-else)
      span.text-primary.text-xs  暂无相关直播    
</template>

<script lang="ts" setup>
import VideoListTitle from '@/components/video-list-title/index.vue'
import VideoListItem from '@/components/video-list-item/index.vue'
import { _liveList } from '@/service/modules/live.api'
import { onMounted, ref } from '@vue/runtime-core'
const props = defineProps(['matchId'])

const liveList = ref([])

onMounted(() => {
  // 正在
  
  _liveList(props.matchId).then(list => {
    liveList.value = list
  })
})
</script>

<style scoped lang="sass">
.h-screen
    margin-top: -296px
    padding-top: 296px
</style>
