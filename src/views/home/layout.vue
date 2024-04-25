<script setup>
import homeHead from '@/components/homeHead.vue'
import {useUserStore} from "@/store/user.js";
const userStore = useUserStore();
</script>

<template>
<homeHead></homeHead>
  <router-view v-slot="{ Component }">
    <keep-alive exclude="detail">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>
<style scoped>

</style>