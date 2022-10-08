<template lang="pug">
div#home
  van-sticky
    jq-download-header
  div.w-full.h-574-px.top-bg.flex.flex-col.justify-center.items-center.text-white
    img.w-71-px.h-32-px.invisible(src="@/assets/imgs/home/world-cup@2x.png")
    h2.text-3xl.font-bold.invisible 2022卡塔尔世界杯
    img.w-363-px.h-290-px(src="@/assets/imgs/home/adv@2x.png")
    p.text-base 全世界一起喝彩
    p.text-base 精彩尽在金球直播
    img.w-200-px.h-52-px.mt-1(src="@/assets/imgs/home/ios-download@2x.png" v-download)
    p.text-lg.mt-1 
      strong 官网地址：
      span {{OFFICIAL_URL}}
    p.text-md.gradient 【点击查看安装教程】
    img.w-14-px.h-14-px.mt-1(src="@/assets/imgs/home/down-arrow@2x.png")
  div.bg-primary.flex.items-center.justify-between.px-4.h-58-px
    p.flex.items-center.text-white
      img.w-40-px.h-40-px(src="@/assets/imgs/home/service@2x.png")
      span.ml-2.text-base.font-medium 专属在线客服
    img.w-96-px.h-28-px(src="@/assets/imgs/home/online@2x.png" @click="onService")
  div.w-full.bottom.text-white.flex.flex-col.pt-5.px-4.pb-8
    h1.w-295-px.h-32-px.mx-auto.text-center 
      span.text-2xl iOS安装教程
    p.mt-5.text-sm 需在同一网络环境下下载安装和注册，勿切换网络若无法正常下载，请使用手机自带浏览器打开（Chrome谷歌浏览器、Safari浏览器）
    ul.mt-5.text-xs
      li 1. APP下载完成后，请打开「设置」＞点选「通用」选项
      li 2. 点选「设备管理」
      li 3. 点击「信任」APP既完成设置
    ul.flex.flex-wrap.justify-between
      li.border-box.mt-8.flex(class="w-1/2" :class="'justify-start'")
        img(src="@/assets/imgs/home/1@2x.png" :style="{width: '90%'}")
      li.border-box.mt-8.flex(class="w-1/2" :class="'justify-end'")
        img(src="@/assets/imgs/home/2@2x.png" :style="{width: '90%'}")
      li.border-box.mt-8.flex(class="w-1/2" :class="'justify-start'")
        img(src="@/assets/imgs/home/3@2x.png" :style="{width: '90%'}")
      li.border-box.mt-8.flex(class="w-1/2" :class="'justify-end'")
        img(src="@/assets/imgs/home/4@2x.png" :style="{width: '90%'}")  
    p.mt-5.text-center.text-xs 客服邮箱：jqiuty@gmail.com
    p.mt-5.text-center.text-xs.mb-12 体育直播、足球比分、篮球比分、足球赛事直播、NBA直播、CBA直播、英超直播、德甲、西甲、意甲、法甲、欧冠、欧联、日职联、韩K联、澳超直播、一级体育赛事直播站    

</template>

<script setup lang="ts">
import JqDownloadHeader from '@/components/jq-download-header/index.vue' 
import { SERVICE_URL, OFFICIAL_URL } from '@/config/system.conf'
// const getImageUrl = (name: string) => {
//     return new URL(`../../${name}`, import.meta.url).href;
// }
const onService = () => { // 客服
  location.href = SERVICE_URL
}

</script>

<style lang="sass" scoped>
.top-bg
  background: url(@/assets/imgs/home/top-bg@2x.png) no-repeat center top
  background-size: 100% 100%
.gradient
  background-image: linear-gradient(to bottom, #f8f1c0, #dbd09b 42%, #8f793b)
  -webkit-background-clip: text
  background-clip: text
  -webkit-text-fill-color: transparent 
.bottom
  background: url(@/assets/imgs/home/down-bg@2x.png) no-repeat center top
  background-size: 100%
  h1
    background: url(@/assets/imgs/home/title-bg@2x.png) no-repeat center center
    background-size: 100%
    span 
      background-image: linear-gradient(to bottom, #f8f1c0, #dbd09b 42%, #8f793b)
      -webkit-background-clip: text
      background-clip: text
      -webkit-text-fill-color: transparent
</style>