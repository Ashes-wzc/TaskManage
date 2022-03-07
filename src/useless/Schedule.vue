<template>
  <!-- <p>{{ data.isSelected ? 'yes' : 'no' }}</p> -->
  <el-calendar>
    <template #dateCell="{data}">
      <p style="margin:0px">{{ data.day.split('-').slice(1).join('-') }}</p>
        <template v-for="(scheme, index1) in currentProjectData" :key="index1">
          <template v-for="(task, index2) in scheme.tasks" :key="index2">
            <el-tooltip
              v-if="this.isTaskExist(data.day, task.createDate, task.targetDate)"
              effect="dark"
              placement="top"
            >
              <template #content>{{ task.taskName }}</template>
              <!-- <div
                class="task-bar" 
                :style="{
                  backgroundColor:this.priorityColor(project.priority),
                  opacity:this.preventMisposition(data.day, project.endDate, project.addDay)
                }"
              ></div> -->
              <div
                class="task-bar" 
                :style="{
                  backgroundColor:this.priorityColor(task.taskId),
                }"
              ></div>
            </el-tooltip>
          </template>
        </template>
    </template>
  </el-calendar>
</template>

<script>
  import { ref, computed, onMounted } from 'vue'
  import { getSchemeAPI } from '@/utils/api'
  import { currentProjectInfo } from '@/store/store'
  export default {
    name: "Schedule",
    setup() {
      // 当前展示项目的id
      const showingProjectId = computed(() => {
        return currentProjectInfo.id
      })
      // 当前展示的项目的数据
      const currentProjectData = ref([])
      // 获取当前展示项目的数据
      const getSchemeData = () => {
        getSchemeAPI(showingProjectId.value)
        .then((res) => {
          console.log('schedule', res.data.length, res.data)
          currentProjectData.value = res.data
        })
        .catch((err) => {
          console.log(err.toString())
        })
      }
      onMounted(getSchemeData)
      return {
        currentProjectData
      }
    },
    methods: {
      // 判断进度条的显示范围
      isTaskExist(date, createDate, targetDate) {
        const tempDate = new Date(date.replace(/-/g,"/")).toLocaleDateString()
        const startDate = new Date(createDate).toLocaleDateString()
        const endDate = new Date(targetDate).toLocaleDateString()
        if (startDate <= tempDate & tempDate <= endDate) {
          return true
        }
        else {
          return false
        }
      },
      // 不同优先级的背景颜色
      priorityColor(priority) {
        const colorId = parseInt(priority)%7
        switch (colorId) {
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
      // 防止进度条错位
      preventMisposition(date, start, end) {
        if (start < date & date <= end) {
          return '0.0'
        }
        else {
          return '1.0'
        }
      },
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