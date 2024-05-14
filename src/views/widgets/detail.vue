<style lang="scss" scoped>
.header-left {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>
<template>
  <div>
    <span style="font-size: 18px; cursor: pointer;" @click="$router.go(-1)">返回</span>
    <span style="margin: 0 10px;" >|</span>
    <span style="font-size: 18px;"> {{ route.params.title }} </span>
    <span style="position: absolute; right: 0;">
      <el-button  v-if="userStore.role==='admin'||userStore.role==='root'" type="danger" class="ml-2" @click="deleteDocument()">删除</el-button>
    </span>
  </div>
      <video :src="documentData"
             controls
             preload="auto"
             style=" width: 60%; height: 60%;object-fit: cover; position: fixed;top: 50%; left: 50%; transform: translate(-50%, -50%);">
        Your browser does not support the video tag.
      </video>
</template>

<script setup>
import {useUserStore} from "@/store/user";
import { ref,onMounted } from "vue";
import request from "@/utils/request";
import {useRoute} from 'vue-router'
import router from "@/router/index.js";
const route = useRoute()
const documentData = ref([]);
const userStore = useUserStore();
async function getVideoUrl() {
  const title = route.params.title;
  const response = await request.get(`/videos/${title}`);
  documentData.value = response.data.videos;
  console.log(documentData.value)
  documentData.value=`http://localhost:8000/${documentData.value}`
  console.log(documentData.value)
}

async function deleteDocument() {
  const title = route.params.title;
  const response = await request.delete(`/documents/?title=${title}`);
  console.log(response);
  if (response.code === 0) {
    ElMessage.success('删除成功');
    router.push({ name: 'document' });
  } else {
    alert('删除失败');
  }
}

onMounted(() => {
  getVideoUrl();
});
</script>