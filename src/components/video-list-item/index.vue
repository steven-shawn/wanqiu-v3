<template lang="pug">
div.flex.flex-col.w-l(@click="onItemClick")
  div.relative.h-24.bg-black.text-white.overflow-hidden.rounded
    van-image.h-24.w-full(:src="item.live_cover")
    span(class="absolute block w-6 h-2.5 top-1")
      van-image(:src="Util.$require('components/video-list-item/live@2x.png')" class="w-6 h-2.5"  fit="cover")    
    span(class="absolute right-1 bottom-1 text-xs") 足球
  div.flex.mt-2.mb-4.items-center.w-l
    div.w-8.h-8.rounded-2xl.bg-black.mr-1.flex-shrink-0.overflow-hidden
      van-image.w-8.h-8(:src="item.img" fit="cover" round)
    div.flex.flex-col.flex-1 
        p.text-sm.truncate.w-32  {{item.room_title}} 
        div.flex.justify-between.text-xs.text-gray-400
            span {{item.nick}} 
            span 
                van-image(:src="Util.$require('components/video-list-item/fire@2x.png')" class="w-2.5 h-2.5")
                i.ml-1.not-italic {{item.heat_num}}
</template>


<script setup lang="ts">
import Util from '@/utils'
import { useRouter } from 'vue-router'

const router = useRouter()
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
      type: '' // ?
    }
  }
})

// 点击进入直播间
const onItemClick = () => {
  router.push(`/live/room?id=${props.item.id}`)
}
</script>


<style scoped lang="sass">
.w-l
    width: 176px
</style>