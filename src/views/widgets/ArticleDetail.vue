<script setup>
import {ref} from "vue";
import {Pointer} from "@element-plus/icons-vue";
import CommentList from "@/components/commentList.vue";
import request from "@/utils/request";
import { useRoute} from "vue-router";
import {onMounted} from "vue";
import router from "@/router/index.js";
import {useUserStore} from "@/store/user.js";
const userStore = useUserStore()
const route = useRoute()
const data = ref({})
const like = ref(false)
const img = ref("")
console.log("这是ArticleDetail组件")
const handleLike = () => {
  like.value =!like.value
  if (like.value) {
    request.post("ArticleLike/", { article_id: route.params.id, user_id: userStore.id })
    data.value.goodCount++
  } else {
    request.patch("ArticleLike/", { article_id: route.params.id, user_id: userStore.id })
    data.value.goodCount--
  }
}

async function getLikesCount() {
  const res = await request.get(`ArticleLike/?article_id=${route.params.id}&user_id=${userStore.id}`)
  like.value = res.isLiked !== 0;
}
async function getArticleDetail() {
  const id = route.params.id
  const res = await request.get(`/ArticleDetail/?id=${id}`)
  data.value = res.data
  img.value =res.img
  img.value =`http://localhost:8000/${img.value}`
  console.log(img.value)
  data.value.content =data.value.content.replace(/<\/p>/g, "").replace(/<p>/g, "");
  console.log(data.value)
}
onMounted(() => {
  getArticleDetail()
  getLikesCount()
})

async function handledelete() {
  const id = route.params.id
  const res = await request.delete(`Article/?id=${id}`)
  if(res.code === 0)
  {
    ElMessage.success("删除成功")
    router.push({name: "ArticleList"})
  }
}
</script>

<template>
  <el-card class="page-container">
    <div class="container">
      <div class="article-item-inner">
        <div class="article-body">
          <div class="user-info">
            <el-avatar :src="img" style="width: 30px; height: 30px;"/>
            <div style="text-decoration: none;margin-left: 10px;">{{data.author}}</div>
            <el-divider direction="vertical"></el-divider>
            <div>{{data.time}}</div>
          </div>
          <div class="title">{{data.title}}</div>
          <el-divider />
          <div> {{data.content}}</div>
          <div class="actions">
            <el-button type="text"  @click="handleLike"><el-icon :class="{ 'like':!like }" ><Pointer /></el-icon>{{ data.goodCount }}</el-button>
            <el-button type="text" v-if="userStore.role==='admin'||userStore.role==='root'||userStore.username===data.author" @click="handledelete">删除</el-button>
          </div>
        </div>
      </div>
    </div>
  </el-card>
  <commentList :articleId="data.Article_id" v-if="data.Article_id" ></commentList>


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
.article-item-inner {
  border-bottom: 1px solid #eee;
  padding: 3px;
  .article-body {
    align-items: flex-start;
    .user-info {
      display: flex;
      color:#4e5969;
    }
  }
}
.title {
  text-decoration: none;
  font-size: 30px;
  margin:10px 0;
  color: #333;
  font-weight: bold;
}
.actions {
  margin-top: 10px;
}
.like {
  color: #4e5969;
}
</style>