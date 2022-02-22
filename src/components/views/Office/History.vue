<template>
  历史
</template>

<script>
import { onMounted } from 'vue'
export default {
  name: 'History',
  setup() {
    onMounted(() => {
      console.log('History onMounted')
    })
  }
}
</script>