<template lang="pug">
div.flex.text-sm
    p.py-1.px-4.bg-yellow-50.text-yellow-700(v-if="type === 'system'") 系统提示：金球体育主播内容及互动须严格遵守平台规则，严禁传播黄赌毒、血腥暴力、封建迷信、吸烟酗酒、造谣诈骗、等违法违规有害信息。如有违规，平台将依法对违规账号进行永久封禁！严禁未成年人直播或打赏。
    div.px-4.inline-block.bg-green-600.mt-1(v-else)
      button.w_30.h_30.bg-yellow-600.mr-1 骑
      button.w_38.h_22.bg-red-600.mr-1 房
      button.w_78.h_22.bg-blue-600.mr-1 21
      p.break-all.inline
        strong.text-sm.font-normal.text-blue-900 进球永华是撒啊:
        span.text-xs 进入咋说的发的阿达进入咋说的发的阿达进入咋说的发的阿达进入咋说的发的阿达进入咋说的发的阿达
</template>

<script lang="ts" setup>
defineProps({
    type: { // 发言类型
        type: String,
        default: 'system' // system: 系统消息, msg: 普通消息
    }
})
</script>

<style scoped lang="sass">
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
