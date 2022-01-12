<template>
  <el-dialog v-model="dialogVisible" title="文件管理" width="80%">
    file system dialog
  </el-dialog>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'FileDialog',
  props: {
    visible: Boolean
  },
  emits: ['setDialogVisible'],
  setup(props, context) {
    const dialogVisible = computed({
      get: () => {
        return props.visible
      },
      set: visible => {
        context.emit('setDialogVisible', visible)
      }
    })
    return {
      dialogVisible
    }
  }
}
</script>

<style>

</style>