<template lang="pug">
div.pb-24.bg-grey.h-full.text-primary
  //- van-calendar(v-model:show="state.show" @confirm="onConfirm")
  van-popup.w-full(v-model:show="state.show" position="bottom")
    van-datetime-picker.w-full(v-model="state.currentDate" type="date" 
      title="选择年月日" :min-date="state.minDate" :max-date="state.maxDate" @confirm="onDateConfirm" @cancel="state.show = false")
  van-sticky
    div.flex.bg-white.text-sm.px-4.box-border.justify-between.items-center.pt-4.pb-2
      div.flex.items-center
        p.flex(@click="onfilter")
          img(src="@/assets/imgs/icon_filter@2x.png" class="w-18-px h-18px")
          span.ml-1 选
        p.bg-grey.flex.w-151-px.h-24-px.rounded-full.ml-2.border-1.justify-between.px-2.items-center(@click="route('/search')")
          input.bg-transparent.w-110-px(disabled placeholder="搜索")
          img.bg-transparent(src="@/assets/imgs/icon_search@2x.png" class="w-12-px h-12-px")
      div.flex.w-120-px.h-24-px.bg-grey.items-center.rounded.overflow-hidden
        p.text-sm.w-120-px.h-24-px.flex.justify-center.items-center.rounded(v-for="item in dataTypes" :key="item.id" 
          :class="item.id === state.form.dataType ? 'bg-primary text-white': ''"  @click="onBallChange(item)") {{item.text}}
      img(src="@/assets/imgs/icon_set@2x.png" class="w-18-px h-18px" @click="route('/score/setting')")
  van-tabs(color="#072b48" sticky animated v-model:active="state.active")
    van-tab(v-for="(item, index) in state.tabList" :title="item.text")
      div.overflow-y-auto.mt-1.h-full.border(style="min-height: 70vh")
        van-sticky(:offset-top="50" v-if="index === 3")
          score-quick-date(@showCalendar="state.show = true" :chooseDay="state.chooseDay")
        van-pull-refresh(v-model="item.refreshing" @refresh="onRefresh(index)")
          van-list(v-model:loading="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad(index)")
            score-item(v-for="(_item,_index) in item.data" :key="_index" :score-info="_item")
</template>

<script setup lang="ts">
import { Tab, Tabs, Sticky, Popup, DatetimePicker } from 'vant';
import ScoreItem from '@/components/score-item/index.vue'
import ScoreQuickDate from '@/components/score-quick-date/index.vue'
import { _getScoreList, _focusList } from '@/service/modules/score.api'

import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()

/********* 接口声明区 **********/
interface IDataType {
  id: String,
  text: String
}

/******* 数据区 *****/ 
const state = reactive({
  tabList: [ // tabs
    { id: 1, text: '全部', data: [], refreshing: false, finished: false, loading: false,func: '_getScoreList', param: '' },
    { id: 2, text: '进行中', data: [], refreshing: false, finished: false, loading: false,func: '_getScoreList', param: 0 },
    { id: 3, text: '已结束', data: [], refreshing: false, finished: false, loading: false ,func: '_getScoreList', param: 2 },
    { id: 4, text: '赛程', data: [], refreshing: false, finished: false, loading: false },
    { id: 5, text: '关注', data: [], refreshing: false, finished: false, loading: false, func: '_focusList' }
  ],
  active: 0, // 当前tab
  currentDate: new Date(),
  minDate: new Date(2022, 0, 1),
  maxDate: new Date(2023, 0, 1),
  chooseDay: new Date().getTime(), // 选择的那一天
  show: false,
  form: {
    dataType: 'f' // 'f' - 足球 'b' - 篮球
  }
})


const route = (path: string) => {
  router.push(path)
}

// 足球or篮球
const dataTypes = [ // 顶部tab
  {id: 'f', text: '足球' },
  {id: 'b', text: '篮球'}
]

// 选择日期
const onDateConfirm = () => {
  console.log(1111)
  state.show = false
}

const onBallChange = (item:IDataType) => { // 足球和篮球切换
  state.form.dataType = item.id
  // TODO: 初始化数据
}

// 下拉刷新
const onRefresh = (index: number) => {
      state.tabList[index].finished = false;
      state.tabList[index].data = []
      state.tabList[index].loading = true;
      onLoad(index);
}

// 获取数据
const onLoad = (index: number) => {
    const currentTag = state.tabList[index]
    let func = _getScoreList
    let data = {matchStateStr: state.tabList[index].param}
    if (index === 4) {
      func = _focusList
      data = state.form.dataType
    }
    func(data).then(data => {
      if (state.tabList[index].refreshing) {
          state.tabList[index].refreshing = false;
        }
      state.tabList[index].loading = false
      state.tabList[index].data = data
      state.tabList[index].finished = true
    })
}

const onConfirm = (e: Date) => { // 选择日期
  state.chooseDay = new Date(e).getTime()
  state.show = false
}

// 联赛过滤
const onfilter = () => {
  router.push('/score/leagues')
}

</script>