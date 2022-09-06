<template lang="pug">
div.w-full.h-150.relative.bg-no-repeat(:style="{'backgroundImage': `url(${getImageUrl(level)}`}")
    h1.text-2xl.text-white.p-4 {{info.gradeName}}
        img.inline.ml-1.w-20.h-6(:src="IMG_URL + info.effectUrl")
    div.w-full.h-90.absolute.top-8
        div.w-full.h-90.aboslute.border-1
            img.w-full.h-full(src="./bg-line@2x.png")
            span.right-4.absolute.right-4.bottom-0.text-blue-lighter(style="font-size: 10px;") {{info.nextGradeName}}经验值{{info.nextGrowthValue}}
    div.text-white.absolute.flex.text-xs.-bottom-1.pb-4.px-4.justify-between.w-full
        span.text-white.text-opacity-40(style="font-size: 10px;") {{info.gradeName}}经验值{{info.currentExperience}}
        span.text-white 当前经验值为{{info.currentExperience}},您还需要{{info.nextGrowthValue - info.currentExperience}}经验值
</template>

<script lang="ts" setup>
import { IMG_URL } from '@/config/system.conf';
import { computed } from '@vue/reactivity';

const props = defineProps({
    info: {}
})

const level = computed(() => {
    if (!props.info.level || props.info.level < 10) {
        return 'bg_01.png'
    }
    return `bg_${(props.info.level + '').split('')[0]}1.png`
})

const getImageUrl = (name: string) => {
    return new URL(`./${name}`, import.meta.url).href;
}
</script>

<style scoped lang="sass">
.w-343
    width: 343px
.h-90
    height: 90px
.h-150
  height: 150px
  background-size: 100%
</style>