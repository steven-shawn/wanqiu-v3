<template>
    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2.5a2 2 0 0 1 2 2v1.499l2.553-1.275A1 1 0 0 1 16 5.618v4.764a1 1 0 0 1-1.447.894L12 10v1.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h8zm-6.5 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" :fill="color" fill-rule="evenodd"/>
    </svg>
</template>


<script lang="ts" setup>
defineProps({
    color: {
        type: String,
        default: '#666'
    }
})
</script>