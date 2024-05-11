<template>
      <video :src="documentData"
             controls
             preload="auto"
             width="640"
             height="360"
             style=" width: 100%; height: 100%; object-fit: cover; position: fixed; top:0; left: 0;">
        Your browser does not support the video tag.
      </video>
</template>

<script setup>
import { ref,onMounted } from "vue";
import request from "@/utils/request";
import {useRoute} from 'vue-router'
const route = useRoute()
const documentData = ref([]);
async function getVideoUrl() {
  const title = route.params.title;
  const response = await request.get(`/videos/${title}`);
  documentData.value = response.data.videos;
  console.log(documentData.value)
  documentData.value=`http://localhost:8000/${documentData.value}`
  console.log(documentData.value)
}

onMounted(() => {
  getVideoUrl();
});
</script>