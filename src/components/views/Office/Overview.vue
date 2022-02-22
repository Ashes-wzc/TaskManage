<template>
  <p>任务名:{{ taskData.taskName }}</p>
  <p>任务ID:{{ taskData.taskId }}</p>
  <p>开始日期:{{ taskData.createDate }}</p>
  <p>目标日期:{{ taskData.targetDate }}</p>
  <p>结束日期:{{ taskData.finishDate}}</p>
  <p>任务描述:{{ taskData.document }}</p>
  <p>负责人姓名:{{ headers.name }}</p>
  <p>负责人职位:{{ headers.userType }}</p>
  <p>是否完成:{{ taskData.isfinished }}</p>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { taskPosition, schemeData } from '@/store/store'
export default {
  name: 'Overview',
  setup() {
    // 从store中获取当前展示任务的数据
    const storeTaskData = computed(() => {
      return schemeData.list
    })
    const storeTaskPos1 = computed(() => {
      return taskPosition.pos1
    })
    const storeTaskPos2 = computed(() => {
      return taskPosition.pos2
    })
    const taskData = ref([])
    const headers = ref([])
    watch([storeTaskData, storeTaskPos1, storeTaskPos2], () => {
      taskData.value = storeTaskData.value[storeTaskPos1.value].tasks[storeTaskPos2.value]
      headers.value = taskData.value.headers[0]
    })
    onMounted(() => {
      console.log('Overview onMounted')
    })
    return {
      storeTaskData,
      storeTaskPos1,
      storeTaskPos2,
      taskData,
      headers
    }
  }
}
</script>