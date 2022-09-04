<template lang="pug">
div.flex.justify-between.items-center.px-4.rounded-lg.shadow-lg.bg-white.my-2.py-2
    div.w-10.h-10.rounded-full.bg-red-600.flex-shrink-0.mr-4
    div.flex-1.flex.flex-col.justify-between
      div.flex
        span.text-sm {{item.nickName || '--'}}
        span.block.w-12.h-5.bg-red-600.ml-2
      div.text-xs.text-gray-600.mt-1 关注人数 {{item.fansNum || 0}}
    div.bg.w-20.h-7.rounded.flex.justify-center.items-center.text-white.text-xs

</template>

<script lang="ts" setup>
defineProps(['item'])
</script>

<style scoped lang="sass">
.bg
  background: url('./concerned@2x.png') no-repeat center center
  background-size: contain
</style>
