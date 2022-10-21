<template lang="pug">
div#quick-date.flex.box-border.items-center.w-full.h-46-px.bg-white.shadow
  ul.flex.justify-between.pl-2
    li.flex.flex-col.w-56-px.h-30-px.mr-2.justify-center.items-center.py-2.rounded(v-for="(item, index) in list"
      :key="index" :class="index === idx ? 'bg-dark text-grey' : 'bg-grey .text-primary'" @click="onItemClick(index)")
      span.text-xs.pt-1 {{item.date}}
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
    idx.value = 0
    const _list = []
    for (let i = 0; i < 5; i++) {
        const cur = new Date(props.chooseDay?.getTime() + i * oneDay)
        const isTody = _calcDays(new Date(), cur) === 0
        _list.push({
            date: isTody ? '今日' : cur.getMonth() + 1 + '/' + cur.getDate(),
            day: isTody ? '' : days[cur.getDay()]
        })
    }
    return _list
})

// 计算两天相差
const _calcDays = (now: Date, choose: Date) => {
    return Math.abs(Math.floor((now.getTime() - choose.getTime()) / oneDay))
}

// 快捷日期
const onItemClick = (index:number) => {
    if (index === idx.value) {
        return
    }
    idx.value = index
    emits('choose', index)
}

</script>

<style scoped lang="sass">
.bg-grey
    background: #e9eef2
.bg-dark
    background: #072b48
</style>