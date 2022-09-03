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
    van-tabs(color="#072b48" sticky animated v-model:active="state.active" @change="onChange")
      van-tab(v-for="item in (state.form.dataType !== 'f' ? state.tabList : state.tabList.filter(item => item.id !==2))" :title="item.text")
    score-quick-date(@showCalendar="state.show = true" :chooseDay="state.currentDate" @choose="onChoose")
  div.overflow-y-auto.mt-1.h-full.px-4.mt-3
    van-pull-refresh(v-model="refreshing" @refresh="onRefresh")
        van-list(v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad")
            schedule-item(v-for="(item, index) in state.list" :key="index" :item="item")
</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'
import ScoreTitle from '@/components/score-title/index.vue'
import ScheduleItem from '@/components/schedule-item/index.vue'
import ScoreQuickDate from '@/components/score-quick-date/index.vue'
import { DatetimePicker, Popup } from 'vant';
import { _getScoreList } from '@/service/modules/schedule.api'
import { onMounted, reactive, ref } from 'vue'

// 足球or篮球
const dataTypes = [ // 顶部tab
  {id: 'f', text: '足球' },
  {id: 'b', text: '篮球'}
]
const PAGE_SIZE = 100

const getLimitDay = (today:number, days:number) => {
  const newDay = new Date(today + days * 24 * 60 * 60 * 1000)
  const result = [newDay.getFullYear(), newDay.getMonth() + 1, newDay.getDate()]
  // console.log(result)
  return result
}
const today = new Date().getTime()

let min = getLimitDay(today,  -30)
let max = getLimitDay(today,  30)

// 数据区
const state = reactive({
   tabList: [
    { id: 1, text: '全部',  param: '' },
    { id: 2, text: 'NBA',  param: 4 },
    { id: 3, text: '热门',  param: '', isHot: 1 },
    { id: 4, text: '进行中',  param: 0 },
  // { id: 5, text: '关注',  func: '_focusList' }
  ],
  active: '1',
  show: false,
  currentDate: new Date(),
  minDate: new Date(min),
  maxDate: new Date(max),
  list: [],
  form: {
    dataType: 'f',
    matchStateStr: '', // 比赛状态 0 进行中、1 未开始、2 已完成、3 异常,
    queryDate: today,
    leagueIds: [],
    isHot: false,
    current: 1,
    size: PAGE_SIZE
  }
})

const refreshing = ref(false)
const loading = ref(false)
const finished = ref(false)


/******  方法区 **** */

const onChange = () => {
  console.log(state.active)
  let index = state.active / 1
  if (state.form.dataType === 'f' && state.active > 0) {
    index = state.active / 1 + 1
  }
  console.log(index, state.tabList[index])
  state.form.matchStateStr = state.tabList[index].param
  state.form.isHot = state.tabList[index].isHot
  onRefresh()
}
const onDateConfirm = e => {
  state.currentDate = new Date(e)
   min = getLimitDay(state.currentDate.getTime(),  -30)
   max = getLimitDay(state.currentDate.getTime(),  30)
  state.minDate = new Date(min.join(','))
  state.maxDate = new Date(max.join(','))
  state.show = false
  // const index = 3
  state.list = []
  finished.value = false
  loading.value = true
  state.form.current = 1
  onLoad()
}
const onfilter = () => { // 过滤联赛
  console.log(1111)
}

const onBallChange = (item) => { // 足球篮球切换
  state.form.dataType = item.id
  onRefresh()
  // TODO: 获取数据
}


const onChoose = (index: number) => {
  const newDate =  getLimitDay(new Date(state.currentDate).getTime(),  index)
  onDateConfirm(newDate)
}
// 下拉刷新
const onRefresh = () => {
   // 清空列表数据
      finished.value = false;
      state.list = []
      state.form.current = 1
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true;
      onLoad();
}

// 上拉加载
const onLoad = () => {
    _getScoreList(state.form).then(data => {
      if (refreshing.value) {
        refreshing.value = false;
      }
      state.list = [...state.list,...data]
      if (data.length < PAGE_SIZE) {
        finished.value = true
      } else {
        state.form.current++
      }
      loading.value = false
    })
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

const liveList = ref([])

onMounted(async () => {
  // const result = await _getScoreList(state.form)
  // console.log(result)
})


</script>