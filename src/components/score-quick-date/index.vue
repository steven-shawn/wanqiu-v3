<template lang="pug">
div#quick-date.flex.box-border.items-center.w-full.h-46-px.bg-white.shadow
  ul.flex.justify-between.pl-2
    li.flex.flex-col.w-56-px.h-30-px.mr-2.justify-center.items-center.py-2.rounded(v-for="(item, index) in list"
      :key="index" :class="index === idx ? 'bg-dark text-grey' : 'bg-grey .text-primary'" @click="onItemClick(index)")
      span.text-xs.pt-1(v-if="index !== 0 || true") {{item.date}}
      span.text-xs.pb-1 {{item.day}}
  p.flex.w-30-px.h-30-px.bg-slate-500.ml-1.rounded.flex.justify-center.items-center(@click="emits('showCalendar')")
    img.w-16-px.h-16px(src="@/assets/imgs/icon_calender@2x.png")
</template>

<script lang="ts" setup>
import { Notify } from "vant";
import { computed, ref  } from "vue";


interface Props {
    chooseDay?: Date
}

// index
const idx = ref(0)

// props
const props = withDefaults(defineProps<Props>(), {
    chooseDay: new Date()
})

const oneDay = 24 * 60 * 60 * 1000 // 1天的毫秒数
// emits
const emits = defineEmits(['showCalendar', 'choose'])

// computed
const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const list = computed(() => {
    // const nowTime = new Date().getTime()
    // console.log(props.chooseDay)
    const _list = []
    
    let i = 0
    let len = 5
    // const diffDay = props.chooseDay?.getTime() - new Date().getTime()
    
    console.log('结果', _calcDays(new Date(), new Date(props.chooseDay)))
    
    // if ( diffDay < oneDay) { // 1天
    //     // console.log(diffDay)
    //     i = 0
    //     len = 5
    // }
    for (; i < len; i++) {
        const cur = new Date(props.chooseDay?.getTime() + i * oneDay)
        _list.push({
            date: cur.getMonth() + 1 + '/' + cur.getDate(),
            day: days[cur.getDay()]
        })
    }
    return _list
})

// 计算两天相差
const _calcDays = (now: Date, choose: Date) => {
    return Math.abs(Math.floor((now.getTime() - choose.getTime()) / oneDay))
}

const onItemClick = (index:number) => {
    if (idx.value === index) {
        return
    }
    idx.value = index
    // const _today: Date = new Date()
    // let today = [_today.getMonth() + 1, _today.getDate()]
    // const clickDay: any = list.value[index].date.split('/')
    // if (clickDay[0] - today[0] < 0 || clickDay[1] - today[1] < 0) { // 月份小于
    //     Notify({type: 'warning', message: '时间不能早于当天'})
    //     return
    // }
    emits('choose', index)
    // if (index !== 2) {
        
    // }
}

</script>

<style scoped lang="sass">
.bg-grey
    background: #e9eef2
.bg-dark
    background: #072b48
</style>