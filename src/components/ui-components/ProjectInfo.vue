<template>
  <div class="projectinfo-container">
    <div class="projectinfo-leftview">
      <div class="project-state project-left-card">
        <div class="card-header">
          <div class="card-header-title">项目状态</div>
          <el-button icon="el-icon-alarm-clock" circle plain class="card-header-btn" size="mini"></el-button>
        </div>
        <div class="status-input">
          <div class="status-input-card">
            <el-select v-model="value" placeholder="请选择" size="mini">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-input type="textarea" autosize placeholder="请输入项目状态变更理由" v-model="textarea1" maxlength="200"></el-input>
            <div class="set-btn-position">
              <el-button type="primary" size="small">发布</el-button>
            </div>
          </div>
        </div>
        <div class="last-status"></div>
        <div class="more-status">
          <a>查看历史状态</a>
        </div>
      </div>
      <div class="project-detailinfo project-left-card">
        <div class="card-header">
          <div class="card-header-title">项目信息</div>
          <el-button icon="el-icon-circle-plus-outline" circle plain class="card-header-btn" size="mini"></el-button>
        </div>
        <div class="detailinfo-list">
          <div class="detailinfo-list-unit">
            <div class="detailinfo-title">
              <i class="el-icon-user"></i>
              <p>项目经理</p>
            </div>
            <div class="detailinfo-addinfo">
              待添加
            </div>
          </div>
        </div>
        <div class="detailinfo-list">
          <div class="detailinfo-list-unit">
            <div class="detailinfo-title">
              <i class="el-icon-view"></i>
              <p>项目目标</p>
            </div>
            <div class="detailinfo-addinfo">
              待添加
            </div>
          </div>
        </div>
        <div class="detailinfo-list">
          <div class="detailinfo-list-unit">
            <div class="detailinfo-title">
              <i class="el-icon-document"></i>
              <p>项目立项书</p>
            </div>
            <div class="detailinfo-addinfo">
              待添加
            </div>
          </div>
        </div>
      </div>
      <div class="project-dynamic project-left-card">
        <div class="card-header">
          <div class="card-header-title">项目动态</div>
          <el-button icon="el-icon-set-up" circle plain class="card-header-btn" size="mini"></el-button>
        </div>
      </div>
    </div>
    <div class="projectinfo-rightview">
      <section class="projectinfo-rightview-card">
        <div class="projectinfo-title">
          <el-image style="width:60px; height:60px; margin-right:16px" :src="require('./../../assets/123.jpg')" :fit="cover"></el-image>
          <div class="projectinfo-title-text">
            <H3>B8L</H3>
            <p>Asheswzc于 2021年8月11日 创建</p>
          </div>
        </div>
        <div class="project-circle">
          <div class="project-title">项目周期</div>
          <el-date-picker style="width:300px" v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </div>
        <div class="project-statistic">
          <div class="project-title">项目统计</div>
          <div class="task-schedule">
            <div class="task-schedule-unit">
              <p>已完成</p>
              <el-progress :percentage="80" class="progresser" status="success"></el-progress>
            </div>
            <div class="task-schedule-unit">
              <p>未完成</p>
              <el-progress :percentage="50" class="progresser" status="warning"></el-progress>
            </div>
            <div class="task-schedule-unit">
              <p>已逾期</p>
              <el-progress :percentage="50" class="progresser" status="exception"></el-progress>
            </div>
            <div class="task-schedule-unit">
              <p>待认领</p>
              <el-progress :percentage="24" class="progresser" :color="'purple'"></el-progress>
            </div>
            <div class="task-schedule-unit">
              <p>今日到期</p>
              <el-progress :percentage="35" class="progresser"></el-progress>
            </div>
            <div class="task-schedule-unit">
              <p>逾期完成</p>
              <el-progress :percentage="11" class="progresser"></el-progress>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProjectInfo",
    props: {
      msg: String,
    },
    data() {
      return{
        options: [{
          value: '1',
          label: '进度正常'
        },{
          value: '2',
          label: '存在风险'
        },{
          value: '3',
          label: '进度失控'
        }],
        value: '',
        textarea1: ''
      }
    }
  }
</script>

<style>
  .projectinfo-container {
    display: flex;
    flex-direction: row;
    width: 1000px;
    margin: 0 auto;
    margin-top: 20px;
  }
  .projectinfo-leftview {
    width: 628px;
  }
  .project-left-card {
    width: 100%;
    background-color: #ffffff;
    border-radius: 4px;
    flex: 1 auto;
    box-shadow: 0 2px 3px rgb(0 0 0 / 5%);
    margin-bottom: 10px;
  }
  .project-state {

  }
  .card-header {
    padding: 16px 18px 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card-header-title {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
  .card-header-btn {

  }
  .status-input {
    padding: 0px 18px 16px 20px;
  }
  .status-input-card {
    border-radius: 4px;
    border: 1px solid #e3e3e3;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .status-input-card .el-select{
    width: 200px;
    margin: 15px;
  }
  .status-input-card .el-textarea .el-textarea__inner {
    border: 0;
    resize: none;
  }
  .set-btn-position {
    display: flex;
    justify-content: flex-end;
    margin: 15px;
  }
  .more-status {
    line-height: 44px;
    font-size: 12px;
    color: #8c8c8c;
    /* padding-bottom: 10px; */
  }
  .more-status a {
    cursor: pointer;
  }
  .project-detailinfo {

  }
  .detailinfo-list {
    display: flex;
    padding: 0 20px;
  }
  .detailinfo-list-unit {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .detailinfo-title {
    width: 160px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 20px;
  }
  .detailinfo-title p {
    margin-left: 5px;
    color: #8c8c8c;
    font-size: 14px;
  }
  .detailinfo-addinfo {
    color: #8c8c8c;
    font-size: 14px;
  }
  .projectinfo-rightview {
    width: 352px;
    margin-left: 20px;
  }
  .projectinfo-rightview-card {
    display: flex;
    flex-direction: column;
    flex: 1 auto;
    background-color: white;
    box-shadow: 0 2px 3px rgb(0 0 0 / 5%);
  }
  .projectinfo-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
  }
  .projectinfo-title-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .projectinfo-title-text H3 {
    font-size: 16px;
    line-height: 24px;
    margin: 0 0 4px;
    word-break: break-all;
    font-weight: 400;
  }
  .projectinfo-title-text p {
    color: #8c8c8c;
    line-height: 20px;
    word-break: break-all;
    margin: 0;
    font-size: 14px;
  }
  .project-circle {
    padding: 0 20px 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .project-title {
    height: 40px;
    font-size: 14px;
    font-weight: 500;
    color: #595959;
    display: flex;
    align-items: center;
  }
  .project-statistic {
    padding: 0 20px 20px 20px;
  }
  .task-schedule-unit {
    display: flex;
    flex-direction: row;
    margin-top: 5px;
  }
  .task-schedule-unit p {
    width: 60px;
    color: #8c8c8c;
    font-size: 12px;
    white-space: nowrap;
    margin: 0;
  }
  .progresser {
    flex: 1;
    margin-left: 10px;
  }
</style>