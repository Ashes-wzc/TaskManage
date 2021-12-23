<template>
  <div class="file-container">
    <div class="file-domain">
      <el-row justify="center">
        <el-col :span="23">
          <div class="file-header">
            <div class="file-header-title">文件库</div>
            <div class="file-header-button">
              <el-button type="primary" size="small" icon="el-icon-folder-add">创建文件夹</el-button>
              <el-button type="primary" size="small" icon="el-icon-upload">上传</el-button>
            </div>
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
    width: 1100px;
    height: 300px;
    margin-top: 20px;
    background-color: white;
  }
  .file-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
    padding: 18px 20px;
  }
  .file-header-title {
    font-size: 18px;
  }
</style>