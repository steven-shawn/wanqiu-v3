<template lang="pug">
div#live-swiper.py-3.box-border
    van-swipe(:loop="false" :width="168" :show-indicators="false")
        van-swipe-item(v-for="item in state.list" :key="item")
            div.mx-1.bg-white.py-4.px-2.rounded.shadow
                div.flex.justify-between.text-xs.text-primary
                    div.flex.flex-col.justify-between
                        p.flex.items-center
                            img.w-4.h-3(:src="item.homeLogo")
                            span.ml-1 {{item.homeChs}}
                        p.flex.items-center
                            img.w-4.h-3(:src="item.awayLogo")
                            span.ml-1 {{item.awayChs}}    
                    div.bg-grey-lighter.rounded.py-2.px-2
                        p.font-10.text-grey-light.text-center {{item.matchTime.split(' ')[0].split('/').slice(1).join('-')}}
                        p.font-1.text-primary.text-center {{item.matchTime.split(' ')[1].split(':').slice(0,2).join(':')}}
                div.flex.justify-between.mt-3.items-center
                    p.text-grey-light(style="font-size: 10px;") {{item.leagueChsShort}}
                    p.text-grey-ligh.text-xs.bg-primary.rounded.text-white.px-2.py-1(v-download) 预约直播
                    //img.w-12.h-4(:src="`${IMG_URL}${item.liveImg}`")
</template>

<script lang="ts" setup>
import { _focusLive } from '@/service/modules/live.api'
import { onMounted, reactive } from 'vue';
import { IMG_URL } from '@/config/system.conf';
const state = reactive({
    list: []
})
onMounted(() => {
    _focusLive().then(data => {
        state.list = data
    })
})
</script>

<style lang="sass" scoped>
.font-10
    font-size: 10px
</style>