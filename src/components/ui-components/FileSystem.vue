<template>
  <div class="file-container">
    <div class="file-domain">
      <el-row justify="center">
        <el-col :span="22">
          <div class="file-header">
            文件库
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FileSystem",
    props: {
      msg: String,
    }
  }
</script>

<style>
  .file-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .file-domain {
    width: 1000px;
    height: 300px;
    margin-top: 20px;
    background-color: white;
  }
  .file-header {
    border-bottom: 1px solid #f1f1f1;
  }
</style>