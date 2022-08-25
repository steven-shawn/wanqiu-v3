<template lang="pug">
div.leagues
    van-sticky
        div.flex.items-center.bg-white.h-44-px.justify-center.box-shadow
            //- img.w-30-px.h-30-px.absolute.left-2.top-2(src="@/assets/logo.png" )
            van-icon.absolute.left-2.top-3.flex.justify-center.items-center(:name="'arrow-left'" size="20px" @click="onBack" style="position: absolute;")
            ul.flex.w-258-px.h-24-px.bg-grey.items-center.rounded.bg-opacity-90
                li.flex-1.text-xs.h-full.flex.items-center.justify-center.text-primary(v-for="item in state.tabList" @click="onTab(item)"
                    :key="item.id + ''" :class="{'active': item.id === state.activeTab}") {{item.text}}
    van-index-bar
        van-index-anchor(index="A")
        ol.flex.px-2.flex-wrap
            li.border.border-primary.border-opacity-50.w-109-px.h-28-px.flex.items-center.justify-between.text-xs.px-1.mb-2.mx-1(v-for="item in 10" :key="item")
                p.flex-1.flex.items-center
                    img.w-3.h-3.mr-1(src="@/assets/logo.png")
                    span 爱沙女甲
                p 5

        van-index-anchor(index="B")
        ol
            li(v-for="item in 10" :key="item")
    div.footer.h-70-px.bg-white.w-full.fixed.bottom-0.left-0.flex.justify-between.items-center.px-4.text-primary
        p.flex.items-center
            span.mr-1.text-md(@click="select('all')") 全选
            span.ml-1.text-md(@click="select('reverse')") 反选
        p.flex.items-center 
            span 选择了
            span.mx-1 0
            span 场地
            button.w-100-px.h-36-px.flex.justify-center.items-center.ml-4 确定                        
</template>

<script lang="ts" setup>
import { IndexBar, IndexAnchor, Sticky, Cell, Icon } from 'vant';
import { reactive } from 'vue';
import router from '../../router';

interface tabItem {
    id: Number,
    text: String
}

interface stateInter {
    activeTab: Number
    tabList: Array<tabItem>
}

// 数据模型
const state: stateInter = reactive({
    activeTab: 1,
    tabList: [
        { id: 1, text: '全部' },
        { id: 2, text: '热门' },
        { id: 3, text: '五大联赛' },
        { id: 4, text: '其他' }
    ]
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
    console.log('select', type)
}



</script>

<style lang="sass" scoped>
.active, button
    background: url('@/assets/imgs/score/bg-tab@2x.png') no-repeat center center
    background-size: 100% 100%
    color: #fff
</style>