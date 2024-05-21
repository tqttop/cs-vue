<script setup>
import router from "@/router/index.js";
import {useUserStore} from "@/store/user.js";
const userStore = useUserStore();
 async function logout(){
  await ElMessageBox.confirm('确认退出登录吗？', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  });
  userStore.removeToken();
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="navbar navbar-expand-lg  bg-light navbar-light,menuRight headImg"  >
    <span class="navbar-brand headWord"  >考研服务平台</span>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="link" to="/">首页</router-link>
        </li>
        <li class="nav-item">
          <router-link class="link" to="/document">学习资料</router-link>
        </li>
        <li  class="nav-item ">
            <router-link class="link" to="/user">用户管理</router-link>
        </li>
        <li  class="nav-item ">
            <router-link class="link" to="/ArticleList">论坛</router-link>
        </li>
      </ul>
    </div>
    <router-link to="/login" v-if="!userStore.token"><el-button type="primary">登录/注册</el-button></router-link>
    <el-dropdown  v-if="userStore.token">
        <span class="el-dropdown-link" style="margin-right: 10px;margin-left: 10px;color: white">
          <el-avatar :src="userStore.img"/>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      <template #dropdown>
        <el-dropdown-menu>
          <router-link to="/center"><el-dropdown-item>个人中心</el-dropdown-item></router-link>
          <el-dropdown-item @click="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.headWord{
  font-size: 24px;
  color: white;
  font-weight: bold;
  margin-left: 10px
}
.headImg{
  background-image: url('https://cdn.pixabay.com/photo/2017/02/15/20/33/floral-2069810_640.png')
}
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.link{
  text-decoration: none;
  padding: 10px;
  font-size: 18px;
  margin-right: 10px;
}
.router-link-exact-active{
  color: white;
}
</style>