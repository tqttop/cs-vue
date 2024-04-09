<script lang="ts" setup>
import homeHead from '@/components/homeHead.vue'
import { toRaw } from '@vue/reactivity'
import request from '@/utils/request'
import { ref,onMounted } from 'vue'
let banitem = ref()
let userList = ref([])
let userCountpage = ref()
let currentPage = ref(1)
const pageSize = ref(10)
let banReason = ref('')
let showban= ref(false)
//普通用户列表功能
//展示列表

async function getUserList(pagenumber) {
  const res = await request.get(`/userList/?page=${pagenumber}`)
  userList.value = toRaw(res.data.data)
  userCountpage.value = res.data.count
}
onMounted(() => {
  getUserList(1)
})
//展示点击的列表页面
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  getUserList(val)
  console.log(val)
}
//封禁功能
function ban(item) {
  banitem = item
}
async function checkBan(item) {
  try {
    const res = await request.post('/userList/', {
      phone: item.phone, reason: banReason.value
    })
    alert(res.data.message)
    handleCurrentChange(currentPage.value)
    showban.value = false
  }catch (error) {
    console.log(error)
  }
}
//封禁用户列表功能
let bancurrentPage = ref(1)
let banuserList = ref([])
let banCountpage = ref(1)
async function getbanList(pagenumber) {
  try {
  const res = await request.get(`/banList/?page=${pagenumber}`)
  banuserList.value = toRaw(res.data.data)
  banCountpage.value = res.data.count
}catch (error) {
    console.log(error)
  }}
onMounted(() => {
  getbanList(1)
})

async function unban(item) {
  try {
    const res = await request.post('/banList/', {
      phone: item.phone
    })
    alert(res.data.message)
    banhandleCurrentChange(bancurrentPage.value)
  } catch (error) {
    console.log(error)
  }
}
const banhandleCurrentChange = (val: number) => {
  bancurrentPage.value = val
  getbanList(val)
}
//利用 async和await
</script>

<template>
  <homeHead></homeHead>
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
              <el-button type="text" size="default" @click="showban=true,ban(item)">封禁</el-button>
              <el-button type="text" size="default" @click="grow">设为管理员</el-button>
            </td>
          </tr>
        </table>
        </div>
          <div class="demo-pagination-block" style="margin-top: 20px">
            <el-pagination
                v-model:current-page="bancurrentPage"
                v-model:page-size="banpageSize"
                layout="prev, pager, next, jumper"
                :total="userCountpage"
                @current-change="handleCurrentChange"
            />
          </div>
        <div v-if="showban" style="position: fixed;top: 30%;left: 40%;
          width:350px;height: 250px; background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); ">
          <el-input v-model="banReason" placeholder="请输入封禁原因" style="margin-top: 20px;margin-left: 40px;width: 250px;height: 30px;"></el-input>
            <el-form-item style="position: absolute;top: 200px;left: 100px;">
              <el-button type="primary" @click="checkBan(banitem)">确定</el-button>
              <el-button type="primary" @click="showban=false">取消</el-button>
            </el-form-item>
        </div>
      </el-tab-pane>
      <el-tab-pane label="封禁用户">
        <el-row>
          <el-col :span="5"><el-input v-model="searchBanname" placeholder="请输入用户名进行搜索"></el-input></el-col>
          <el-col :span="12"><el-button type="primary" @click="bansearch">搜索</el-button></el-col>
        </el-row>
        <div style="margin-top: 20px">
          <table style="width: 1600px">
            <tr class="bantable-head">
              <th>name</th>
              <th>手机号</th>
              <th>封禁时间</th>
              <th>原因</th>
              <th>操作</th>
            </tr>
            <tr class="bantable-body" v-for="item in banuserList" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.time}}</td>
              <td>{{ item.reason }}</td>
              <td>
                <el-button type="text" size="default" @click="unban(item)">解封</el-button>
              </td>
            </tr>
          </table>
        <div class="demo-pagination-block" style="margin-top: 20px">
          <el-pagination
              v-model:current-page="bancurrentPage"
              v-model:page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="banCountpage"
              @current-change="banhandleCurrentChange"
          />
        </div>
          </div>
      </el-tab-pane>
    </el-tabs>
</template>

<style scoped>
.headImg{
  background-image: url('https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_640.jpg')
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
.bantable-head{
  background-color: #f2f2f2;
  width: 1600px;
  height: 20px;
  text-align: center;
}
.bantable-head th{
  width: 20%;
}
.bantable-body{
  border: 1px solid bisque;
  width: 1600px;
  height: 20px;
  text-align: center;
}
.bantable-body td{
  width: 20%;
}
</style>