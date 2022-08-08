<template lang="pug">
div.score-item.flex.flex-col.bg-white.px-2.mt-1.text-xs
    div.flex.justify-between.w-full.text-xs.my-2.border-b
        div.flex.flex-1
            span.text-red-600 亚洲世预
            span.text-gray-400.ml-2 03:45
        div.flex-1.flex.justify-center.flex-shrink-0.text-red-600 72'
        div.flex-1.flex.justify-end
            van-image.w-3.h-3(:src="Util.$require('components/score-item/imgs/icon_view@2x.png')")
            span.text-gray-400.ml-1 9999+
    div.flex.justify-between.items-center.w-full
        div.flex.items-center.w-12
           van-image.w-5.h-5.ml-1(:src="Util.$require(`components/score-item/imgs/icon_collect_active@2x.png`)") 
        div.flex.justify-center.flex-1.flex-shrink-0
            div.flex-1.flex.justify-end
                span.bg-red-600.px-1.text-white.rounded-sm.mr-1 1
                span.bg-yellow-300.px-1.mr-1.text-white.rounded-sm 1
                span.text-gray-400.mr-1 [25]
                strong.font-normal.mr-2 澳大利亚
                strong.font-medium 2
            div :
            div.flex.flex-1.justify-start
                strong.font-medium 2
                strong.font-normal.ml-2 因果
                span.text-gray-400.ml-1 [25]
                span.bg-yellow-300.px-1.ml-1.text-white.rounded-sm 2
                span.bg-red-600.px-1.text-white.rounded-sm.ml-1 2
        div.flex.items-center.w-12
            van-image.w-5.ml-1.invisible(:src="Util.$require('components/score-item/imgs/icon_play@2x.png')" :class="'h-3.5'")
            van-image.w-5.ml-1(:src="Util.$require('components/score-item/imgs/icon_lineup@2x.png')" :class="'h-3.5'")
    div.flex.justify-center.my-1
       div.flex-1
       div.flex.justify-center.flex-1.flex-shrink-0 
            p.text-gray-400.mr-2 半: 1-1
            p.text-gray-400.ml-2 角: 3-7
       div.flex-1.flex.justify-end.text-xs.text-red-600 阵容
</template>

<script lang="ts" setup>
import Util from '@/utils'
</script>


<style scoped lang="sass">
div.score-item
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2)
</style>