<script setup>

</script>

<template>
  <div class="navbar navbar-expand-lg  bg-light navbar-light,menuRight headImg" >
    <span class="navbar-brand headWord"  >考研服务平台</span>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="link" to="/">首页</router-link>
        </li>
        <li class="nav-item">
          <router-link class="link" to="/document">资料下载</router-link>
        </li>
        <li  class="nav-item dropdown">
          <a class="link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-expanded="false">管理</a>
          <div class="dropdown-menu">
            <router-link class="dropdown-item" to="/user">用户管理</router-link>
            <router-link class="dropdown-item" to="/admin">管理员管理</router-link>
          </div>
        </li>
      </ul>
    </div>
    <router-link to="/login"><el-button type="primary">登录/注册</el-button></router-link>
    <el-dropdown >
        <span class="el-dropdown-link" style="margin-right: 10px;margin-left: 10px;color: white">
          xxxx<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>成绩分析</el-dropdown-item>
          <el-dropdown-item>注销</el-dropdown-item>
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