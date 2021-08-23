<template>
    <div class="container">
      <el-row align="middle" justify="center" style="height:60px;background-color: #f7f7f7;border-right: 1px solid #e6e6e6;">
        <div class="logo">DEMUP</div>
      </el-row>
      <el-menu :default-active="$route.path" class="el-menu-vertical" @select="handleSelect" router>
          <el-menu-item index="/">
            <i class="el-icon-document"></i>
            <template #title>任务</template>
          </el-menu-item>
          <el-menu-item index="/user">
            <i class="el-icon-user"></i>
            <template #title>我的</template>
          </el-menu-item>
          <el-menu-item index="/other">
            <i class="el-icon-loading"></i>
            <template #title>其他</template>
          </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
  // import { Aim } from '@element-plus/icons'
	export default {
    name: 'DemupSider',
    props: {
      msg: String
    },
    components: {
      // Aim,
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
	}
</script>
<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .el-menu-vertical {
    flex: 1;
  }
</style>