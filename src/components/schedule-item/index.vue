<template lang="pug">
div.schedule-item.flex.bg-white.mb-1.justify-between.text-xs.p-2.rounded.shadow-md.relative
    img.w-11.h-3.absolute.right-0.top-0(src="./icon-hot@2x.png")
    div.flex.flex-col.justify-between
        div.font-10.mb-1.text-primary 英超
        div.flex.items-center.mb-2
            span.block.w-5.h-5.bg-black.rounded-full.mr-2
            span.text-xs.text-black-light 森格利亚竞技
        div.flex.items-center
            span.block.w-5.h-5.bg-black.rounded-full.mr-2
            span.text-xs.text-black-light 佩塔
    div.flex.flex-col.justify-center
        //- span 
        span.text-red-light 5:3
    div.flex.flex-col.justify-between.items-center
        span.text-grey-light.text-center.font-10 09:11
        button.rounded.text-white.text-xs.mb-3
    div.flex.flex-col.justify-center.items-end.border-l.w-20
        //- div 欧冠
        div.flex
            span.block.w-4.h-4.bg-black.rounded-full.border.border-white(v-for="item in 3" :key="item")
        div.mt-2
            span.text-xs.text-primary
                span 3+主播
                van-icon.rotate-180(name="arrow-left")
            span.text-xs.text-gray-500.hidden 暂无主播    
</template>

<style scoped lang="sass">
.font-10
    font-size: 10px
button
    width: 84px
    height: 24px
    background: url(./bg-watch@2x.png) no-repeat center center
    background-size: contain 
.schedule-item
    margin-bottom: 10px
    // box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2)
</style>