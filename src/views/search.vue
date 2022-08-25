<template lang="pug">
div#search
    van-sticky
        div.flex.justify-between.items-center.bg-white.px-4.text-primary
            van-icon(:name="'arrow-left'" size="20px" @click="route")
            van-search.flex-1(v-model="state.keyword" placeholder="请输入搜索关键词" shape="round" right-icon="search" left-icon="''")
            div 搜索
    div.quick.bg-white.p-4(v-if="!state.keyword")
        div(v-for="item in 3" :key="3")
            p.text-xm.mt-2 热门赛事
            ul.flex.flex-wrap
                li.text-md.text-grey-light.mt-1(v-for="item in 4" :key="item" style="width: 45%") 赛事名字
    div.list.bg-white.p-4
        ol.flex.flex-col
            li.flex.justify-between.py-2(v-for="(item, index) in 10" :key="item") 
                p
                    span.mr-1(style="color: red") {{index + 1}}.
                    span 赛事名称
                img.w-3.h-3(src="@/assets/logo.png")

    van-tabs(color="#072b48" sticky animated v-model:active="state.activeTab")
        van-tab(v-for="(item, index) in tabList" :title="item.text")
            div.flex.flex-wrap.justify-between.px-2.py-4(v-if="state.activeTab === 0")
                video-list-item(v-for="item in 20" :key="item" :item="{}")
            div.px-2.py-4(v-if="state.activeTab === 1")
                schedule-item(v-for="i in 20" :key="i")
            div.px-2.py-4(v-if="state.activeTab === 2")
                score-item(v-for="(item) in 20" :key="item" :score-info="{}")
            div.flex.flex-wrap.justify-between.px-2.py-4(v-if="state.activeTab === 3")    
                video-list-item(v-for="item in 10" :key="item" :item="{}")

</template>


<script lang="ts" setup>
import { Sticky, Search, Icon, Tabs, Tab } from "vant"
import { reactive } from "vue";
import VideoListItem from '@/components/video-list-item/index.vue' 
import ScheduleItem from '@/components/schedule-item/index.vue'
import ScoreItem from '@/components/score-item/index.vue'
import { useRouter } from "vue-router";

const router = useRouter()

const state = reactive({
    keyword: '', // 搜索关键字
    activeTab: 0,
    showResult: false
})



const tabList = [
  { id: 1, text: '直播', data: [], refreshing: false, finished: false, loading: false,func: '_getScoreList', param: '' },
  { id: 2, text: '赛程', data: [], refreshing: false, finished: false, loading: false,func: '_getScoreList', param: 0 },
  { id: 3, text: '比分', data: [], refreshing: false, finished: false, loading: false ,func: '_getScoreList', param: 2 },
  { id: 4, text: '推荐', data: [], refreshing: false, finished: false, loading: false },
]

// 搜索
const onSearch = () => {
    console.log(state.keyword)
    state.showResult = true
}
// back
const route = () => {
    router.go(-1)
}
</script>