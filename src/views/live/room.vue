<template lang="pug">
div.pb-20.pt-11.bg-gray-100.h-full.relative.box-border
  jq-header.fixed 正在直播
  live-player(:url="state.info.pullUrl" :img="state.info.liveImg" v-if="state.info.pullUrl")
  div.w-full.h-52.flex.justify-center.items-center(v-else)
    van-loading
  van-tabs(swipeable animated v-model:active="active" background="#fff" color="#667885" title-active-color="#072b48" title-inactive-color="#072b48")
    van-tab.box-border.px-45-px(title="聊天" name="a")
        keep-alive
            live-chat.box-border(v-if="active==='a'" :gift-info="state.giftInfo")
    van-tab(title="主播" name="b")
        keep-alive
            live-archor(v-if="active==='b'" :info="state.info")
    van-tab(title="赛况" name="c")
        keep-alive
            live-process(v-if="active==='c'" :info="state.info")
    van-tab(title="指数" name="d")
        keep-alive
            live-index(v-if="active==='d' && state.info.matchId" :matchId="state.info.matchId")
    van-tab(title="阵容" name="e")
        keep-alive
            live-line(v-if="active==='e' && state.info.matchId" :info="state.info")
    van-tab(title="相关直播" name="f")
        keep-alive
            live-relate(v-if="active==='f' && state.info.matchId" :matchId="state.info.matchId")
  live-chat-noble.fixed.top-0(v-if="state.showNoble" :archorhName="state.info.nickName")
  live-chat-gift.fixed.bottom-0(v-if="state.showGift" @gift="onGift")
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
import { _getLive } from '@/service/modules/live.api'
// import { popCtrlType } from '@/types/live.type'

import { onMounted, provide, reactive, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
// 状态传递器
const state = reactive({
    showNoble: false, // 显示贵族页面
    showGift: false, // 显示礼物界面
    info: {},
    giftInfo: {}, // 发送的礼物信息
})

const chatTab = ref()

onMounted(() => {
    const room_id = store.state.live.room_id
    _getLive(room_id).then(data => {
        state.info = data
    })
})

// 礼物
const onGift = (evt: Event) => {
    state.giftInfo = evt
}

provide('popCtrl', state)
const active = ref('a')
// active.value = 'c'

</script>