<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
const mode = ref('default') // 编辑模式
const editorRef = shallowRef(null) // 编辑器实例
const toolbarConfig = {
  excludeKeys: ["uploadVideo"], // 隐藏部分按钮
}

const valueHtml = ref("请在此处输入内容...")
const editorConfig = { placeholder: '请输入内容...' }
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const emit=defineEmits()
const onChange = (editor) => {
  const htmlContent = editor.getHtml()
  emit('update:modelValue', htmlContent) // 触发 change 事件，传回 html 内容
}
</script>


<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
      />
      <Editor
          style="height: 500px; overflow-y: hidden;"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
          @onChange="onChange"
      />
    </div>
  </template>

<style scoped>

</style>