<script setup>
import {ElCard} from "element-plus";
import {ref} from "vue";
import {useUserStore} from "@/store/user.js";
import CommentListItem from "@/views/widgets/commentListItem.vue";
import request from "@/utils/request.js";
import {defineProps} from "vue";
const userStore = useUserStore();
const data = ref({});
const props = defineProps({
  articleId: {
    type: Number,
    required: true
  }
  })



const commentContent = ref("");
async function addComment() {
  const res = await request.post("/Comment/", {content: commentContent.value, articleId: props.articleId, id: userStore.id});
  if (res.code ===0) {
    ElMessage.success("评论成功");
    getComments();
    commentContent.value = "";
  }
  else {
    ElMessage.error("评论失败");
  }
}
async function getComments() {
  const res = await request.get(`/Comment/?articleId=${props.articleId}`);
  data.value = res.data;
  for (let i = 0; i < data.value.length; i++) {
    data.value[i].img =`http://localhost:8000/${data.value[i].img}`
  }
}

getComments();
</script>

<template>
  <el-card class="page-container">
    <div class="container">
      <div style="font-size: 18px; font-weight: bold">评论</div>
    </div>
    <div class="comment-form-panel" v-if="userStore.token">
      <el-avatar :src="userStore.img" style="width: 40px; height: 40px; margin: 10px 0;"/>
      <el-input
        placeholder="文明发言"
        v-model="commentContent"
        style="width: 70%; margin-left: 10px;"

      />
      <el-button type="primary" @click="addComment" style="margin-left: 10px;">发表评论</el-button>
    </div>
    <el-divider />
    <div>
      <commentListItem  :commentData="data" ></commentListItem>
    </div>
  </el-card>
</template>

<style scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  width: 50%;
  margin: 5px auto;
}
.container{
  display: flex;
  flex-wrap: wrap;
  justify-content:flex-start;
}
.comment-form-panel {
  display: flex;
 align-items: center;
}
</style>