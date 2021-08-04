<template>
  <a-layout id="demup-layout" style="min-height: 100vh">
    <!-- 侧边栏 -->
    <a-layout-sider>
      <DemupSider />
    </a-layout-sider>
    <!-- 主体内容 -->
    <a-layout>
      <!-- 主体头部 -->
      <a-layout-header>
        <DemupHeader />
      </a-layout-header>
      <!-- 主题中部 -->
      <a-layout-content>
        <DemupApp />
      </a-layout-content>
      <!-- 主体底部 -->
      <a-layout-footer>
        <DemupFooter />
      </a-layout-footer>
    </a-layout>
  </a-layout>
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