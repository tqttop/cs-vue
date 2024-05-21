<script setup>
import { ref } from 'vue'
import request from '../../utils/request'

let documentData = ref([])

async function getData() {
  let res= await request.get('/documents/')
  documentData.value = res.data
  for(let i=0;i<documentData.value.length;i++){
    documentData.value[i].img=`http://localhost:8000/${documentData.value[i].img}`
    documentData.value[i].videos=`http://localhost:8000/${documentData.value[i].videos}`
  }
}
getData()
</script>

<template>
<el-card  class="page-container">
  <div class="container">
  <div class="header" v-for="item in documentData" :key="item.index" @click="$router.push(`/detail/${item.title}`)">
        <img :src="item.img" alt="img">
    <p>{{item.title}}</p>
  </div>
  </div>
</el-card>
</template>


<style scoped lang="scss">
.container{
  display: flex;
  flex-wrap: wrap;
  justify-content:flex-start;
}
.page-container {
  margin: 20px;
  min-height: 100%;
  box-sizing: border-box;
}

.header{
  border : 1px solid red;
  flex: 0 0 calc(25% - 10px);
  margin-right: 30px;
  margin-bottom: 30px;
  img{
    width: 100%;
    height: 80%;
    object-fit: cover;
  }

  p{
    margin: 10px;
    font-size: 15px;
    text-align: center;
    font-family: cursive;
  }
}


</style>