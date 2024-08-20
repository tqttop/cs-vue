<script setup>
import request from '@/utils/request'
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import router from "@/router/index.js";
import {useUserStore} from "@/store/user.js";
const isRegister = ref(false)
const form = ref()

// 整个的用于提交的form数据对象
const formModel = ref({
  phone: '',
  password: '',
  repassword: '',
  captcha: ''
})

const rules1 = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请填写正确的手机号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15位 的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15位 的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        // 判断 value 和 当前 form 中收集的 password 是否一致
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback() // 就算校验成功，也需要callback
        }
      },
      trigger: 'blur'
    }
  ]
}

const countDown= ref(0)
let timer
const getCaptcha = async () => {
  await form.value.validate()
  const phone =new FormData()
  phone.append('phone', formModel.value.phone)
  const res = await request.post('/sendVerifycode/',phone)
  if (res.code === 0) {
    ElMessage.success('验证码发送成功，请注意查收')
  }

  // 处理请求成功的响应
  if (countDown.value > 0) {
    return;
  }
  // 开始倒计时
  countDown.value = 60;
  timer = setInterval(() => {
    countDown.value--;
    if (countDown.value === 0) {
      clearInterval(timer);
    }
  }, 1000);

}
const register = async () => {
  // 注册成功之前，先进行校验，校验成功 → 请求，校验失败 → 自动提示
  await form.value.validate()
  const time = ref(new Date())
  await request.post('/register/', {
    'phone': formModel.value.phone,
    'password': formModel.value.password,
    'code': formModel.value.captcha,
    'time': time.value
  })
  ElMessage.success('注册成功')
  isRegister.value = false
}
const userStore = useUserStore()
const login = async () => {
  await form.value.validate()
  const res = await request.post('/login/', {'phone': formModel.value.phone, 'password': formModel.value.password})
  if (res.code === 0 ) {
    userStore.setToken(res)
    ElMessage.success('登录成功')
    router.push({ name: 'layout' })
  }
  else {
    router.push({ name: 'login' })
  }
}

// 切换的时候，重置表单内容
watch(isRegister, () => {
  formModel.value = {
    phone: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <!-- 在页面顶部添加一个固定定位的容器 -->
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册相关表单 -->
      <el-form
          :model="formModel"
          :rules="rules1"
          ref="form"
          size="large"
          autocomplete="off"
          v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
              v-model="formModel.phone"
              :prefix-icon="User"
              placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="formModel.password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
              v-model="formModel.repassword"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha" >
          <el-input
              v-model="formModel.captcha"
              placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
        <el-form-item style="display: flex; justify-content: space-between;">
          <el-button
              :disabled="countDown > 0"
              @click="getCaptcha"
              class="button"
              type="primary"
              style="width: 48%;"
          >
            {{ countDown > 0 ? `${countDown}s 后重新获取` : '获取验证码' }}
          </el-button>
          <el-button
              @click="register"
              class="button"
              type="primary"
              style="width: 48%;"
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录相关表单 -->
      <el-form
          :model="formModel"
          :rules="rules1"
          ref="form"
          size="large"
          autocomplete="off"
          v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
              v-model="formModel.phone"
              :prefix-icon="User"
              placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="formModel.password"
              name="password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
              @click="login"
              class="button"
              type="primary"
              auto-insert-space
          >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>

.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
        url('@/assets/register.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
