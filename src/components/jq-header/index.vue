<template lang="pug">
div.w-full.h-11.flex.justify-between.items-center.bg-white.text-primary.z-10.top-0.text-base
    div.w-11.h-11.flex.justify-center.items-center(@click="onBack")
        van-icon(:name="leftIcon || 'arrow-left'" size="20px")
    div.items-center.flex-1.text-center
        slot
    div.w-11.h-11.flex.justify-center.items-center(@click="onRightClick")
        van-icon(:name="rightIcon" size="20px")
</template>

<script setup lang="ts">
import { Icon } from 'vant'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    leftIcon: { // 左侧图标
        type: String,
        default: ''
    },
    rightIcon: {
        type: String,
        default: ''
    }
})

// 向父组件发送事件
const emits = defineEmits(['e-left-click', 'e-right-click'])

// 返回
const onBack = () => {
    if (props.leftIcon !== '') { // 自定义图标
        emits('e-left-click')
    } else { // 返回图标
        router.go(-1)
    }
}

// 点击右侧图标
const onRightClick = () => {
    if (props.rightIcon !== '') {
        emits('e-right-click')
    }
}

</script>