<template lang="pug">
div#live-swiper.py-3.box-border
    van-swipe(:loop="false" :width="168" :show-indicators="false")
        van-swipe-item(v-for="item in 5" :key="item")
            div.mx-1.bg-white.py-4.px-2.rounded.shadow
                div.flex.justify-between.text-xs.text-primary
                    div.flex.flex-col.justify-between
                        p.flex.items-center
                            img.w-4.h-3(src="@/assets/logo.png")
                            span.ml-1 澳大利亚
                        p.flex.items-center
                            img.w-4.h-3(src="@/assets/logo.png")
                            span.ml-1 沙特阿拉伯    
                    div.bg-grey-lighter.rounded.py-2.px-2
                        p.font-10.text-grey-light.text-center 今天
                        p.font-1.text-primary.text-center 21:20
                div.flex.justify-between.mt-3
                    p.text-grey-light(style="font-size: 10px;") 亚洲世锦赛
                    img.w-12.h-4(src="@/assets/logo.png")
</template>

<script lang="ts" setup>

</script>

<style lang="sass" scoped>
.font-10
    font-size: 10px
</style>