<template lang="pug">
div.flex.justify-between.items-center.h-9.text-xs
   div.flex.items-center.text-primary
    van-image.w-5.h-5.mr-1(:src="getImageUrl(`${type}@2x.png`)")
    strong.text-base {{title}}
   div.flex.items-center.text-xs
    span.text-red-light(:class="{'hidden': type !== 'hot'}") 当前有{{count}}个热门直播
    span.ml-2.text-grey-light(@click="onMore")  查看更多
       van-icon(name="arrow")

</template>


<script lang="ts" setup>
// import Util from '@/utils'
import { useRouter } from 'vue-router'
const router = useRouter()

// 传递的值
const props = defineProps({
   title: {
      type: String,
      default: '正在直播'
   },
   type: {
      type: String,
      default: 'hot'
   },
   count: {
      type: Number,
      default: 0
   }
})

const getImageUrl = (name: string) => {
    return new URL(`./${name}`, import.meta.url).href;
}

// 查看更多
const onMore = () => {
   router.push(`/home/${props.type}`)
}

</script>
