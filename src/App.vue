
<template lang="pug">
router-view(v-show="isReady")
jq-tarbar(v-if="showTarbar")
</template>


<script setup lang="ts">
import JqTarbar from '@/components/jq-tarbar/index.vue'
import { watch, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const showTarbar = ref(false)

const route = useRoute()

watch(route, (val) => { // t监视tab页面
  showTarbar.value = val.path.endsWith('/index')
})

const isReady = ref(false) // 页面加载完全才显示
onMounted(() => {
  isReady.value = true
})
</script>

<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;
  background: #dfe5e9;
}
</style>
