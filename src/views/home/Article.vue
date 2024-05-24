<script setup>
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="ArticlePost">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<style scoped>

</style>