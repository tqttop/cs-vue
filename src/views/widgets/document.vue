<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/store/user.js'
const userStore = useUserStore()
</script>

<template>
<div><a href="/admin">管理员</a></div>
    <div>文档</div>
<p>{{ userStore.token }}</p>
  <button @click="userStore.setToken('aaaaaaa')">登录</button>
</template>

<style scoped>

</style>