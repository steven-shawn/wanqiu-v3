<template lang="pug">
div.flex.flex-col.h-screen.overflow-y-auto.live-relate
    div.now.px-2
        video-list-title(type="now")
        div.flex.flex-wrap.justify-between
            video-list-item(v-for="item in liveList" :key="item.id" :item="item")
</template>

<script lang="ts" setup>
import VideoListTitle from '@/components/video-list-title/index.vue'
import VideoListItem from '@/components/video-list-item/index.vue'
import { _liveList } from '@/service/modules/home.api'
import { onMounted, ref } from '@vue/runtime-core'

const liveList = ref([])

onMounted(() => {
  // 正在
  _liveList().then(list => {
    liveList.value = list
  })
})
</script>

<style scoped lang="sass">
.h-screen
    margin-top: -296px
    padding-top: 296px
</style>
