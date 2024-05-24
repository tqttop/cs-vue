<script setup>
import {Search,  Upload } from '@element-plus/icons-vue'
import { ref,reactive,onMounted } from 'vue'
import ArticleItem from '@/views/widgets/ArticleItem.vue'
import {useUserStore} from "@/store/user.js";
import router from "@/router/index.js";
import request from "@/utils/request.js";
const userStore = useUserStore()
const logoInfo = ref([
  {
    letter: 'C',
    color:"#3285FF"
  },
  {
    letter: 'h',
    color: '#FB3624'
  },
  {
    letter: 'a',
    color: '#FFBA02'
  },
  {
    letter: 't',
    color: '#3285FF'
  },
  {
    letter: 'u',
    color: '#FD3224'
  },
  {
    letter: 's',
    color: '#FFBA02'
  },
    ]
)
console.log("这是ArticleList组件")
const showHeader = ref(true)
const data = ref()
const scrollContainer = ref(null)
async function getArticleList() {
  const res = await request.get('/Article/')
  data.value = res.data
  for (let i = 0; i < data.value.length; i++) {
    data.value[i].img =`http://localhost:8000/${data.value[i].img}`
  }
}
const handleScroll = (event) => {
  showHeader.value = event.scrollTop <= 300;
}

onMounted(() => {
  scrollContainer.value = document.querySelector('.el-scrollbar__wrap')
  getArticleList()
})
const loading = ref(false)
const change = () => {
  router.push('ArticlePost')
}

const hot = () => {
  for (let i = 0; i < data.value.length; i++) {
    for (let j = 0; j < data.value.length; j++) {
      if (data.value[i].commentCount > data.value[j].commentCount) {
        let temp = data.value[i]
        data.value[i] = data.value[j]
        data.value[j] = temp
      }
    }
  }
}
const near = () => {
  for (let i = 0; i < data.value.length; i++) {
    for (let j = 0; j < data.value.length; j++) {
      if (data.value[i].time > data.value[j].time) {
        let temp = data.value[i]
        data.value[i] = data.value[j]
        data.value[j] = temp
      }
    }
  }
}
const good = () => {
  for (let i = 0; i < data.value.length; i++) {
    for (let j = 0; j < data.value.length; j++) {
      if (data.value[i].goodCount > data.value[j].goodCount) {
        let temp = data.value[i]
        data.value[i] = data.value[j]
        data.value[j] = temp
      }
    }
  }
}
</script>

<template>
<div>
  <div class="header" :class="{ 'header-hidden':!showHeader }">
    <div class="header-content">
      <router-link to="/home" class="logo">
        <span v-for="item in logoInfo" :style="{color:item.color}">{{item.letter}}</span>
      </router-link>
      <div class="info">
        <el-button type="primary" v-if="userStore.token" :icon="Upload" @click="change">发帖
        </el-button>
      </div>
    </div>
    <div style="width:70%;align-items: center;margin: 0 auto;">
    <div class="top-tab">
      <div @click="hot()">热榜</div>
      <el-divider direction="vertical"></el-divider>
      <div @click="good()">推荐</div>
      <el-divider direction="vertical"></el-divider>
      <div @click="near()">最新</div>
    </div>
    <div v-loading="loading">
      <div v-if="data==null"><el-empty description="没有帖子，去发布一个吧~" /></div>
    <el-scrollbar height="700px" ref="scrollContainer" @scroll.native="handleScroll">
      <p v-for="item in data" :key="item" class="scrollbar-demo-item">
        <ArticleItem :data="item" ></ArticleItem>
      </p>
    </el-scrollbar>
      </div>
        </div>
        <</div>
</div>
</template>

<style scoped>
.header{
  width:100%;
  position: fixed;
  height: 60px;
  box-shadow: 0 2px 6px 0 #ddd;
  .header-content{
    align-items: center;
    margin: 0 auto;
    height: 100%;
    display: flex;
    width: 70%;
    .logo{
      font-size: 24px;
      text-decoration: none;
    }
    .info{
      width:300px;
      right: 0;
      position: absolute;
      display: flex;
    }

  }
}
.scrollbar-demo-item {
  display: flex;
  height: 120px;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  margin:6px 0;
}
.scrollbar-demo-item:hover {
  background: #f3f0f0
}

.header-hidden {
  transform: translateY(-100%);
}
.top-tab{
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

</style>