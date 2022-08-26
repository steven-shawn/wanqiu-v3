<template lang="pug">
div.pb-20.pt-11.bg-gray-100.h-full.relative.box-border
  jq-header.fixed 正在直播
  live-player
  van-tabs(swipeable animated v-model:active="active" background="#fff" color="#667885" title-active-color="#072b48" title-inactive-color="#072b48")
    van-tab.box-border.px-45-px(title="聊天" name="a")
        live-chat.box-border
    van-tab(title="主播" name="b")
        live-archor
    van-tab(title="赛况" name="c")
        live-process
    van-tab(title="指数" name="d")
        live-index
    van-tab(title="阵容" name="e")
        live-line
    van-tab(title="相关直播" name="f")
        live-relate
  live-chat-noble.fixed.top-0(v-if="state.showNoble")
  live-chat-gift.fixed.bottom-0(v-if="state.showGift")
</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'
import LivePlayer from '@/components/live-player/index.vue'
import LiveChat from '@/components/live-chat/index.vue'
import LiveArchor from '@/components/live-archor/index.vue'
import LiveProcess from '@/components/live-process/index.vue'
import LiveIndex from '@/components/live-index/index.vue'
import LiveLine from '@/components/live-line/index.vue'
import LiveRelate from '@/components/live-relate/index.vue'
import LiveChatNoble from '@/components/live-chat-noble/index.vue'
import LiveChatGift from '@/components/live-chat-gift/index.vue'

// import { popCtrlType } from '@/types/live.type'

import { provide, reactive, ref } from 'vue'

// 状态传递器
const state = reactive({
    showNoble: false, // 显示贵族页面
    showGift: false // 显示礼物界面
})

provide('popCtrl', state)
const active = ref('a')
// active.value = 'c'

</script>