<template lang="pug">
div#search
    van-sticky
        div.flex.justify-between.items-center.bg-white.px-4.text-primary
            van-icon(:name="'arrow-left'" size="20px" @click="route")
            van-search.flex-1(v-model="state.keyword" placeholder="请输入搜索关键词"
                shape="round" right-icon="search" left-icon="''" @update:model-value="onModelValue")
            div(@click="onSearch") 搜索
    div.quick.bg-white.p-4(v-if="!state.showResult")
        div(v-for="(item, index) in state.quickList" :key="index")
            p.text-xm.mt-2.text-primary {{item.title}}
            ul.flex.flex-wrap
                li.text-md.text-grey-light.mt-1(v-for="(_item, _index) in item.list" :key="_index" style="width: 45%" @click="onQuick(_item)") {{_item}}
    //div.list.bg-white.p-4(v-if="!state.showResult && state.keyword")
        ol.flex.flex-col
            li.flex.justify-between.py-2(v-for="(item, index) in 10" :key="item")
                p
                    span.mr-1(style="color: red") {{index + 1}}.
                    span 赛事名称
                img.w-3.h-3(src="@/assets/logo.png")

    van-tabs(color="#072b48" sticky animated v-model:active="state.activeTab" v-if="state.showResult")
        van-tab(v-for="(item, index) in state.tabList" :title="item.text")
    van-list.calc-h(v-model:loading="state.tabList[state.activeTab].loading" :finished="state.tabList[state.activeTab].finished" 
        finished-text="没有更多了" @load="onLoad(state.activeTab)" v-if="state.showResult")
        div.flex.flex-wrap.justify-between.px-2.py-4(v-if="state.activeTab === 0")
            video-list-item(v-for="(item, index) in state.tabList[0]['data']" :key="index" :item="item")
        div.px-2.py-4(v-if="state.activeTab === 1")
            schedule-item(v-for="(item, index) in state.tabList[1]['data']" :key="index" :item="item")
        div.px-2.py-4(v-if="state.activeTab === 2")
            score-item(v-for="(item, index) in state.tabList[2]['data']" :key="index" :score-info="item")
        div.flex.flex-wrap.justify-between.px-2.py-4(v-if="state.activeTab === 3")
            video-list-item(v-for="(item, index) in state.tabList[3]['data']" :key="index" :item="item")

</template>


<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import VideoListItem from '@/components/video-list-item/index.vue' 
import ScheduleItem from '@/components/schedule-item/index.vue'
import ScoreItem from '@/components/score-item/index.vue'
import { useRouter } from "vue-router";
import { _quickList, _searchList, _searchRcommend, _searchArchor } from '@/service/modules/search.api'
import { DEFAULT_PAGE_SIZE } from "@/config/system.conf";

const router = useRouter()

const state = reactive({
    keyword: '', // 搜索关键字
    activeTab: 0,
    showResult: false,
    quickList: {
        comList: { title: '热门赛事', list: []}, // 比赛名称
        teamList: {title: '热门赛队', list: []}, // 赛队名称
        stuList: { title: '热门主播' , list: []}, // 主播名称
    },
    _searchList,
    _searchRcommend,
    _searchArchor,
    tabList : [
        { id: 1, text: '直播', data: [], current: 1, finished: false, loading: false,func: '_searchArchor'},
        { id: 2, text: '赛程', data: [], current: 1, finished: false, loading: false,func: '_searchList' },
        { id: 3, text: '比分', data: [], current: 1, finished: false, loading: false ,func: '_searchList' },
        { id: 4, text: '推荐', data: [], current: 1, finished: false, loading: false, func: '_searchRcommend' },
    ]
})

// 搜索
const onSearch = () => {
    // console.log(state.keyword)
    state.tabList[0].data = []
    state.tabList[0].finished = false
     state.tabList[1].data = []
    state.tabList[1].finished = false
     state.tabList[2].data = []
    state.tabList[2].finished = false
     state.tabList[3].data = []
    state.tabList[3].finished = false
    state.showResult = true
}

const onQuick = (item: string) => {
    state.keyword = item
    onSearch()
}


const onModelValue = () =>{
    // state.showResult = false
    // _searchList(state.keyword).then(data => {
    //     console.log(data)
    // })
}

onMounted(() => { // 快捷数据
    _quickList().then(data => {
        state.quickList.comList.list = data.comList
        state.quickList.teamList.list = data.teamList
        state.quickList.stuList.list = data.stuList
    })
})


const onLoad = async (index: number) => {
    state.tabList[index].loading = true
    const result = await state[state.tabList[index]['func']](state.keyword, state.tabList[index]['current'])
    console.log(index, result)
    state.tabList[index]['data'] = [...state.tabList[index]['data'], ...result]
    state.tabList[index].loading = false
    if (result.length < DEFAULT_PAGE_SIZE) {
        state.tabList[index].finished = true
    } else {
        state.tabList[index]['current']++
    }
}


// back
const route = () => {
    router.go(-1)
}
</script>

<style lang="sass" scoped>
.calc-h
    height: calc(100vh - 98px)
    overflow: scroll
    // background: red
</style>