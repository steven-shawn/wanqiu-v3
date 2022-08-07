<template lang="pug">
div.w-343.h-150.relative.bg-no-repeat(:style="{'backgroundImage': 'url(' + Util.$require('components/my-level/bg_01.png') + ')'}")
    h1 Lv14骁勇先锋
    div.w-343.h-90.bg-red-600.absolute
        div.w-343.h-90
            span Lv15经验值800
    div.text-white.absolute.flex.text-xs
        span Lv14经验值707
        span 当前经验值为707，您还需要93经验值
       
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