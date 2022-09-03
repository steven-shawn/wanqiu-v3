<template lang="pug">
div.flex.text-sm.shadow
    p.py-1.px-4.bg-white(v-if="type === 'system'" :class="color ? 'text-red' : 'text-grey-light'") 系统公告：金球体育主播内容及互动须严格遵守平台规则，严禁传播黄赌毒、血腥暴力、封建迷信、吸烟酗酒、造谣诈骗、等违法违规有害信息。如有违规，平台将依法对违规账号进行永久封禁！
    div.px-4.inline-block.mt-1.w-full(style="background: #f1efff" v-else)
      button.w_30.h_30.mr-1.bg-no-repeat.bg-contain(:style="{'backgroundImage': `url(${getImageUrl('live-chat-noble/level1@2x.png')})`}")
        span.invisible 骑
      button.w_38.h_22.bg-no-repeat.bg-contain.mr-1(:style="{'backgroundImage': `url(${getImageUrl('live-chat-msg/id_1@2x.png')})`}")
        span.invisible 房
      button.w_78.h_22.bg-no-repeat.bg-contain.mr-1(:style="{'backgroundImage': `url(${getImageUrl('live-chat-msg/grade_21@2x.png')})`}")
        span.invisible 级别
      p.break-all.inline
        strong.text-sm.font-normal.text-blue 进球永华是撒啊:
        span.text-xs.text-black-light 进入咋说的发的进入咋说的发的进入咋说的发的进入咋说的发的进入咋说的发的进入咋说的发的进入咋说的发的
</template>

<script lang="ts" setup>
defineProps({
    type: { // 发言类型
        type: String,
        default: 'system' // system: 系统消息, msg: 普通消息
    },
    color: {
        type: String
    }
})

const getImageUrl = (name: string) => {
    return new URL(`../../components/${name}`, import.meta.url).href;
}
</script>

<style scoped lang="sass">
.text-red
    color: #d46666
.w_30
    width: 30px
.w_38
    width: 38px
.w_78
    width: 78px
.h_30
    height: 30px
.h_22
    height: 22px
</style>
