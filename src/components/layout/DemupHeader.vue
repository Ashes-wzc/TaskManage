<template>
  <el-menu :default-active="activeIndex" class="header-menu" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">处理中心1</el-menu-item>
    <el-menu-item index="2">处理中心2</el-menu-item>
    <el-menu-item index="3">处理中心3</el-menu-item>
    <el-menu-item index="4">处理中心4</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "DemupHeader",
  props: {
    msg: String,
  },
  data() {
    return{
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  },
}
</script>

<style>
  
</style>