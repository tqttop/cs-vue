<script setup>
import request from '@/utils/request'
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import router from "@/router/index.js";
const isRegister = ref(false)
const form = ref()

// 整个的用于提交的form数据对象
const formModel = ref({
  phone: '',
  password: '',
  repassword: '',
  captcha: ''
})
// 整个表单的校验规则
// 1. 非空校验 required: true      message消息提示，  trigger触发校验的时机 blur change
// 2. 长度校验 min:xx, max: xx
// 3. 正则校验 pattern: 正则规则    \S 非空字符
// 4. 自定义校验 => 自己写逻辑校验 (校验函数)
//    validator: (rule, value, callback)
//    (1) rule  当前校验规则相关的信息
//    (2) value 所校验的表单元素目前的表单值
//    (3) callback 无论成功还是失败，都需要 callback 回调
//        - callback() 校验成功
//        - callback(new Error(错误信息)) 校验失败

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
  try {
      const res = await request.post('/sendVerifycode/',phone
    )
    // 处理请求成功的响应
    alert(res.data.message);
  } catch (error) {
    // 处理请求失败的情况
    console.dir(error);
  }

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
  const time =ref(new Date())
  try {
    const res = await request.post('/register/', {'phone': formModel.value.phone, 'password': formModel.value.password, 'code': formModel.value.captcha, 'time': time.value})
    alert(res.data.message);
    isRegister.value = false
  } catch (error) {
    console.dir(error);
  }
}


const login = async () => {
  await form.value.validate()
  try {
    const res = await request.post('/login/', {'phone': formModel.value.phone, 'password': formModel.value.password})
    alert(res.data.message);
    if (res.data.success) {
      router.push({ name: 'home' })
      }
    else {
      router.push({ name: 'login' })
    }
  }catch (error) {
    console.dir(error);
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
  <!--
    1. 结构相关
      el-row表示一行，一行分成24份
       el-col表示列
       (1) :span="12"  代表在一行中，占12份 (50%)
       (2) :span="6"   表示在一行中，占6份  (25%)
       (3) :offset="3" 代表在一行中，左侧margin份数

       el-form 整个表单组件
       el-form-item 表单的一行 （一个表单域）
       el-input 表单元素（输入框）
    2. 校验相关
       (1) el-form => :model="ruleForm"      绑定的整个form的数据对象 { xxx, xxx, xxx }
       (2) el-form => :rules="rules"         绑定的整个rules规则对象  { xxx, xxx, xxx }
       (3) 表单元素 => v-model="ruleForm.xxx" 给表单元素，绑定form的子属性
       (4) el-form-item => prop配置生效的是哪个校验规则 (和rules中的字段要对应)
  -->
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
