<script setup>

</script>

<template>
  <div class="navbar navbar-expand-lg  bg-light navbar-light,menuRight headImg" >
    <span class="navbar-brand headWord"  >考研服务平台</span>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/home">首页<span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/document">资料下载</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-expanded="false">管理</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/user">用户管理</a>
            <a class="dropdown-item" href="/admin">管理员管理</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">开发中...</a>
          </div>
        </li>
      </ul>
    </div>
    <el-button type="primary" >注册</el-button>
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

</style>