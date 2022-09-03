<template lang="pug">
div#dplayer.w-full.h-52.bg-red-600   
</template>

<script lang="ts" setup>
import { onMounted } from '@vue/runtime-core';
import DPlayer from 'dplayer'

const demoLink = 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4'

onMounted(() => {
    const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        screenshot: true,
        video: {
            url: demoLink,
            // pic: 'demo.jpg',
            thumbnails: 'thumbnails.jpg',
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
