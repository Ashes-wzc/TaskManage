<template>
  <el-calendar v-model="value" />
</template>

<script>
  export default {
    name: "Task",
    props: {
      msg: String,
    },
    data() {
      return {
        value: new Date()
      }
    }
  }
</script>

<style>
</style>