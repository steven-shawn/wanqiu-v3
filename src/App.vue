
<template lang="pug">
//keep-alive  
//keep-alive(v-slot="{ Component }")
    component(:is="Component")
//van-sticky
  jq-download-header    
router-view(v-show="isReady" :key="store.state.live.room_id")
jq-tarbar(v-if="showTarbar")
</template>


<script setup lang="ts">
import JqTarbar from '@/components/jq-tarbar/index.vue'
import JqDownloadHeader from '@/components/jq-download-header/index.vue' 
import { watch, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const showTarbar = ref(false)

const route = useRoute()
const store = useStore()

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
