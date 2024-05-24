<script setup>
import {Avatar, ChatDotSquare, Pointer, View} from "@element-plus/icons-vue";
import router from "@/router/index.js";
import request from "@/utils/request.js";
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});
const change = () => {
  router.push(`/ArticleDetail/${props.data.Article_id}`)
  request.post('/ArticleDetail/', {id: props.data.Article_id})
}
</script>

<template>
<div class="article-item">
  <div class="article-item-inner">
    <div class="article-body">
      <div class="user-info">
        <el-Avatar :src="data.img" style="width: 30px; height: 30px;"/>
        <div style="text-decoration: none;margin-left: 5px">{{data.author}}</div>
        <el-divider direction="vertical"></el-divider>
        <div class="time">{{data.time}}</div>
      </div>
      <div @click="change()" class="title"> {{data.title}}</div>
      <div class="summary">{{data.summary}}</div>
      <div class="article-info">
        <span><el-icon><View /></el-icon>{{ data.readCount === 0 ? "阅读" : data.readCount }}</span>
        <span><el-icon><Pointer /></el-icon>{{data.goodCount===0?"喜欢":data.goodCount}}</span>
        <span><el-icon><ChatDotSquare /></el-icon>{{data.commentCount===0?"评论":data.commentCount}}</span>
      </div>
  </div>
</div>
</div>
</template>

<style scoped lang="scss">
.article-item {
  .article-item-inner {
    border-bottom: 1px solid #eee;
    padding: 3px;
    .article-body {
      align-items: flex-start;
      .user-info {
        display: flex;
        color:#4e5969
      }
    }
  }
}
.title {
  text-decoration: none;
  font-size: 16px;
  color: #333;
  font-weight: bold;
  cursor: pointer;
}
.summary {
  margin: 3px 0;
  font-size: 14px;
  color: #666;
}
.article-info {
  display: flex;
  align-items: center;
  span{
    padding: 0 5px;
    margin-bottom: 0;
  }
}
</style>