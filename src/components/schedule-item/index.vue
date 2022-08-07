<template lang="pug">
div.schedule-item.flex.bg-white.mb-1.justify-between.text-xs.p-2.rounded-lg
    div.flex.flex-col.justify-between
        div.flex.items-center.mb-2
            span.block.w-5.h-5.bg-black.rounded-full.mr-2
            span.text-xs 森格利亚竞技
        div.flex.items-center
            span.block.w-5.h-5.bg-black.rounded-full.mr-2
            span.text-xs 佩塔
    div.flex.flex-col.justify-between
        span 0
        span 1
    div.flex.flex-col.justify-between.items-center
        span.text-gray-600.text-center 09:11
        button.w-16.h-6.bg-red-600.rounded.text-white.text-xs 观看直播
    div.flex.flex-col.justify-between.items-end.border-l.w-20
        div 欧冠
        div.flex
            span.block.w-4.h-4.bg-black.rounded-full.border.border-white.-mr-1
            span.block.w-4.h-4.bg-black.rounded-full.border.border-white
        div
            span.text-xs(style="color: #2653a8;") 2+主播 >
            span.text-xs.text-gray-500.hidden 暂无主播    
</template>

<style scoped lang="sass">
.schedule-item
    margin-bottom: 10px
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2)
</style>