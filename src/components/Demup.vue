<template>
  <el-container style="height: 100vh">
    <el-aside style="width: 150px">
      <DemupSider />
    </el-aside>
    <el-main>
      <DemupApp />
    </el-main>
  </el-container>
</template>

<script>
  import DemupSider from './layout/DemupSider.vue'
  import DemupApp from './layout/DemupApp.vue'
  export default {
    name: 'Demup',
    components: {
      DemupSider,
      DemupApp,
    },
    props: {
      msg: String
    }
  }
</script>

<style>
</style>