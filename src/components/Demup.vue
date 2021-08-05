<template>
  <el-container>
    <el-aside>
      <DemupSider />
    </el-aside>
    <el-container>
      <el-header>
        <DemupHeader />
      </el-header>
      <el-main>
        <DemupApp />
      </el-main>
      <el-footer>
        <DemupFooter />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
  import DemupSider from './DemupSider.vue'
  import DemupHeader from './DemupHeader.vue'
  import DemupApp from './DemupApp.vue'
  import DemupFooter from './DemupFooter.vue'
  export default {
    name: 'Demup',
    components: {
      DemupSider,
      DemupHeader,
      DemupApp,
      DemupFooter
    },
    props: {
      msg: String
    }
  }
</script>

<style>
  
</style>