<script setup>
import { ref } from 'vue'
import request from '@/utils/request'
let adminList = ref([])
let adminCountpage = ref(0)
let currentPage = ref(1)
let pageSize = ref(10)
let searchname = ref('')
async function getAdminList(item) {
  try {
  let res = await request.get(`admin/?page=${item}`)
  adminList.value = res.data.data
  adminCountpage.value = res.data.count
}catch(error){
  console.log(error)
}}


const handleCurrentChange = (val) => {
  currentPage.value = val
  getAdminList(val)
}

async function search() {
  try {
    let res = await request.post('adminSearch/',
    {name: searchname.value})
    adminList.value = res.data.data
    adminCountpage.value = res.data.count
  }catch(error){
    console.log(error)
  }
}

getAdminList(1)
function remake() {
  searchname.value = ''
  getAdminList(currentPage.value)
}

async function fall(item) {
  try {
    await request.post('admin/', {name: item.name})
  }catch(error){
    console.log(error)
  }
  getAdminList(currentPage.value)
}
</script>

<template>
  <el-tabs type="border-card">
    <el-row >
    <el-col :span="3"><el-input v-model="searchname" placeholder="请输入用户名进行搜索"></el-input></el-col>
    <el-col :span="3"><el-button type="primary" @click="search">搜索</el-button></el-col>
    <el-col :span="3"><el-button type="primary" @click="remake">重置</el-button></el-col>
    </el-row>
    <table style="width: 1600px">
      <tr class="table-head">
        <th>name</th>
        <th>手机号</th>
        <th>操作时间</th>
        <th>操作</th>
      </tr>
      <tr class="table-body" v-for="item in adminList" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.time}}</td>
        <td>
          <el-button type="text" size="default" @click="fall(item)">取消管理员</el-button>
        </td>
      </tr>
    </table>
    <div class="demo-pagination-block" style="margin-top: 20px">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="adminCountpage"
          @current-change="handleCurrentChange"
      />
    </div>
    </el-tabs>
</template>

<style scoped>
.table-head{
  background-color: #f2f2f2;
  width: 1600px;
  height: 20px;
  text-align: center;
}
.table-head th{
  width: 25%;
}
.table-body{
  border: 1px solid bisque;
  width: 1600px;
  height: 20px;
  text-align: center;
}
.table-body td{
  width: 25%;
}
</style>