<template lang="pug">
div.flex.bg-primary.text-white.text-sm.px-4.box-border.justify-between.items-center.pt-4.pb-2.shodow.h-15
    div.flex.items-center
        img.w-40-px.h-40-px(src="@/assets/logo@2x.png")
        p.flex.flex-col.ml-2.justify-between.px-2
          h2.text-base.font-medium 金球直播
          span 畅享高清体育直播
    img.w-96-px.h-28-px(:src="getImageUrl('down-bg@2x.png')" v-download)
</template>

<script lang="ts" setup>
const getImageUrl = (name: string) => {
    return new URL(`./${name}`, import.meta.url).href;
}
</script>