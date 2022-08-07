<template lang="pug">
div.flex.justify-between.items-center.h-9.text-xs
   div.flex.items-center
    van-image.w-5.h-5.mr-1(:src="Util.$require(`components/video-list-title/${type}@2x.png`)")
    strong.text-sm {{ type === 'hot' ? '热门' : '正在' }}直播
   div.flex.items-center
    span.text-red-600(:class="{'hidden': type !== 'hot'}") 当前有{{count}}个热门直播
    span.ml-2(@click="onMore")  查看更多
       van-icon(name="arrow")
    

</template>


<script lang="ts" setup>
import Util from '@/utils'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 传递的值
const props = defineProps({
   type: {
      type: String,
      default: 'hot'
   },
   count: {
      type: Number,
      default: 0
   }
})

// 查看更多
const onMore = () => {
   router.push(`/home/${props.type}`)
}

</script>
