<template>
    <svg data-v-ee54be44="" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path data-v-ee54be44="" d="M7.465 8.534V16a7.99 7.99 0 0 1-5.078-2.275 7.988 7.988 0 0 0 2.388-5.19l2.69-.001zm3.76 0a7.993 7.993 0 0 0 2.387 5.191A7.986 7.986 0 0 1 8.535 16l-.001-7.466zm-7.521 0a6.926 6.926 0 0 1-2.028 4.392A7.964 7.964 0 0 1 0 8.535zm12.296 0a7.978 7.978 0 0 1-1.675 4.393 6.926 6.926 0 0 1-2.029-4.392zM1.676 3.075a6.926 6.926 0 0 1 2.028 4.391H0a7.978 7.978 0 0 1 1.641-4.349zM7.466 0l-.001 7.465h-2.69a7.993 7.993 0 0 0-2.387-5.19A7.986 7.986 0 0 1 7.465 0zm1.069 0a7.99 7.99 0 0 1 5.078 2.275 7.988 7.988 0 0 0-2.388 5.19H8.534zm5.79 3.073A7.978 7.978 0 0 1 16 7.465h-3.704a6.926 6.926 0 0 1 2.015-4.378z" :fill="color" fill-rule="evenodd"></path></svg>
</template>

<script lang="ts" setup>
defineProps({
    color: {
        type: String,
        default: '#666'
    }
})
</script>