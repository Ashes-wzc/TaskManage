<template>
  <el-container v-if="this.$props.hasCookie">
    <Login />
  </el-container>
  <el-container style="height: 100vh" v-else>
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
  import Login from './views/Login.vue'
  export default {
    name: 'Demup',
    components: {
      DemupSider,
      DemupApp,
      Login
    },
    props: {
      hasCookie: Boolean
    }
  }
</script>

<style>
</style>