<template lang="pug">
div.pb-20.bg-gray-100.h-full.relative
  van-popup.w-full(v-model:show="state.show" position="bottom")
    van-datetime-picker.w-full(v-model="state.currentDate" type="date" 
      title="选择年月日" :min-date="state.minDate" :max-date="state.maxDate" @confirm="onDateConfirm" @cancel="state.show = false")
  van-sticky
    div.flex.bg-white.text-sm.px-4.box-border.justify-between.items-center.pt-4.pb-2
      div.flex.items-center
        p.flex(@click="onfilter")
          img(src="@/assets/imgs/icon_set@2x.png" class="w-18-px h-18px")
      div.flex.w-120-px.h-24-px.bg-grey.items-center.rounded.overflow-hidden
        p.text-sm.w-120-px.h-24-px.flex.justify-center.items-center.rounded(v-for="item in dataTypes" :key="item.id" 
          :class="item.id === state.form.dataType ? 'bg-primary text-white': ''"  @click="onBallChange(item)") {{item.text}}
      img(src="@/assets/imgs/icon_filter@2x.png" class="w-18-px h-18px")
    van-tabs(color="#072b48" sticky animated v-model:active="state.active")
      van-tab(v-for="(item, index) in tabList" :title="item.text") 
    score-quick-date(@showCalendar="state.show = true" :chooseDay="state.chooseDay")  
  div.overflow-y-auto.mt-1.h-full.px-4.mt-3
    van-pull-refresh(v-model="refreshing" @refresh="onRefresh")
        van-list(v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad")
            schedule-item(v-for="i in list" :key="i") 
</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'
import ScoreTitle from '@/components/score-title/index.vue'
import ScheduleItem from '@/components/schedule-item/index.vue'
import ScoreQuickDate from '@/components/score-quick-date/index.vue'
import { DatetimePicker, Popup } from 'vant';

import { onMounted, reactive, ref } from 'vue'

// 足球or篮球
const dataTypes = [ // 顶部tab
  {id: 'f', text: '足球' },
  {id: 'b', text: '篮球'}
]

const tabList = [
  { id: 1, text: '全部', data: [], refreshing: false, finished: false, loading: false,func: '_getScoreList', param: '' },
  { id: 2, text: '热门', data: [], refreshing: false, finished: false, loading: false,func: '_getScoreList', param: 0 },
  { id: 3, text: '进行中', data: [], refreshing: false, finished: false, loading: false ,func: '_getScoreList', param: 2 },
  { id: 4, text: 'NBA', data: [], refreshing: false, finished: false, loading: false },
  // { id: 5, text: '关注', data: [], refreshing: false, finished: false, loading: false, func: '_focusList' }
]

// 数据区
const state = reactive({
  active: '1',
  show: false,
  currentDate: new Date(),
  minDate: new Date(2022, 0, 1),
  maxDate: new Date(2023, 0, 1),
  chooseDay: new Date().getTime(), // 选择的那一天
  form: {
    dataType: 'f'
  }
})

const list = ref([])
const refreshing = ref(false)
const loading = ref(false)
const finished = ref(false)


/******  方法区 **** */

const onDateConfirm = () => {
  console.log('on date confirm')
  // TODO: change time
  state.show = false
}
const onfilter = () => { // 过滤联赛
  console.log(1111)
}

const onBallChange = (item) => { // 足球篮球切换
  state.form.dataType = item.id
  // TODO: 获取数据
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