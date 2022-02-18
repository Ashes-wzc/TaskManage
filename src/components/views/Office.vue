<template>
  <el-container style="height: 100vh">
    <el-aside style="width: 150px">
      <div class="container">
        <el-row align="middle" justify="center" style="height:60px;background-color: #f7f7f7;border-right: 1px solid #e6e6e6;">
          <div class="logo">DEMUP</div>
        </el-row>
        <el-menu :default-active="$route.path" class="el-menu-vertical" @select="handleSelect" router>
          <el-menu-item index="/projects/process">
            <template #title>项目管理</template>
          </el-menu-item>
          <el-menu-item index="/userinfo">
            <template #title>个人信息</template>
          </el-menu-item>
          <el-menu-item index="/usermanage">
            <template #title>用户管理</template>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-main style="padding:0;">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
	export default {
    name: 'DemupApp',
    props: {
      msg: String
    },
    components: {
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
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