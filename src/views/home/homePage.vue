<script setup>
import { ref, onMounted} from 'vue'
let imgList = ref(["src/assets/img1.jpg","src/assets/img2.jpg","src/assets/img3.jpg","src/assets/img4.jpg"])

let targetTime = new Date("2024-12-24 09:00:00").getTime()
let days = ref()
let hours = ref()
let minutes = ref()
let seconds = ref()
function updateCount() {
  let now = new Date().getTime()
  let timeDifference = targetTime- now; // 计算目标时间与当前时间的时间差
  // 将时间差转换为倒计时显示的字符串
    days.value = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes.value = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    seconds.value = Math.floor((timeDifference % (1000 * 60)) / 1000)

}
onMounted(() => {
  setInterval(updateCount, 1000);
})
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
  <div class="container">
    <el-carousel height="500px" indicator-position="outside">
      <el-carousel-item v-for="item in imgList" :key="item">
        <img style="width: 100%; height: 100%;object-fit: cover;overflow: hidden;" :src="item" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="floating-box">
      <div style="font-size: 16px;color: red;font-weight: bold">考研倒计时：</div>
      <p style="color:red">{{ days }}天{{ hours }}小时{{ minutes }}分{{ seconds }}秒</p>
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

.container{
  margin-top: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.floating-box {
  width: 100px; /* 定义浮动框的宽度 */
  height: 100px; /* 定义浮动框的高度 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  position: fixed; /* 固定定位，相对于视口 */
  top: 50%; /* 从顶部的中心位置开始 */
  right: 20px; /* 距离右侧边缘的距离 */
}
</style>