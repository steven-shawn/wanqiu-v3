<template lang="pug">
div
  van-sticky
    jq-header.fixed 正在直播
  // jq-header.invisible
  van-pull-refresh(v-model="state.refreshing" @refresh="onRefresh")
    van-list(v-model:loading="state.loading" :finished="state.finished" 
    :finished-text="state.finished && !state.list.length ? '' : '没有更多了'" @load="onLoad")
        div.flex.flex-wrap.justify-between.p-2
            video-list-item(v-for="item in state.list" :key="item.matchId" :item="item")
    van-empty(description="暂无直播" v-if="state.finished && !state.list.length")
</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'
import VideoListItem from '@/components/video-list-item/index.vue'
import { _liveList } from '@/service/modules/live.api'
import { DEFAULT_PAGE_SIZE } from '@/config/system.conf'
import { reactive } from 'vue'

const state = reactive({
  list: [],
  loading: true,
  finished: false,
  refreshing: false
})


// 下拉刷新
const onRefresh = () => {
    state.finished = false;
    state.loading = true;
    onLoad();
}

// 上拉加载
const onLoad = async () => {
  if (state.refreshing) {
    state.list = []
    state.refreshing = false
  }
  const list = await _liveList()
  state.list = [...state.list, ...list]
  state.loading = false
  if (list.length < DEFAULT_PAGE_SIZE) {
    state.finished = true
  }
}

</script>