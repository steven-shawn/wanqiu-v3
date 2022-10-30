<template lang="pug">
div.flex.flex-col.w-l(@click="onItemClick")
  div.relative.h-24.bg-black.text-white.overflow-hidden.rounded
    van-image.h-24.w-full(:src="IMG_URL+item.liveImg")
    span.absolute.w-5.block.top-0.h-5
      van-image(:src="getImageUrl('live@2x.png')" fit="cover")
    span.absolute.right-1.bottom-1.text-xs.block.w-8.h-4
      van-image(:src="getImageUrl('football-label@2x.png')" fit="cover" v-if="item.matchType == 0")
      van-image(:src="getImageUrl('basket-label@2x.png')" fit="cover" v-if="item.matchType == 1")
      span.text-xs.bg-primary.px-1.rounded-full(v-else) 其他
  div.flex.mt-2.mb-4.items-center.w-l
    div.w-8.h-8.rounded-2xl.bg-black.mr-1.flex-shrink-0.overflow-hidden
      van-image.w-8.h-8(:src="IMG_URL+item.memImg" fit="cover" round)
    div.flex.flex-col.flex-1
        p.text-sm.truncate.w-32.text-primary  {{item.studioTitle}}
        div.flex.justify-between.text-xs.text-gray-400
            span.text-grey-light.text-xs {{item.nickName}}
            span
                van-image(:src="getImageUrl('fire@2x.png')" class="w-2.5 h-2.5")
                i.ml-1.not-italic {{filterHeat(item.heatValue)}}
</template>

<script setup lang="ts">
import { IMG_URL } from '@/config/system.conf';
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';

const router = useRouter()
const store = useStore()
const props = defineProps({
  item: {
    type: Object,
    default: {
      id: '', // id
      img: '', // 头像
      nick: '', // 解说员
      live_cover: '', // 封面图
      room_id: '', // 房间id
      room_title: '', // 房间名称
      heat_num: '', // 点击次数
      type: '', // ?
      memIdentityId: ''// 直播间id
    }
  }
})

// 格式化热度值
const filterHeat = computed(() => {
  return (value:any) => {
    if (value >= 10000) {
      props.item.heatValue = (value / 10000).toFixed(2) + 'w'
    }
    return props.item.heatValue
  }
})

const getImageUrl = (name: string) => {
    return new URL(`./${name}`, import.meta.url).href;
}

// 点击进入直播间
const onItemClick = () => {
  console.log(props.item.memIdentityId)
  store.commit('live/SET_ROOM_ID', props.item.memIdentityId)
  router.push(`/live/room?id=${props.item.memIdentityId}`)
}
</script>


<style scoped lang="sass">
.w-l
    // width: 176px
    width: 49%
</style>
