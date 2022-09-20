<template lang="pug">
div.m-4.p-4.bg-black.h-240.rounded-lg.text-white.flex.flex-col.justify-between
  div.flex.items-center
    div.h-14.w-14.rounded-full.mr-4.overflow-hidden
      img(:src="`${IMG_URL}${state.info.memImg}`")
    div.flex.flex-col
      p.text-base.mb-1.font-bold {{state.info.nickName}}
      p.flex.mt-1.items-center 
        span.block.w-12.h-4
          img(:src="getImageUrl(`${state.info.gradeName}.png`)")
        span.text-xs.mx-1 正在直播
        // span.block.w-3.h-3.bg-red-600
        button.text-xs.ml-2(v-download @click="onFollow") {{info.ifFocusStu ? '已关注' : '关注主播'}}
  div.relative.sign.-top-8
    p.w-4.h-12.bg-yellow-600.rounded-l-md.absolute.right-0.-top-1
    p.absolute.right-0.h-10.w-auto.bg-white.rounded.text-black.text-xs.pr-4.pl-1.flex.items-center {{state.info.anchorSign}}
    p.absolute.w-3.h-8.bg-yellow-600.rounded-l-md.right-0.top-1
  div.text-xs
    div.flex.justify-between
      span.mb-1
        span
        span 关注: {{state.info.fansNum || 0}}
      span.text-yellow-400 专业主播
    div
      span
      span 热度: {{state.info.heatValue}} 
</template>

<style scoped lang="sass">
.h-240
  height: 240px
.sign
  transform: translateX(16px)
</style>

<script lang="ts" setup>
import { IMG_URL } from '@/config/system.conf';
import { onMounted, reactive } from 'vue'
import { _getAnchor, _followAnchor } from '@/service/modules/live.api'
import { useStore } from 'vuex'
import { Notify } from 'vant';
const store = useStore()

const getImageUrl = (name: string) => {
    return new URL(`./archor-level/${name}`, import.meta.url).href;
}

const props = defineProps({
  info: {}
})


const state = reactive({
  info: {}
})
onMounted(() => {
  _getAnchor(store.state.live.room_id).then(data => {
    state.info = data
  })
  // console.log(111111)
})

const onFollow = async () => {
  if (!props.info.ifFocusStu) {
    await _followAnchor(state.info.memIdentityId)
    Notify({type: 'success', message: '关注成功'})
    props.info.ifFocusStu = true
  }
}
</script>
