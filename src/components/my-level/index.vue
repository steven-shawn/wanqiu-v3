<template lang="pug">
div.w-full.h-150.relative.bg-no-repeat(:style="{'backgroundImage': 'url(' + Util.$require('components/my-level/bg_21.png') + ')'}")
    h1.text-2xl.text-white.p-4 Lv14骁勇先锋
    div.w-full.h-90.absolute.top-8
        div.w-full.h-90.aboslute.border
            img.w-full.h-full(src="./bg-line@2x.png")
            span.right-4.absolute.right-4.bottom-0.text-blue-lighter(style="font-size: 10px;") Lv15经验值800
    div.text-white.absolute.flex.text-xs.-bottom-1.pb-4.px-4.justify-between.w-full
        span.text-white.text-opacity-40(style="font-size: 10px;") Lv14经验值707
        span.text-white 当前经验值为707，您还需要93经验值
       
</template>

<script lang="ts" setup>
import Util from '@/utils'
</script>


<style scoped lang="sass">
.w-343
    width: 343px
.h-90
    height: 90px
.h-150
  height: 150px
  background-size: 100%
</style>