<template>
  <el-container style="height: 100vh">
    <el-aside style="width: 200px">
      <DemupSider />
    </el-aside>
    <el-container>
      <!-- <el-header style="padding: 0px">
        <DemupHeader />
      </el-header> -->
      <el-main>
        <DemupApp />
      </el-main>
      <!-- <el-footer>
        <DemupFooter />
      </el-footer> -->
    </el-container>
  </el-container>
</template>

<script>
  import DemupSider from './layout/DemupSider.vue'
  // import DemupHeader from './layout/DemupHeader.vue'
  import DemupApp from './layout/DemupApp.vue'
  // import DemupFooter from './layout/DemupFooter.vue'
  export default {
    name: 'Demup',
    components: {
      DemupSider,
      // DemupHeader,
      DemupApp,
      // DemupFooter
    },
    props: {
      msg: String
    }
  }
</script>

<style>
</style>