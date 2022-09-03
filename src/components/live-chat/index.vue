<template lang="pug">
div.live-chat.h-screen.overflow-y-auto.pb-11.bg-white
  div.px-2.flex.bg-grey-lighter.items-center
    img.w-3.h-3(src="./icon_notify@2x.png")
    marquee.h-8.leading-8.text-primary.text-xs 这里是公告内容这里是公告内容这里是公告内容这里是公告内容
  live-chat-msg
  live-chat-msg(color="#d46666")
  live-chat-msg(type="msg" v-for="item in 10" :key="item")
  live-chat-input
</template>

<script lang="ts" setup>
import LiveChatMsg from '@/components/live-chat-msg/index.vue'
import LiveChatInput from '@/components/live-chat-input/index.vue'
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
const route = useRoute()
const store = useStore()

const socket = null

onMounted(() => {
  const { query: { id }} = route
  if(id) {
    store.commit('live/SET_ROOM_ID', id)
  }

  // socket = new WebSocket()

  // socket.on('open')

  console.log(route.query.id, store.state.live.room_id)
})

</script>

<style scoped lang="sass">
.live-chat
    margin-top: -296px
    padding-top: 296px
</style>
