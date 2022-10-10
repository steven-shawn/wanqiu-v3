<template lang="pug">
div
  //- van-sticky
  //-   jq-download-header
  van-sticky
      jq-header.fixed 热门直播
  //- jq-header.invisible
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
// import JqDownloadHeader from '@/components/jq-download-header/index.vue'
import { reactive } from 'vue'
import { _hotList } from '@/service/modules/live.api'
import { DEFAULT_PAGE_SIZE } from '@/config/system.conf'

const state = reactive({
  list: [],
  loading: true,
  finished: false,
  refreshing: false
})


// 下拉刷新
const onRefresh = () => {
   // 清空列表数据
      state.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      onLoad();
}

// 上拉加载
const onLoad = async () => {
  if (state.refreshing) {
    state.list = []
    state.refreshing = false
  }
  const list = await _hotList()
  state.list = [...state.list, ...list]
  state.loading = false
  if (list.length < DEFAULT_PAGE_SIZE) {
    state.finished = true
  }
    // setTimeout(() => {
    //     if (refreshing.value) {
    //       list.value = [];
    //       refreshing.value = false;
    //     }

    //     for (let i = 0; i < 10; i++) {
    //       list.value.push(list.value.length + 1);
    //     }
    //     loading.value = false;

    //     if (list.value.length >= 40) {
    //       finished.value = true;
    //     }
    //   }, 1000)
}

</script>