<template lang="pug">
div.schedule-item.flex.bg-white.mb-1.justify-between.text-xs.p-2.rounded.shadow-md.relative.w-full
    img.w-11.h-3.absolute.right-0.top-0(src="./icon-hot@2x.png" v-if="item.hot")
    div.flex.flex-col.justify-between.flex-1
        div.font-10.mb-1.text-primary {{item.leagueChsShort}}
        div.flex.items-center.mb-2
            span.block.w-5.h-5.bg-black.rounded-full.mr-2
              img(:src="item.homeLogo")
            span.text-xs.text-black-light {{item.homeChs}}
        div.flex.items-center
            span.block.w-5.h-5.bg-black.rounded-full.mr-2
              img(:src="item.awayLogo")
            span.text-xs.text-black-light {{item.awayChs}}
    div.flex.flex-col.justify-center.mr-2
        //- span
        span.text-red-light {{item.homeScore}}:{{item.awayScore}}
    div.flex.flex-col.justify-between.items-center.mr-2
        span.text-grey-light.text-center.font-10 {{item.matchTime.split(' ')[1].split(':').slice(0,2).join(':')}}
        button.rounded.text-white.text-xs.mb-3
    div.flex.flex-col.justify-center.items-end.border-l.w-20
        //- div 欧冠
        div.flex(v-if="item.stuAnchorList.length")
            span.block.w-4.h-4.bg-black.rounded-full.border.border-white(v-for="(_item, _index) in item.stuAnchorList" :key="_index")
        div.mt-2
            span.text-xs.text-primary(v-if="item.stuAnchorList.length")
                span {{item.stuAnchorList.length}}+主播
                van-icon.rotate-180(name="arrow-left")
            span.text-xs.text-gray-500(v-else) 暂无主播
</template>

<script lang="ts" setup>
defineProps(['item'])
</script>


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