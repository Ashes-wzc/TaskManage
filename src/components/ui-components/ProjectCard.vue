<template>
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>卡片名称</span>
        <el-button class="button" type="text" @click="JumpToUrl">操作按钮</el-button>
      </div>
    </template>
    <div>智能灯项目</div>
  </el-card>
</template>

<script>
  export default {
    name: "ProjectCard",
    props: {
      url: String
    },
    data() {
      return {
        msg: ''
      }
    },
    methods: {
      JumpToUrl(url) {
        url = this.url
        console.log(url)
        this.$router.push(url)
      }
    }
  }
</script>

<style>
  .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
    
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 200px;
  }
</style>
