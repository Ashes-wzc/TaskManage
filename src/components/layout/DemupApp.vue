<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "DemupApp",
  props: {
    msg: String,
  },
  components: { }
}
</script>

<style>
  .el-main {
    padding: 0;
  }
</style>