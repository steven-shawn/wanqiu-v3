<template lang="pug">
div.pb-2.pt-11.bg-gray-100.h-full
  jq-header.fixed 我的预约
  div.overflow-y-auto.mt-1.h-full.px-4
    van-pull-refresh(v-model="refreshing" @refresh="onRefresh")
        van-list(v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad")
            schedule-item.mt-2(v-for="(item, index) in list" :key="index" :item="item")
</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'
import ScheduleItem from '@/components/schedule-item/index.vue'

import {_reserveList } from '@/service/modules/schedule.api'
import { DEFAULT_PAGE_SIZE } from '@/config/system.conf'

import { onMounted, ref } from 'vue'

const list = ref([])
const refreshing = ref(false)
const loading = ref(false)
const finished = ref(false)
const current = ref(1)


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
const onLoad = async () => {
    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }
    const data = await _reserveList(current.value)
    list.value = [...list.value, ...data]
    loading.value = false;
    if (list.value.length < DEFAULT_PAGE_SIZE) {
      finished.value = true;
    } else {
      current.value = current.value + 1
    }
}


// onMounted(() => {
//  _reserveList().then(data => {
//    console.log(data)
//  })
// })


</script>