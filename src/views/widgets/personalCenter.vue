<script setup>
import request from '@/utils/request'
import {useUserStore} from "@/store/user.js";
const userStore = useUserStore();
import { ref } from 'vue'
import {Lock} from "@element-plus/icons-vue";
import router from "@/router/index.js";
const form = ref()
const pwdform= ref()
const nameModel = ref({
 oldName: userStore.username,
  newName: '',
})
const passwordModel = ref({
  password: '',
  repassword: '',
})
const rules1 = {
  newName: [
    { required: true, message: "请输入新用户名", trigger: "blur" },
    { pattern: /^\S{2,8}$/, message: "长度在 2 到 8 个字符", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        // 判断 value 和 当前 form 中收集的 password 是否一致
        if (value === userStore.username) {
          callback(new Error('新旧用户名不能相同'))
        } else {
          callback() // 就算校验成功，也需要callback
        }
      },
      trigger: 'blur'
    }
  ],
};
const rules2 = {
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15位 的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15位 的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        // 判断 value 和 当前 form 中收集的 password 是否一致
        if (value !== passwordModel.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback() // 就算校验成功，也需要callback
        }
      },
      trigger: 'blur'
    }
  ]
}
const centerDialogVisible = ref(false)
const centerDialogVisible1 = ref(false)
async function nameEdit() {
  await form.value.validate()
  await request.patch('change/', { name: nameModel.value.newName })
  ElMessage.success('修改成功')
  centerDialogVisible.value = false
  userStore.setName(nameModel.value.newName)
}

async function passwordEdit() {
  await pwdform.value.validate()
  await request.patch('change/password/', { password: passwordModel.value.password })
  ElMessage.success('修改成功')
  centerDialogVisible1.value = false
  userStore.removeToken()
  router.push('/home')
}

</script>

<template>
    <el-descriptions title="个人中心" :column="3" border>
      <el-descriptions-item
          label="用户名"
          label-align="right"
          align="center"
          label-class-name="my-label"
          class-name="my-content"
          width="150px"
      >
       {{ userStore.username }}
      </el-descriptions-item>
      <el-descriptions-item label="手机号" label-align="right" align="center">
        {{ userStore.user_phone }}
      </el-descriptions-item>
      <el-descriptions-item label="权限" label-align="right" align="center">
        {{ userStore.role }}
      </el-descriptions-item>
      <el-descriptions-item label="用户id" label-align="right" align="center">
        <el-tag size="small">{{ userStore.id }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="操作" label-align="right" align="center">
        <el-button type="success" @click="centerDialogVisible = true">修改用户名</el-button>
        <el-button type="danger" @click="centerDialogVisible1 = true">修改密码</el-button>
      </el-descriptions-item>
    </el-descriptions>

  <el-form :rules="rules1"
           :model="nameModel"
            ref="form">
  <el-dialog
      v-model="centerDialogVisible"
      title="用户名修改"
      width="500"
      destroy-on-close
      center
  >
    <el-form-item >
      <el-input
        disabled
        v-model="nameModel.oldName"
      /></el-form-item>
    <el-form-item style="margin-top: 20px" prop="newName">
      <el-input v-model="nameModel.newName" placeholder="请输入新用户名" />
    </el-form-item>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">返回</el-button>
        <el-button type="primary" @click="nameEdit">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  </el-form>

  <el-form :rules="rules2"
           :model="passwordModel"
            ref="pwdform">
    <el-dialog
        v-model="centerDialogVisible1"
        title="密码修改"
        width="500"
        destroy-on-close
        center
    >
      <el-form-item prop="password">
        <el-input
            v-model="passwordModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input
            v-model="passwordModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
        ></el-input>
      </el-form-item>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible1 = false">返回</el-button>
          <el-button type="primary" @click="passwordEdit">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-form>
  </template>
  <style scoped>
    :deep(.my-label) {
      background: var(--el-color-success-light-9) !important;
    }
    :deep(.my-content) {
      background: var(--el-color-danger-light-9);
    }
  </style>
