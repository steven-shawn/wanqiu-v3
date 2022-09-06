<template lang="pug">
div.pb-20.pt-11.bg-gray-100.h-full
  jq-header.fixed 会员等级
  div.px-4
    jq-avatar.my-2(:showEdit="false" :levelIcon="`${state.info.effectUrl}`")
    div.text-xs.bg-white.rounded-lg.px-4.py-3.shadow-lg  
      span 尊敬的{{state.info.level}}级会员,您只需要再消费{{state.info.nextGrowthValue - state.info.currentExperience}}个球钻即可升到{{state.info.nextLevel}}级,您在直播间的等级标记将换成{{state.info.nextLevel}}级
      img.inline.ml-2.w-20.h-6(:src="IMG_URL + state.info.nextEffectUrl")
    my-level.my-3.rounded-lg(:info="state.info")
    div.bg-white.shadow-lg.rounded-lg.text-xs.pb-4
      h2.p-4 如何快速升级
      ul.flex.text-xs.flex-wrap.justify-between
        li.flex.flex-col.justify-center.items-center(v-for="item in upGradeList" :key="item.id" :class="'w-1/3'")
          div.w-10.h-10.rounded-full.mb-2(:class="'up_' + item.id")
          p.text-primary {{item.title}}
          p.text-gray-600.mb-2 {{item.content}}
</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'
import JqAvatar from '@/components/jq-avatar/index.vue'
import MyLevel from '@/components/my-level/index.vue'

import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { _getGrade } from '@/service/modules/user.api'
import { IMG_URL } from '@/config/system.conf'
const router = useRouter()

const state = reactive({
  info: {}
})

// 底部列表数据
const upGradeList = ref([
  { id: 1, icon: '', title: '发送红包', content: '狂刷红包 飙升经验' },
  { id: 2, icon: '', title: '赠送礼物', content: '狂刷礼物 飙升经验' },
  { id: 3, icon: '', title: '充值球钻', content: '充值不停 快乐不止' },
  { id: 4, icon: '', title: '购买贵族', content: '贵族尊享 经验加倍' },
  { id: 5, icon: '', title: '购买方案', content: '贵族专属 无与伦比' },
  { id: 6, icon: '', title: '方案套餐', content: '拉风炫酷 闪亮登场' }
])

onMounted(() => {
  _getGrade().then(data => {
    state.info = data
    // console.log(data)
  })
})

</script>

<style scoped lang="scss">

// @for $i from 1 to 6 {
//   .up_#{i}{ background: url('@/assets/imgs/my/level/up_${i}.png') no-repeat center center; }
// }
.up_1 {
  background: url('@/assets/imgs/my/level/up_1.png') no-repeat center center;
  background-size: contain;
}
.up_2 {
  background: url('@/assets/imgs/my/level/up_2.png') no-repeat center center;
  background-size: contain;
}
.up_3 {
  background: url('@/assets/imgs/my/level/up_3.png') no-repeat center center;
  background-size: contain;
}
.up_4 {
  background: url('@/assets/imgs/my/level/up_4.png') no-repeat center center;
  background-size: contain;
}
.up_5 {
  background: url('@/assets/imgs/my/level/up_5.png') no-repeat center center;
  background-size: contain;
}
.up_6 {
  background: url('@/assets/imgs/my/level/up_6.png') no-repeat center center;
  background-size: contain;
}
</style>
