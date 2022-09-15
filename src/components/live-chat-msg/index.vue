<template lang="pug">
div.flex.text-sm.shadow
    p.py-1.px-4.bg-white(v-if="item.type === 'system'" :class="textColor ? 'text-red' : 'text-grey-light'") 系统公告：{{item.content}}
    div.px-4.inline-block.mt-1.w-full(style="background: #f1efff" v-else)
      // button.w_30.h_30.mr-1.bg-no-repeat.bg-contain(v-if="item.userInfo.nobleGradeNum"
        :style="{'backgroundImage': `url(${getImageUrl('live-chat-noble/level1@2x.png')})`}")
        span.invisible {{item.userInfo.nobleGradeNum}}
      button.w_30.h_30.mr-1.bg-no-repeat.bg-contain(v-if="item.userInfo.nobleGradeNum"
        :style="{'backgroundImage': `url(${IMG_URL}${nobles[item.userInfo.nobleGradeNum].logoUrl})`}")
        span.invisible {{item.userInfo.nobleGradeNum}}
      button.w_38.h_22.bg-no-repeat.bg-contain.mr-1(
        :style="{'backgroundImage': `url(${getImageUrl('live-chat-msg/id_1@2x.png')})`}")
        span.invisible 房
      button.w_78.h_22.bg-no-repeat.bg-contain.mr-1(v-if="item.userInfo.memGradeLevel"
        :style="{'backgroundImage': `url(${getImageUrl('live-chat-msg/grade_21@2x.png')})`}")
        span.invisible {{item.userInfo.memGradeLevel}}
      p.break-all.inline
        strong.text-sm.font-normal.text-blue {{item.userInfo.nickName}}:
        span.text-xs.text-black-light {{item.content}} {{item.userInfo}}
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { IMG_URL } from '@/config/system.conf'
import { computed } from '@vue/reactivity';
const store = useStore()
    
defineProps({
    item: { // 消息对象
        type: Object,
        default() {
            return {}
        }
    },
    textColor: {
        type: String
    }
})
const nobles = computed(() => {
    return store.state.live.nobles
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
