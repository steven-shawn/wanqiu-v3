<template lang="pug">
div.score-item.flex.flex-col.bg-white.px-2.mt-1.text-xs.shadow-md(v-download)
    div.flex.justify-between.w-full.text-xs.my-2.border-b.pb-1
        div.flex.flex-1
            span(:style="{color: scoreInfo.color}") {{scoreInfo.leagueChsShort}}
            span.text-gray-400.ml-2 {{formatTime(scoreInfo.matchTime)}}
        div.flex-1.flex.justify-center.flex-shrink-0.text-red-600 {{getStatus()}}
        div.flex-1.flex.justify-end
            van-image.w-3.h-3(:src="getImageUrl(`icon_view@2x.png`)")
            span.text-gray-400.ml-1 {{scoreInfo.stdNum}} {{scoreInfo.stdNum / 1 > 9999 ? '+' : ''}}
    div.flex.justify-between.items-center.w-full
        div.flex.items-center.w-6(@click="focus")
           van-image.w-5.h-5.ml-1(:src="getImageUrl(`icon_collect${scoreInfo.isfocus ? '_active' : ''}@2x.png`)")
        div.flex.justify-center.flex-1.flex-shrink-0
            div.flex-1.flex.justify-end
                span.bg-red-600.px-1.text-white.rounded-sm.mr-1.h-16-px.block(v-if="scoreInfo.homeRed") {{scoreInfo.homeRed}}
                span.bg-yellow-300.px-1.mr-1.text-white.rounded-sm.h-16-px.block(v-if="scoreInfo.homeYellow") {{scoreInfo.homeYellow}}
                span.text-gray-400.mr-1 [{{scoreInfo.homeRankCn}}]
                strong.font-normal.mr-2 {{scoreInfo.homeChs}}
                strong.font-medium.text-red {{scoreInfo.homeScore}}
            div.text-red :
            div.flex.flex-1.justify-start.flex-shirnk-0
                strong.font-medium.text-red {{scoreInfo.awayScore}}
                strong.font-normal.ml-2 {{scoreInfo.awayChs}}
                span.text-gray-400.ml-1 [{{scoreInfo.awayRankCn}}]
                span.bg-yellow-300.px-1.ml-1.text-white.rounded-sm.h-16-px.block(v-if="scoreInfo.awayYellow") {{scoreInfo.awayYellow}}
                span.bg-red-600.px-1.text-white.rounded-sm.ml-1.h-16-px.block(v-if="scoreInfo.awayRed") {{scoreInfo.awayRed}}
        div.flex.items-center.w-6.justify-start
            van-image.w-5.ml-1(:src="getImageUrl(`icon_play@2x.png`)" :class="'h-3.5'" v-if="scoreInfo.ifAnc === 1")
            van-image.w-5.ml-1(:src="getImageUrl(`icon_lineup@2x.png`)" :class="'h-3.5'" v-if="scoreInfo.ifAnc === 0")
    div.flex.justify-center.my-1
       div.flex-1
       div.flex.justify-center.flex-1
            p.text-gray-400.mr-2 半: {{scoreInfo.homeHalfScore || 0}}-{{scoreInfo.awayHalfScore}}
            p.text-gray-400.ml-2 角: {{scoreInfo.homeCorner || 0 }}-{{scoreInfo.awayCorner || 0}}
       div.flex-1.flex.justify-end.text-xs.text-red-600 阵容
</template>

<script lang="ts" setup>
import { _focus } from '@/service/modules/score.api';
import { Toast } from 'vant';
const props = defineProps({
    scoreInfo: Object
})

const getImageUrl = (name: string) => {
    return new URL(`./imgs/${name}`, import.meta.url).href;
}

// 关注
const focus = () => {
    let method = 'POST'
    if (props.scoreInfo.isfocus) { // 取消关注
        method = 'PUT'
    }
    _focus(props.scoreInfo.matchId, method).then(data => {
        props.scoreInfo.isfocus = !props.scoreInfo.isfocus
        Toast.success(method === 'POST' ? '已关注' : '已取消')
        // console.log(data)
    })
}
const calcTime = (matchTime, startTime) => {
    if (matchTime && startTime) {
        matchTime = matchTime.split(' ')[1].split(':')
        startTime = startTime.split(' ')[1].split(':')
        return -((matchTime[0] / 1 -startTime[0] / 1) * 60 + (matchTime[1] / 1 -startTime[1] / 1))
    }
}
const getStatus = () => {
    let {matchTime, startTime } = props.scoreInfo
    switch(props.scoreInfo.state / 1) {
        case -1: // 已结束
        return '完'
        case 1: // 上半场
            // let {matchTime, startTime } = props.scoreInfo
            return calcTime(matchTime, startTime) + '\''
        case 2: // 中场
            return '中场'
        case 3: // 下半场
             return calcTime(matchTime, startTime) + 45 + '\''
        case 4: // 加时
            return
        case 5: // 点球
            return '点球'
        case 10: //
            return '取消'
        case 11:
            return '待定'
        case 12:
            return '腰斩'
        case 13:
            return '中断'
        case 14:
            return '推迟'
        default:
            return '未'

    }
}
// 格式化时间
const formatTime = (val) => {
    return val && val.split(' ')[1]
}
</script>


<style scoped lang="sass">
div.score-item
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2)
.text-red
    color: #ce1313
    font-weight: bold
</style>