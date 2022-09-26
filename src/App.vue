
<template lang="pug">
//keep-alive
div.startup.relative(v-if="!isReady")
  span.inline-block.rounded-full.absolute.right-2.top-4.text-xs.text-white(@click="onRoute") {{time}}s | 后关闭  
router-view(v-show="isReady")
jq-tarbar(v-if="isReady && showTarbar")

</template>


<script setup lang="ts">
import JqTarbar from '@/components/jq-tarbar/index.vue'
import { watch, onMounted, ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const showTarbar = ref(false)
const time = ref(5)
let timer: number | null = null

const route = useRoute()

watch(route, (val) => { // t监视tab页面
  showTarbar.value = val.path.endsWith('/index')
})

const onRoute = () => {
  if (time.value > 3) {
    return
  }
  clearTimer()
  isReady.value = true
}

const isReady = ref(false) // 页面加载完全才显示
onMounted(() => {
  // isReady.value = true
  clearTimer()
  timer = setInterval(() => {
    time.value--
    if (time.value < 0) {
      clearTimer()
      isReady.value = true
    }
  }, 1000)
})

const clearTimer = () => {
  if (timer) {
    clearInterval(timer)
  }
}
onBeforeMount(() => {
  clearTimer()
})
</script>

<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;
  background: #dfe5e9;
}
.startup {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/start.jpg') no-repeat center center;
  background-size: 100%;
  span {
    background: rgba(255, 255, 255, 0.5);
    padding: 5px 10px;
    border: 100%;
  }
}
</style>
