<template lang="pug">
div.live-chat.h-screen.overflow-y-auto.pb-11
  div.px-2.flex.bg-red-600.items-center
    span icon
    marquee.h-8.leading-8 11111111111
  live-chat-msg
  live-chat-msg(type="msg" v-for="item in 10" :key="item")
  live-chat-input
</template>

<script lang="ts" setup>
import LiveChatMsg from '@/components/live-chat-msg/index.vue'
import LiveChatInput from '@/components/live-chat-input/index.vue'

</script>

<style scoped lang="sass">
.live-chat
    margin-top: -296px
    padding-top: 296px
</style>
