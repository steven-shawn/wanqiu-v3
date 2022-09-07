<template lang="pug">
div#dplayer.w-full.h-52
</template>

<script lang="ts" setup>
import { onMounted } from '@vue/runtime-core';
import DPlayer from 'dplayer'
import { IMG_URL } from '@/config/system.conf';
import Logo from '@/assets/logo@2x.png'

const demoLink = 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4'

const props = defineProps(['url', 'img'])

onMounted(() => {
    const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        screenshot: true,
        autoplay: true,
        preload: 'auto',
        live: true,
        lang: 'zh-cn',
        logo: Logo,
        video: {
            // url: props.url,
            // pic: IMG_URL + props.img,
            type: 'flv',
            thumbnails: IMG_URL + props.img,
            quality: [
                { name: '标清', url: props.url, type: 'auto'},
                { name: '高清', url: props.url, type: 'hls'},
                { name: '超清', url: props.url, type: 'flv'}
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
})


</script>

<style lang="scss">
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-full .dplayer-full-in-icon, 
.dplayer-controller .dplayer-icons .dplayer-setting {
    display: none;
}
</style>
