<template lang="pug">
div#charge(@click="toggleShow('')")
  jq-header.relative 充值明细
  van-popup.w-full(v-model:show="state.show" position="bottom")
    van-datetime-picker.w-full(v-model="state.currentDate" type="date" 
      title="选择年月日" :min-date="state.minDate" :max-date="state.maxDate" @confirm="onDateConfirm" @cancel="state.show = false")
  van-sticky.mt-2
    div.flex.bg-white.py-2.px-4.w-full
        div.drop-box.bg-grey.text-xs.mr-4.flex.items-center.rounded.relative
          p.flex.items-center.justify-between.px-2.w-full(@click.stop="toggleShow('dirct')")
           span {{state.direction}}
           img.w-3.h-3(src="@/assets/imgs/my/icon_drop@2x.png")
          transition(name="van-fade" :duration="0.3") 
            ul.bg-white.shadow-md.absolute.w-full.py-2(style="top: 100%" v-if="state.showDirect")
                li.py-2.px-2.text-sm(v-for="item in state.directActions" :key="item.id" @click="onSelect('dirct', item)") {{item.text}}
        div.drop-box.bg-grey.text-xs.mr-4.flex.items-center.rounded.relative
          p.flex.items-center.justify-between.px-1.w-full(@click.stop="toggleShow('cate')")
           span {{state.cate}}
           img.w-3.h-3(src="@/assets/imgs/my/icon_drop@2x.png")
          transition(name="van-fade" :duration="0.3") 
            ul.bg-white.shadow-md.absolute.w-full.py-2(style="top: 100%" v-if="state.showCate")
                li.py-2.px-2.text-sm(v-for="item in state.cateActions" :key="item.id" @click="onSelect('cate', item)") {{item.text}}
        div.w-8.h-8.bg-primary.absolute.right-4.rounded.flex.justify-center.items-center
          img.w-4.h-4(src="@/assets/imgs/icon_calender@2x.png" @click="state.show = true")
  van-list(v-model:loading="state.loading" :finished="state.finished" @load="onLoad" finished-text="没有更多了")
    div.flex.flex-col.bg-white.pt-4.pb-2.mt-2(v-for="item in 4" :key="item")
        div.flex.justify-between.items-center.px-4
            div.flex.items-center
                img.w-8.h-8.rounded-full.mr-2.border(src="@/assets/logo.png")
                div.text-xs
                    p.text-primary 礼物消费
                    p.text-grey-light.mt-1 2021-11-11 12:12:50
            div.flex.flex-col.text-xs.items-center
                p.text-green-light.text-center -998
                p.text-blue-light.mt-1 交易成功
        div.bg-grey-lighter.mt-2.pl-12.text-xs.py-2.text-primary(v-if="true")
            p 订单编号:jq2022010823100100
            p.mt-2 直播间ID:105862          
        div.flex.w-full.justify-center.items-center.mt-2(@click="toggleMore(item)") 
            span.text-grey-light.text-xs 更多数据
            img.w-3.h-3.ml-1.rotate-180(src="@/assets/imgs/icon_down@2x.png")
        
</template>

<script lang="ts" setup>
import JqHeader from '@/components/jq-header/index.vue'
import { reactive } from '@vue/reactivity';

interface IAction {
    id: number,
    text: String
}

const state = reactive({
    show: false,
    currentDate: new Date(),
    minDate: new Date(2000, 1,1),
    maxDate: new Date(2025,1,1),

    showDirect: false,
    directActions: [
      { id: 1, text: '全部' },
      { id: 2, text: '收入' },
      { id: 3, text: '支出' },
    ],
    direction: '全部', // 收入还是指出
    showCate: false, // 显示详细类别
    cateActions: [
        { id: 1, text: '全部' },
        { id: 2, text: '管理员扣减' },
        { id: 3, text: '发红包' },
        { id: 4, text: '购买贵族' },
        { id: 5, text: '续费贵族' },
    ],
    cate: '全部',
    loading: false,
    finished: true
})

const onLoad = () => {
    console.log(111)
}

const onDateConfirm = () => {
    state.show = false
}

// 切换
const toggleShow = (type: string) => {
    if (type === 'dirct') {
        state.showCate = false
        state.showDirect = !state.showDirect
    } else if (type === 'cate') {
        state.showDirect = false
        state.showCate = !state.showCate
    } else { // 清理
        state.showCate = false
        state.showDirect = false
    }
}

// 显示更多
const toggleMore = (item) => {
    console.log(item)
}

// 选择下拉
const onSelect = (type: string, item:IAction) => {
    if (type === 'dirct') {
        state.direction = item.text
    } else {
        state.cate = item.text
    }
    state.showCate = false
    state.showDirect = false
}
</script>

<style lang="sass" scoped>
.drop-box
    width: 130px
    height: 32px
</style>