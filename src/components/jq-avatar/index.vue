<template lang="pug">
div.flex.text-xs.justify-between
    div.w-14.h-14.rounded-full.flex-shrink-0.mr-2.overflow-hidden
        van-image(:src="img ? IMG_URL + img : getImageUrl(`default_avatar.png`)")
    div.flex.flex-col.justify-around.flex-1
        div.flex.items-end(v-download)
            span.text-base.mr-2.font-medium.text-red-light {{store.state.user.userInfo.nickName || '登陆/注册'}}
            span.block.w-20.h-6.rounded.overflow-hidden(v-if="levelIcon")
                img.w-full.h-full(:src="IMG_URL + levelIcon")
        p.text-gray-600 {{store.state.user.userInfo.sign || '这家伙很懒 什么都没有留下下下下 ....'}}
    div.flex.items-end.ml-1(v-if="showEdit")
        //- van-icon(name="edit" size="20")

</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { IMG_URL } from '@/config/system.conf';
import { computed } from '@vue/reactivity';

const img = computed(() => {
    return store.state.user.userInfo.pictureUrl || ''
})
defineProps({
    showEdit: { // 是否显示编辑按钮
        type: Boolean, 
        default: true
    },
    levelIcon: { // 是否显示等级icon
        type: String, 
        default: ''
    }
})

const getImageUrl = (name: string) => {
    return new URL(`./${name}`, import.meta.url).href;
}

const store = useStore()
</script>