<template>
  <el-row align="middle" justify="center" style="height:60px;background-color: #f7f7f7;border-right: 1px solid #e6e6e6;">
    <div class="logo">DEMUP</div>
    <delete style="width: 1em; height: 1em; margin-right: 8px;" />
    <el-svg-icon><aim /></el-svg-icon>
    <!-- <el-svg-icon style="width:20px;height:20px"><expand /></el-svg-icon> -->
  </el-row>
  <el-menu
      default-active="1"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template #title>
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template #title>分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template #title>选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <template #title>导航二</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <template #title>导航三</template>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <template #title>导航四</template>
      </el-menu-item>
    </el-menu>
    <!-- <router-link to="/">任务</router-link>
    <router-link to="/user">我的</router-link>
    <router-link to="/other">其他</router-link> -->
</template>
<script>
	export default {
    name: 'DemupSider',
    props: {
      msg: String
    },
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // }
	}
</script>
<style>
	.logo {
    background: rgba(255, 255, 255, 0.2);
	}
</style>