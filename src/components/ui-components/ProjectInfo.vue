<template>
  <div class="eliminate-scoll">
    <el-row justify="center" :gutter="20">
      <el-col :span="6">
        <div class="card">1</div>
      </el-col>
      <el-col :span="6">
        <div class="card ">
          <p>B8L</p>
          <span>万志翀于2021年8月10日创建</span>
          <p>项目周期</p>
          <span>2021.8.10-2021.12.31</span>
          <p>项目统计</p>
          <el-progress type="dashboard" :percentage="80">
            <template #default="{ percentage }">
              <span class="percentage-value">{{ percentage }}%</span>
              <span class="percentage-label">当前进度</span>
            </template>
          </el-progress>
          <el-progress type="dashboard" :percentage="100" status="success">
            <template #default="{ percentage }">
              <span class="percentage-value">{{ percentage }}%</span>
              <span class="percentage-label">已完成</span>
            </template>
          </el-progress>
          <el-progress type="dashboard" :percentage="50" status="warning">
            <template #default="{ percentage }">
              <span class="percentage-value">{{ percentage }}%</span>
              <span class="percentage-label">已逾期</span>
            </template>
          </el-progress>
          <el-progress type="dashboard" :percentage="0" status="exception">
            <template #default="{ percentage }">
              <span class="percentage-value">{{ percentage }}%</span>
              <span class="percentage-label">未完成</span>
            </template>
          </el-progress>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ProjectInfo",
  props: {
    msg: String,
  },
}
</script>

<style>
  .eliminate-scoll {
    box-sizing: border-box;
    width: 100%;
    padding: 0 10px;
  }
  .card {
    width: 100%;
    border: 1px solid black;
    margin-top: 20px;
  }
</style>