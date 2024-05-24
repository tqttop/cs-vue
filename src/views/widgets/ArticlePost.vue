<script setup>
import { ref } from 'vue';
import EditorHtml from "@/components/EditorHtml.vue";
import request from "@/utils/request";
const formData = ref({});
import {useUserStore} from "@/store/user.js";
const userStore = useUserStore();
const rules = {
  title: [
    { required: true, message: '请输入题目', trigger: 'blur' }
  ]
};
const handleUpdate = (value) => {
  formData.value.content=value;
}

async function handleSubmit() {
    formData.value.author=userStore.id
    const res= await request.post('Article/' , formData.value)
    if (res.code === 0) {
      ElMessage.success('发帖成功');
      formData.value = {};
    }
}

</script>

<template>
<div class="edit-post">
  <el-form :model="formData" :rules=" rules" ref="formDataRef" label-width="100px" class="post-panel">
    <div class="post-editor">
      <el-card >
        <template #header>
          <span>正文</span>
        </template>
        <EditorHtml  @update:modelValue="handleUpdate "></EditorHtml>
      </el-card>
    </div>
    <div class="post-setting">
      <el-card>
        <template #header>
          <span>编辑文章</span>
        </template>
    <el-form-item label="题目" prop="title">
      <el-input v-model="formData.title" placeholder="输入题目" :maxlength="12" clearable show-word-limit />
    </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <el-input v-model="formData.summary" placeholder="输入摘要" clearable type="textarea"
          :rows="5" :maxlength="30" resize="none" show-word-limit />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :style="{width: '100%'}"  @click="handleSubmit()">发帖</el-button>
        </el-form-item>
      </el-card>
    </div>
  </el-form>
</div>
</template>

<style scoped>
.edit-post {
  .post-panel {
    display: flex;
    .el-card-header {
      padding: 10px;
    }
    .post-editor {
      flex: 1;
    }
    .post-setting {
      margin-left: 10px;
      width: 450px;
    }
  }
}
span {
  font-size: 18px;
  font-weight: bold;
}
</style>