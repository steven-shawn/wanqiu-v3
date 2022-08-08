<template lang="pug">
div.pb-24.bg-grey.h-full.text-primary
  van-sticky
    div.flex.bg-white.text-sm.px-4.box-border.justify-between.items-center.pt-4.pb-2
      div.flex.items-center
        p.flex
          img(src="@/assets/logo.png" class="w-18-px h-18px")
          span.ml-1 选
        p.bg-grey.flex.w-151-px.h-24-px.rounded-full.ml-2.border-1.justify-between.px-2
          input.bg-transparent.w-110-px(placeholder="搜索")
          img.bg-transparent(src="@/assets/logo.png" class="w-18-px h-18px")
      div.flex.w-120-px.h-24-px.bg-grey.items-center.rounded.overflow-hidden
        p.text-sm.w-120-px.h-24-px.flex.justify-center.items-center.rounded(v-for="item in ballTabs" :key="item.id" 
          :class="item.id === form.ball ? 'bg-primary text-white': ''"  @click="onBallChange(item)") {{item.text}}
  van-tabs(color="#072b48" sticky v-model:active="active")
    van-tab(v-for="item in tabList" :title="item.text") 
      div.overflow-y-auto.mt-1.h-full.border
        van-pull-refresh(v-model="refreshing" @refresh="onRefresh")
          van-list(v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad")
            score-item(v-for="i in list" :key="i")
</template>

<script setup lang="ts">
import { Tab, Tabs, Sticky } from 'vant';
import ScoreItem from '@/components/score-item/index.vue'
import { _getScoreList } from '@/service/modules/score.api'

import { onMounted, ref } from 'vue'

const list = ref([])
const refreshing = ref(false)
const loading = ref(false)
const finished = ref(false)

// 足球or篮球
const ballTabs = ref([ // 顶部tab
  {id: 'football', text: '足球' },
  {id: 'basketball', text: '篮球'}
])

// tab
const tabList = ref([
  { id: 1, text: '全部' },
  { id: 2, text: '进行中' },
  { id: 3, text: '已结束' },
  { id: 4, text: '赛程' },
  { id: 5, text: '关注' },
])

// tab active
const active = ref(0)

const form = ref({
  ball: 'football', // 
})

const onBallChange = item => { // 足球和篮球切换
  form.value.ball = item.id
  // TODO: 初始化数据
}

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
  // _getScoreList('').then(data => {
  //   console.log(data)
  // })
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