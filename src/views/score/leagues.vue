<template lang="pug">
div.leagues.pb-20
    van-sticky
        div.flex.items-center.bg-white.h-44-px.justify-center.box-shadow
            //- img.w-30-px.h-30-px.absolute.left-2.top-2(src="@/assets/logo.png" )
            van-icon.absolute.left-2.top-3.flex.justify-center.items-center(:name="'arrow-left'" size="20px"
             @click="onBack" style="position: absolute;")
            ul.flex.w-258-px.h-24-px.bg-grey.items-center.rounded.bg-opacity-90
                li.flex-1.text-xs.h-full.flex.items-center.justify-center.text-primary(v-for="item in state.tabList" @click="onTab(item)"
                    :key="item.id + ''" :class="{'active': item.id === state.activeTab}") {{item.text}}
    van-loading.text-center.pt-24(type="spinner" v-if="state.loading" color="#000")
    van-checkbox-group(v-model="state.checked" v-if="!state.loading")
      van-index-bar(v-if="!state.loading")
        van-index-anchor(index="A")
        ol.flex.px-2.flex-wrap
            li.border.border-primary.border-opacity-50.w-109-px.h-28-px.flex.items-center.justify-between.text-xs.px-1.mb-2.mx-1(
                v-for="item in state.infoList" :key="item.leagueId" style="border-color:rgba(102, 120, 133, 0.1)")
                p.flex-1.flex.items-center
                    //- img.w-3.h-3.mr-1(src="@/assets/logo.png")
                    van-checkbox.mr-2(:name="item.leagueId" icon-size="15px")
                    span.text-grey-light.text-xs {{item.name}}
                p.text-grey-light.text-xs {{item.count}}

        van-index-anchor(index="B")
        //ol
            li(v-for="item in 10" :key="item")
    div.footer.h-70-px.bg-white.w-full.fixed.bottom-0.left-0.flex.justify-between.items-center.px-4.text-primary
        p.flex.items-center
            span.mr-1.text-md(@click="select('all')") 全选
            span.ml-1.text-md(@click="select('reverse')") 反选
        p.flex.items-center
            span 选择了
            span.mx-1 {{state.checked.length}}
            span 场
            button.w-100-px.h-36-px.flex.justify-center.items-center.ml-4(@click="onConfirm") 确定
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import router from '@/router';
import { _league } from '@/service/modules/score.api'
import { SET_LEGUES, SET_CHECKED } from '@/store/modules/score.store';
import { useStore } from 'vuex';

interface tabItem {
    id: Number,
    text: String
}

interface IInfoItem {
    leagueId: number,
    name: string,
    count: number
}

interface IState {
    activeTab: Number
    tabList: Array<tabItem>,
    infoList: Array<IInfoItem>,
    checked: Array<number>,
    loading: boolean
}

const store = useStore()

// 数据模型
const state: IState = reactive({
    loading: true,
    activeTab: 1,
    tabList: [
        { id: 1, text: '全部' },
        { id: 2, text: '热门' },
        { id: 3, text: '五大联赛' },
        { id: 4, text: '其他' }
    ],
    checked: [], // 复选
    infoList: []
})

onMounted(async () => {
    await store.dispatch(`score/${SET_LEGUES}`)
    state.loading = false
    const { infoList } = store.state.score.leagues
    state.infoList = infoList.sort((prev: IInfoItem, next: IInfoItem) => prev.name.localeCompare(next.name))
    state.checked = store.state.score.checked
})


/***    方法区  */
const onBack = () => {
    router.go(-1)
}
const onTab = (item: tabItem) => {
    state.activeTab = item.id
    // TODO: 过滤数据
}

// 全选， 反选等
const select = (type: String) => {
    if (type === 'all') {
        state.infoList.map(item => {
            if(!state.checked.includes(item.leagueId)) {
                state.checked.push(item.leagueId)
            }
        })
    } else { // 反选
        // const _checked = []
        state.infoList.map(item => {
            if(!state.checked.includes(item.leagueId)) {
                state.checked.push(item.leagueId)
            } else {
                const index = state.checked.findIndex(_item => _item === item.leagueId)
                state.checked.splice(index, 1)
            }
        })
    }
    // console.log('select', type)
}

// 确定
const onConfirm = () => {
    store.commit(`score/${SET_CHECKED}`, state.checked)
    router.go(-1)
}



</script>

<style lang="sass" scoped>
.active, button
    background: url('@/assets/imgs/score/bg-tab@2x.png') no-repeat center center
    background-size: 100% 100%
    color: #fff
</style>