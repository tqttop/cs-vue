<script lang="ts" setup>
import { toRaw } from '@vue/reactivity'
import request from '@/utils/request'
import { ref,onMounted } from 'vue'
let userList = ref([])
let userCountpage = ref(1)
let currentPage = ref(1)
const pageSize = ref(10)
//利用 async和await
async function getUserList(pagenumber) {
  const res = await request.post('/userList/', {
    page: pagenumber,
  })
  userList.value = toRaw(res.data.data)
  userCountpage.value = res.data.count
}

onMounted(() => {
  getUserList(1)
})
const handleCurrentChange = (val: number) => {
  getUserList(val)
}

</script>

<template>
  <div class="navbar navbar-expand-lg  bg-light navbar-light,menuRight headImg" >
    <span class="navbar-brand headWord"  >用户管理</span>
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
    <a href="/login"><el-button type="primary" >注册</el-button></a>
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
    <el-tabs type="border-card">
      <el-tab-pane label="用户列表">
          <el-row>
            <el-col :span="5"><el-input v-model="searchname" placeholder="请输入用户名进行搜索"></el-input></el-col>
            <el-col :span="12"><el-button type="primary" @click="search">搜索</el-button></el-col>
          </el-row>
        <div style="margin-top: 20px">
        <table style="width: 1600px">
          <tr class="table-head">
            <th>name</th>
            <th>手机号</th>
            <th>注册时间</th>
            <th>操作</th>
          </tr>
          <tr class="table-body" v-for="item in userList" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.time}}</td>
            <td>
              <el-button type="text" size="default" @click="ban">封禁</el-button>
              <el-button type="text" size="default" @click="grow">设为管理员</el-button>
            </td>
          </tr>
        </table>
        </div>
          <div class="demo-pagination-block" style="margin-top: 20px">
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="userCountpage"
                @current-change="handleCurrentChange"
            />
          </div>
      </el-tab-pane>
      <el-tab-pane label="封禁用户">Config
      </el-tab-pane>
    </el-tabs>
</template>

<style scoped>
.headWord{
  font-size: 24px;
  color: white;
  font-weight: bold;
  margin-left: 10px
}
.headImg{
  background-image: url('https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_640.jpg')
}
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
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