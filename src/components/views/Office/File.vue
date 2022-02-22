<template>
  文件
  {{ documents }}
</template>

<script>
import { computed, onMounted } from 'vue'
import { documentsData } from '@/store/store'
export default {
  name: 'File',
  setup() {
    const documents = computed(() => {
      return documentsData.list
    })
    onMounted(() => {
      console.log('File onMounted')
    })
    return {
      documents
    }
  }
}
</script>