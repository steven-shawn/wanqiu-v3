<template lang="pug">
ul.flex.fixed.h-14.w-full.bottom-0.z-10.justify-around.items-end
  li.flex.flex-col.items-center(v-for="item in list" :key="item.id" @click="onTab(item)")
    van-image.w-4.h-4(:src="Util.require(`components/jq-tarbar/imgs/icon_${item.bg}${item.active ? '_active': ''}@2x.png`)" :class="{'w-12 h-12 relative rounded-3xl live overflow-hidden': item.id === 3}")
    span(:class=" item.active ? 'text-primary': 'text-grey-light'" style="font-size: 9px;") {{item.text}}
</template>

<script lang="ts" setup>
import Util from '@/utils'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    activeId: {
        type: Number,
        default: 1
    }
})

const list = ref([
    { id: 1, text: '首页', active: props.activeId === 1, router: '/home/index', bg: 'home' },
    { id: 2, text: '比分', active: props.activeId === 2, router: '/score/index', bg: 'score' },
    { id: 3, text: '直播', active: props.activeId === 3, router: '/live/index', bg: 'live' }, // live/index
    { id: 4, text: '赛程', active: props.activeId === 4, router: '/schedule/index', bg: 'schedule' },
    { id: 5, text: '我的', active: props.activeId === 5, router: '/my/index', bg: 'my' }
])

// 点击tab
const onTab = (item) => {
    list.value.map(val => {
        if (val.active) {
            val.active = false
        }
        if (item.id === val.id) {
            val.active = true
        }
    })
    router.push(item.router)
}
</script>

<style scoped lang="sass">
ul
  background: url('./imgs/bg@2x.png') no-repeat center bottom
  background-size: 100% 100%
  .live
    box-shadow: 0 5px 5px 0 rgb(213 0 28 / 50%)
    transform: translateY(-12px)
    width: 48px
    height: 48px
</style>
