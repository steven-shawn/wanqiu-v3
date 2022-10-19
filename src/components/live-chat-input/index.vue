<template lang="pug">
div.h-11.flex.bg-white.w-screen.justify-between.items-center.px-3.fixed.bottom-0
    div.flex.flex-1.bg-gray-200.h-9.mr-2.rounded.items-center.justify-between
        //- span.block.w-4.h-4.bg-red-600.mx-2
        p.flex.flex-1.items-center
          div.border.border-primary.p-1.rounded-full.mx-2(style="padding: 1px;" @click="showQuick")
            p.w-full.text-xs.bg-black.rounded-full.text-white.px-2 快速发言
          p.text-blue.text-xs(v-download) 下载APP
          input.block.w-4.h-4.bg-transparent.flex-1.h-9.text-xs.pl-1(placeholder="发弹幕,参与互动" v-model="state.value" disabled)
          span.block.w-4.h-4.bg-blue-600.ml-2
        //span.block.w-6.h-6.mx-2(@click="onSend")
          img(src="./send@2x.png")
    div.w-8.h-8.rounded-full.mr-2(@click="onShowNoble" v-download)
      img(src="./icon_noble@2x.png" v-download)
    //div.w-8.h-8.rounded-full
      img(src="./icon_pok@2x.png")
    div.w-8.h-8.rounded-full.ml-2(@click="onShowGift" v-download)
      img(src="./icon_gift@2x.png")
    ul.absolute.left-0.bottom-10.bg-white.shadow.rounded(v-if="state.show" style="min-width: 80%;")
      li.text-primary.text-xs.bg-white.p-2.flex.items-center(v-for="(item, index) in state.list" :key="item" 
        :class="{'bg-grey': index % 2}" @click.stop="onSend(item.content)")
        img.w-6.h-6.mr-1(:src="getImageUrl((index + 1) + '@2x.png')" v-if="index < 3")
        span.inline-block.w-6.h-6.flex.items-center.justify-center(v-else) {{index}}.
        p {{item.content}}

</template>

<script lang="ts" setup>
import { _quickSpeak } from '@/service/modules/live.api'
import { inject, reactive } from 'vue'

const state = reactive({
  value: '',
  list: [],
  show: false
})

const getImageUrl = (name: string) => {
    return new URL(`./${name}`, import.meta.url).href;
}

const showQuick = async () => {
  if (!state.list.length) {
    const data = await _quickSpeak()
    state.list = data
    // console.log(data)
  }
  state.show = !state.show
}

const popCtrl: any =  inject('popCtrl')

// 通知父组件
const emits = defineEmits(['e-show-noble', 'send'])

// 点击显示贵族
const onShowNoble = () => {
  popCtrl.showNoble = true
  emits('e-show-noble')
}

// 点击显示礼物界面
const onShowGift = () => {
  popCtrl.showGift = true
}

const onSend = (value: string) => {
  emits('send', value)
  state.show = false
  // emits('send', state.value)
  // state.value = ''
  // console.log(state.value)
}

</script>
