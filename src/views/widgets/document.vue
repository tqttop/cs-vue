<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/store/user.js'
const userStore = useUserStore()
console.log("66666666n")
console.log(userStore.img)
</script>

<template>
<div><a href="/admin">管理员</a></div>
    <div>文档</div>
<p>{{ userStore.token }}</p>
</template>

<style scoped>

</style>