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
        span.text-red-light {{item.state / 1=== 0 ? 'VS' : (`${item.homeScore}:${item.awayScore}`)}}
    div.flex.flex-col.justify-between.items-center.mr-2
        span.text-grey-light.text-center.font-10 {{item.matchTime.split(' ')[1].split(':').slice(0,2).join(':')}}
        button.rounded.text-white.text-xs.mb-3(:class="status" @click="onItemClick")
    div.flex.flex-col.justify-center.items-end.border-l.w-20
        //- div 欧冠
        div.flex(v-if="item.stuAnchorList && item.stuAnchorList.length")
            span.block.w-4.h-4.bg-black.rounded-full.border.border-white(v-for="(_item, _index) in item.stuAnchorList" :key="_index")
        div.mt-2
            span.text-xs.text-primary(v-if="item.stuAnchorList && item.stuAnchorList.length")
                span {{item.stuAnchorList.length}}+主播
                van-icon.rotate-180(name="arrow-left")
            span.text-xs.text-gray-500(v-else) 暂无主播
</template>

<script lang="ts" setup>
import { computed } from "@vue/runtime-core"
import { useRouter } from "vue-router"
import { Notify } from "vant";
import { _reserve } from '@/service/modules/schedule.api'
import { download } from '@/utils'
const router = useRouter()

const props = defineProps(['item'])
const status = computed(() => {
    if (props.item.matchState === 2) {
        return 'end'
    } else if (props.item.matchState === 0) {
        return 'watch'
    } else if (props.item.isbooking) {
        return 'reserved'
    } else {
        return 'reserve'
    }
})

const onItemClick = async () => {
    const {stuAnchorList, matchState, isbooking, matchId } = props.item
    if(matchState === 0) {
        if (stuAnchorList && stuAnchorList.length) {
            router.push(`/live/room?id=${stuAnchorList[0].memIdentityId}`)
        } else {
            Notify({type: 'warning', message: '暂无主播'})
        }
        return
    }
    if (!isbooking) {
        download()
        // await _reserve(matchId)
        // props.item.isbooking = true
        // Notify({type: 'success', message: '预约成功'})
    }


}
</script>


<style scoped lang="sass">
.font-10
    font-size: 10px
button
    width: 84px
    height: 24px
    background-size: contain
    &.watch
        background: url(./bg-watch@2x.png) no-repeat center center
        background-size: contain
    &.end
        background: url(./end@2x.png) no-repeat center center
        background-size: contain
    &.reserve
        background: url(./bg-reserve@2x.png) no-repeat center center
        background-size: contain
    &.reserved
        background: url(./reserved@2x.png) no-repeat center center
        background-size: contain
.schedule-item
    margin-bottom: 10px
    // box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2)
</style>