<script setup>
import homeHead from '@/components/homeHead.vue'
</script>

<template>
<homeHead></homeHead>
  <router-view v-slot="{ Component }">
    <keep-alive >
    <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<style scoped>

</style>