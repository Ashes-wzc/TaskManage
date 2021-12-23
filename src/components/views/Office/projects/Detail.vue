<template>
  <div class="column_center">
    <div class="task_page_container">
      <div class="task_type_container" v-for="(TaskData, index1) in TaskDatas" :key="index1">
        <div class="task_type_title">
          <span style="font-size: 20px" v-text="TaskData.TypeName"></span>
          <span style="font-size: 16px; color: #595959; margin-left: 12px" v-text="TaskData.TaskList.length"></span>
        </div>
        <el-scrollbar style="flex: 1">
          <div class="task_list">
            <el-timeline>
              <el-timeline-item
                style="text-align: left;"
                v-for="(task, index2) in TaskData.TaskList"
                :key="index2"
                :icon="task.icon"
                :type="task.type"
                :color="task.TaskStatus == true ? '#0bbd87': 'red'"
                :size="task.size"
                :hollow="task.hollow"
                :timestamp="task.TaskDate"
                placement="top"
              >
                <TaskCard :TaskTitle="task.TaskName" :TaskStatus="task.TaskStatus" v-on:listenToChildEvent="changeStatusFromChild(index1, index2, $event)"/>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
  import TaskCard from '../../../ui-components/TaskCard.vue'
  export default {
    name: "Detail",
    props: {
      msg: String,
    },
    components: {
      TaskCard
    },
    data() {
      return {
        TaskDatas: [
          {
            TypeName: '立项',
            TaskList:[
              {
                TaskName: '方案评估',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '产品选型',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '立项',
                TaskDate: '2021-9-9',
                TaskStatus: false
              }
            ]
          },
          {
            TypeName: '标准',
            TaskList:[
              {
                TaskName: '硬件标准',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '软件标准',
                TaskDate: '2021-9-9',
                TaskStatus: true
              }
            ]
          },
          {
            TypeName: '硬件设计',
            TaskList:[
              {
                TaskName: '电路设计',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '结构设计',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '硬件配置',
                TaskDate: '2021-9-9',
                TaskStatus: true
              }
            ]
          },
          {
            TypeName: '软件设计',
            TaskList:[
              {
                TaskName: '软件设计',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '环境配置',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '架构设计',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '线上测试',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '程序打包',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '程序打包',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '程序打包',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '程序打包',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '程序打包',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '程序打包',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '程序打包',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '程序打包',
                TaskDate: '2021-9-9',
                TaskStatus: true
              }
            ]
          },
          {
            TypeName: '样品制造',
            TaskList:[
              {
                TaskName: '样品测试',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '样品制造',
                TaskDate: '2021-9-9',
                TaskStatus: true
              }
            ]
          },
          {
            TypeName: '测试',
            TaskList:[
              {
                TaskName: '硬件测试',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '软件测试',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '其他测试',
                TaskDate: '2021-9-9',
                TaskStatus: true
              }
            ]
          },
          {
            TypeName: '量产',
            TaskList:[
              {
                TaskName: '提交订单',
                TaskDate: '2021-9-9',
                TaskStatus: true
              },
              {
                TaskName: '量产完成',
                TaskDate: '2021-9-9',
                TaskStatus: true
              }
            ]
          }
        ]
      }
    },
    methods: {
      changeStatusFromChild(id1, id2 , event) {
        this.$data.TaskDatas[id1].TaskList[id2].TaskStatus = event
      }
    }
  }
</script>

<style>
  .column_center {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  .task_page_container {
    display: flex;
    width: 90%;
    height: 90%;
    flex-direction: row;
  }
  .task_type_container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .task_type_title {
    height: 30px;
    margin-bottom: 15px;
    text-align: left;
    padding-inline-start: 40px;
  }
  .task_list {
    height: 100%;
  }
</style>