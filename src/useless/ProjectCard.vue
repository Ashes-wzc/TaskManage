<template>
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>{{ projectName }}</span>
        <el-button class="button" type="text" @click="JumpToUrl">进入项目</el-button>
      </div>
    </template>
    <div>{{ projectName }}</div>
  </el-card>
</template>

<script>
  export default {
    name: "ProjectCard",
    props: {
      ProjectName: String,
      url: String
    },
    data() {
      return {
        projectName: this.$props.ProjectName
      }
    },
    methods: {
      JumpToUrl(url) {
        url = this.url
        // console.log(url)
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
