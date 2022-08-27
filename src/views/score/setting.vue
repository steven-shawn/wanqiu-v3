<template lang="pug">
div.pb-20.pt-11.bg-gray-100.h-full 
  jq-header.fixed 设置
  div.px-4.py-4
    ul.flex.flex-col
        li.h-11.bg-white.mb-2.shadow-lg.rounded-lg.flex.justify-between.items-center.px-4(v-for="item in list" :key="item.id" @click="item.click")
            span.text-xs {{item.title}}
            span.flex.items-center
              van-switch(v-model="state.checked" size="20" v-if="item.swtich")
              span.text-grey-light.text-xs(v-else) {{item.rightText}}
              van-icon.text-gray-600(name="arrow")
  van-action-sheet(v-model:show="state.show" :actions="state.actions" @select="onSelect" cancel-text="取消")                 
</template>

<script setup lang="ts">
import JqHeader from '@/components/jq-header/index.vue'
import { Switch, ActionSheet } from 'vant';


import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

interface IActionsheet {
  name: string
}

/** 数据区 */
const state = reactive({
  checked: false, // switch开关
  actions: [],
  show: false, // show actionsheets
})

// 语言
const langs = [
  { name: '中文简体' },
  { name: '中文繁体' },
  { name: 'English' },
]

const sounds = [
  { name: '声音1' },
  { name: '声音2' },
  { name: '声音3' },
  { name: '声音4' },
]

// 列表数据
const list = ref([
  { id: 1, icon: '', title: '语言显示', router: '', rightText: '中文', click: () => { onActionsheet('lang') } },
  { id: 2, icon: '', title: '进球声音', router: '', rightText: '声音1', click: () => { onActionsheet('sound') } },
  { id: 3, icon: '', title: '震动', router: '', swtich: true },
  { id: 4, icon: '', title: '应用信息', router: '', rightText: '' }
])

/*** 方法区 */
const onActionsheet = (type: string) => {
  if(type === 'lang') {
    state.actions = langs
  } else {
    state.actions = sounds
  }
  state.show = true
}

const onSelect = () => {
  state.show = false
}

// 点击跳转的or 其他业务逻辑
const onRoute = item => {
    if (item.router) {
        router.push(item.router)
    }
}

</script>
