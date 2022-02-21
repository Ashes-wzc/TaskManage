<template>
  <el-container style="height: 100vh">
    <el-aside style="width: 150px">
      <div class="container">
        <el-row align="middle" justify="center" style="height:60px;background-color: #f7f7f7;border-right: 1px solid #e6e6e6;">
          <div class="logo">DEMUP</div>
        </el-row>
        <el-menu
          :default-active="$route.path" 
          class="el-menu-vertical" 
          @select="handleSelect" 
          router
        >
          <el-sub-menu index="1">
            <template #title>
              <span>立项</span>
            </template>
            <el-menu-item index="/projects/process">
              <template #title>立项</template>
            </el-menu-item>
            <el-menu-item index="/userinfo">
              <template #title>软件设计</template>
            </el-menu-item>
            <el-menu-item index="/usermanage">
              <template #title>硬件设计</template>
            </el-menu-item>
            <el-menu-item index="/usermanage">
              <template #title>技术资料</template>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span>B8L</span>
            </template>
            <el-menu-item index="/projects/process">
              <template #title>立项</template>
            </el-menu-item>
            <el-menu-item index="/userinfo">
              <template #title>软件设计</template>
            </el-menu-item>
            <el-menu-item index="/usermanage">
              <template #title>硬件设计</template>
            </el-menu-item>
            <el-menu-item index="/usermanage">
              <template #title>技术资料</template>
            </el-menu-item>
          </el-sub-menu>
          <!-- <el-menu-item index="/projects/process">
            <template #title>立项</template>
          </el-menu-item>
          <el-menu-item index="/userinfo">
            <template #title>软件设计</template>
          </el-menu-item>
          <el-menu-item index="/usermanage">
            <template #title>硬件设计</template>
          </el-menu-item> -->
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