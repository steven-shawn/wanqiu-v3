<template lang="pug">
div.pb-2.pt-11.bg-gray-100.h-full 
  jq-header.fixed 我的预约
  div.overflow-y-auto.mt-1.h-full.px-4
    van-pull-refresh(v-model="refreshing" @refresh="onRefresh")
        van-list(v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad")
            schedule-item(v-for="i in list" :key="i") 
</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'
import ScheduleItem from '@/components/schedule-item/index.vue'

import { onMounted, ref } from 'vue'

const list = ref([])
const refreshing = ref(false)
const loading = ref(false)
const finished = ref(false)


// 下拉刷新
const onRefresh = () => {
   // 清空列表数据
      finished.value = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true;
      onLoad();
}

// 上拉加载
const onLoad = () => {
    setTimeout(() => {
        if (refreshing.value) {
          list.value = [];
          refreshing.value = false;
        }

        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1);
        }
        loading.value = false;

        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000)
}

const liveList = ref([])

onMounted(() => {
 
})


</script>