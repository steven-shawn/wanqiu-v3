<template lang="pug">
div#dplayer.w-full.h-52
</template>

<script lang="ts" setup>
import { onMounted } from '@vue/runtime-core';
import DPlayer from 'dplayer'
import { IMG_URL } from '@/config/system.conf';
// import Logo from '@/assets/logo@2x.png'

const props = defineProps(['url', 'img'])

onMounted(() => {
    const url = props.url.replace('.flv', '.m3u8') // 'https://pull.quhaipin.com/tlEvBg108560_480hp.m3u8'
    const url_720 = url.indexOf('_480hp') > -1 ? url.replace('_480hp', '_720hp') : url.replace('.m3u8', '_720hp.m3u8')
    const url_1080 = url.indexOf('_480hp') > -1 ? url.replace('_480hp', '_1080hp') : url.replace('.m3u8', '_1080hp.m3u8')
    const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        // screenshot: true,
        autoplay: true,
        preload: 'auto',
        live: true,
        lang: 'zh-cn',
        // logo: Logo,
        mutex:true,
        loop: false,
        video: {
            url,
            // pic: IMG_URL + props.img,
            type: 'auto',
            thumbnails: IMG_URL + props.img,
            quality: [
                { name: '标清', url, type: 'auto'},
                { name: '高清', url: url_720, type: 'auto'},
                { name: '超清', url: url_1080, type: 'auto'}
            ],
            defaultQuality: 0,
            contextmenu: [
                {
                text: 'custom1',
                link: 'https://github.com/DIYgod/DPlayer',
                }
            ]
        },
        customType: {
            customHls: function (video, player) {
                const hls = new Hls();
                hls.loadSource(video.src);
                hls.attachMedia(video);
            },
        },
        // subtitle: {
        //     url: 'webvtt.vtt',
        // },
        // danmaku: {
        //     id: 'demo',
        //     api: 'https://api.prprpr.me/dplayer/',
        // },
    })
    // 消失的控制框
    dp.on('play', () => {
        setTimeout(() => {
            const curtion = document.getElementsByClassName('dplayer-video')[0]
            curtion.click()
        }, 1000)
    })
})


</script>

<style lang="scss">
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-full .dplayer-full-in-icon, 
.dplayer-controller .dplayer-icons .dplayer-setting {
    display: none;
}
</style>
