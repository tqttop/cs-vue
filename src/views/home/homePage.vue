<script setup>
import homeHead from '@/components/homeHead.vue'
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
 <homeHead></homeHead>
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