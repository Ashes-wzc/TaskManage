<template>
  Schedule
  <!-- <p>{{ data.isSelected ? 'yes' : 'no' }}</p> -->
  <!-- <el-calendar>
    <template #dateCell="{data}">
      <p style="margin:0px">{{ data.day.split('-').slice(1).join('-') }}</p>
      <template v-for="(project, index) in projects" :key="index">
        <el-tooltip
          v-if="this.isTaskExist(data.day, project.startDate, project.addDay)"
          effect="dark"
          placement="top"
        >
          <template #content>{{ project.name }}</template>
          <div 
            class="task-bar" 
            :style="{
              backgroundColor:this.priorityColor(project.priority),
              opacity:this.preventMisposition(data.day, project.endDate, project.addDay)
            }"
          ></div>
        </el-tooltip>
      </template>
    </template>
  </el-calendar> -->
</template>

<script>
  // let projectrawList = require('./../fakedata/projectInfo.json')
  // let projectList = projectrawList.projects
  // for (let i = 0; i < projectList.length; i++) {
  //   let originEndDate = projectList[i].endDate
  //   let dayCount
  //   switch (new Date(originEndDate).getDay()) {
  //     case 0:
  //       dayCount = 0
  //       break;
  //     case 1:
  //       dayCount = 6
  //       break;
  //     case 2:
  //       dayCount = 5
  //       break;
  //     case 3:
  //       dayCount = 4
  //       break;
  //     case 4:
  //       dayCount = 3
  //       break;
  //     case 5:
  //       dayCount = 2
  //       break;
  //     case 6:
  //       dayCount = 1
  //       break;
  //     default:
  //       break;
  //   }
  //   let tempDate = new Date(originEndDate.replace(/-/g,"/"))
  //   let resultDate = new Date((tempDate/1000+(86400*dayCount))*1000)
  //   let resultDateStr = resultDate.getFullYear()+"-"+(resultDate.getMonth()+1)+"-"+(resultDate.getDate())
  //   projectList[i].addDay = resultDateStr
  // }
  export default {
    name: "Schedule",
    props: {
      msg: String,
    },
    data() {
      return {
        // projects: projectList
      }
    },
    methods: {
      // 判断进度条的显示范围
      isTaskExist(date, startDate, endDate) {
        if (startDate <= date & date <= endDate) {
          return true
        }
        else {
          return false
        }
      },
      // 不同优先级的背景颜色
      priorityColor(priority) {
        switch (priority) {
          case 1:
            return '#1989FA'
          case 2:
            return '#98F5FF'
          case 3:
            return '#FFFACD'
          case 4:
            return '#00FF7F'
          case 5:
            return '#00BFFF'
          case 6:
            return '#FF8C00'
          case 7:
            return '#A020F0'
          default:
            return '#B5B5B5';
        }
      },
      preventMisposition(date, start, end) {
        if (start < date & date <= end) {
          return '0.0'
        }
        else {
          return '1.0'
        }
      }
    }
  }
</script>

<style>
  .is-selected {
    color: #1989FA;
  }
  .task-bar {
    width: 100%;
    height: 5px;
    margin-bottom: 5px;
  }
  .el-calendar-table .el-calendar-day {
    padding: 0;
  }
</style>