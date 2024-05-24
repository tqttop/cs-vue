<script setup>
import { ref, defineProps } from 'vue'
const props = defineProps({
  commentData: {
    type: Object,
    required: true
  }
})
const loading = ref(true)
if (props.commentData) {
  loading.value = false
}
</script>
<template>
  <div v-for="(data, index) in props.commentData" :key="index"  v-loading="loading">
    <div class="comment-container">
      <div class="avatar-container">
        <el-avatar :src="data.img" style="width: 40px; height: 40px;" />
      </div>
      <div class="comment-details">
        <div class="comment-header">
          <span class="comment-author">{{ data.user }}</span>
          <span class="comment-time">{{ data.time }}</span>
        </div>
        <div class="comment-content">
          <p>{{ data.content }}</p>
        </div>
      </div>
    </div>
    <el-divider style="margin-top: 10px" />
  </div>
</template>

<style scoped>
.comment-container {
  display: flex;
  align-items: flex-start;
}

.avatar-container {
  margin-right: 10px;
}

.comment-details {
  flex-grow: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.comment-author {
  font-size: 13px;
}

.comment-time {
  font-size: 12px;
  color: #999;
}

.comment-content p {
  font-size: 14px;
  margin: 0; /* Reset default margin for paragraphs */
}
</style>