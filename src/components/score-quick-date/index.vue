<template lang="pug">
div#quick-date.flex.box-border.items-center.w-full.h-46-px.bg-white.shadow
  ul.flex.justify-between.pl-2
    li.flex.flex-col.w-56-px.h-30-px.mr-2.justify-center.items-center.py-2.rounded(v-for="(item, index) in list"
      :key="index" :class="index === 2 ? 'bg-dark text-grey' : 'bg-grey .text-primary'")
      span.text-xs.pt-1(v-if="index !== 2") {{item.date}}
      span.text-xs.pb-1 {{item.day}}
  p.flex.w-30-px.h-30-px.bg-slate-500.ml-1.rounded.flex.justify-center.items-center(@click="emits('showCalendar')")
    img.w-16-px.h-16px(src="@/assets/imgs/icon_calender@2x.png")
</template>

<script lang="ts" setup>
import { reactive, onMounted, computed  } from "vue";
const state = reactive({
    list: [],
    show: false, // 显示时间组件
})

interface Props {
    chooseDay?: number
}

// props
const props = withDefaults(defineProps<Props>(), {
    chooseDay: new Date().getTime()
})


// emits
const emits = defineEmits<{
    (e: 'showCalendar'): void
}>()

// computed
const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const list = computed(() => {
    // const nowTime = new Date().getTime()
    // console.log(props.chooseDay)
    const _list = []
    const oneDay = 24 * 60 * 60 * 1000
    for (let i = -2; i < 3; i++) {
        const cur = new Date(props.chooseDay + i * oneDay)
        _list.push({
            date: cur.getMonth() + 1 + '/' + cur.getDate(),
            day: days[cur.getDay()]
        })
    }
    return _list
})

// 处理日期

// onMounted(() => {
//     const nowTime = new Date().getTime()
//     const oneDay = 24 * 60 * 60 * 1000
//     for (let i = -2; i < 3; i++) {
//         const cur = new Date(nowTime + i * oneDay)
//         state.list.push({
//             date: cur.getMonth() + 1 + '/' + cur.getDate(),
//             day: days[cur.getDay()]
//         })
//     }
// })

const onConfirm = () => {
    console.log(1111)
}

</script>

<style scoped lang="sass">
.bg-grey
    background: #e9eef2
.bg-dark
    background: #072b48
</style>