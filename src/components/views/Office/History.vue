<template>
  <el-table :data="historyData" style="width: 100%">
    <el-table-column prop="name" label="人员"></el-table-column>
    <el-table-column prop="userId" label="工号"></el-table-column>
    <el-table-column prop="operationTime" label="操作时间"></el-table-column>
    <el-table-column prop="type" label="操作类型"></el-table-column>
    <el-table-column prop="model" label="操作描述"></el-table-column>
  </el-table>
</template>

<script>
import { computed } from 'vue'
import { taskHistory } from '@/store/store'
export default {
  name: 'History',
  setup() {
    const historyData = computed(() => {
      return taskHistory.list
    })
    return {
      historyData
    }
  }
}
</script>