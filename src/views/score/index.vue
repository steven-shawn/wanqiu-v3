<template lang="pug">
div.pb-24.bg-grey.h-full.text-primary
  van-popup.w-full(v-model:show="state.show" position="bottom")
    van-datetime-picker.w-full(v-model="state.currentDate" type="date"
      title="选择年月日" :min-date="state.minDate" :max-date="state.maxDate" @confirm="onDateConfirm" @cancel="state.show = false")
  van-sticky
      jq-download-header
  //van-sticky
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
  van-tabs(color="#072b48" sticky offset-top="68" animated v-model:active="state.active")
    van-tab(v-for="(item, index) in state.tabList" :title="item.text" :disabled="index===4")
      div.overflow-y-auto.mt-1.h-full.border(style="min-height: 70vh; max-height: calc(100vh - 112px);")
        van-sticky(:offset-top="0" v-if="index === 3")
          score-quick-date(@showCalendar="state.show = true" :chooseDay="state.pickerDate" @choose="onChoose")
        van-pull-refresh(v-model="item.refreshing" @refresh="onRefresh(index)")
          van-list(v-model:loading="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad(index)")
            score-item(v-for="(_item,_index) in item.data" :key="_index" :score-info="_item")
</template>

<script setup lang="ts">
import ScoreItem from '@/components/score-item/index.vue'
import ScoreQuickDate from '@/components/score-quick-date/index.vue'
import JqDownloadHeader from '@/components/jq-download-header/index.vue'
import { _getScoreList, _focusList } from '@/service/modules/score.api'

import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter()

/********* 接口声明区 **********/
interface IDataType {
  id: String,
  text: String
}

const store = useStore()


const getLimitDay = (today:number, days:number) => {
  const newDay = new Date(today + days * 24 * 60 * 60 * 1000)
  const result = [newDay.getFullYear(), newDay.getMonth() + 1, newDay.getDate()]
  // console.log(result)
  return result.join('/')
}

const today = new Date().getTime()
let min = getLimitDay(today,  0)
let max = getLimitDay(today,  30)

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
  pickerDate: new Date(),
  minDate: new Date(min),
  maxDate: new Date(max),
  // chooseDay: today, // 选择的那一天
  show: false,
  form: {
    startTime: new Date(),
    leagueIds: [],
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
const onDateConfirm = (date:Date,flag = true) => {
  if (flag) {
    state.currentDate = new Date(date)
    state.pickerDate = state.currentDate
  }
  
  //  min = getLimitDay(state.currentDate.getTime(),  -30)
  //  max = getLimitDay(state.currentDate.getTime(),  30)
  state.minDate = new Date(min)
  state.maxDate = new Date(max)
  state.show = false
  const index = 3
  state.tabList[index].data = []
  state.tabList[index].finished = false
  state.tabList[index].loading = true
  state.form.startTime = new Date(date)
  onLoad(index)
}

// date
const onChoose = (index: number) => {
  const newDate =  getLimitDay(new Date(state.currentDate).getTime(),  index)
  onDateConfirm(newDate, false)
}

const onBallChange = (item:IDataType) => { // 足球和篮球切换
  state.form.dataType = item.id
  onLoad(state.active)
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
    state.form.leagueIds = store.state.score.checked
    let data = {matchStateStr: state.tabList[index].param, ...state.form}
    if (index === 3) {
      // data.startTime = state.currentDate
    } else {
      data.startTime = ''
    }
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

// 联赛过滤
const onfilter = () => {
  router.push('/score/leagues')
}

</script>