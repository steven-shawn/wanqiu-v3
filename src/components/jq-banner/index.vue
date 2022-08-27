<template lang="pug">
div.h-40.w-full.bg-white.px-2
  van-swipe(:pagination-visible="true" pagination-color="#426543" autoplay="3000")
    van-swipe-item(v-for="(item, index) in bannerList" :key="index")
      van-image(:src="item.pic_url" fit="cover")
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

import { _banners } from '@/service/modules/user.api'
import { SET_BANNER } from '@/store/types.store'

const store = useStore()
let bannerList = ref([])

onMounted(async () => {
    await store.dispatch(SET_BANNER)
    bannerList.value = store.getters.banners
})

</script>
