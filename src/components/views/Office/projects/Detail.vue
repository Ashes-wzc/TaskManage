<template>
  <div class="column_center">
    <div class="task_page_container">
      <div class="task_type_container" v-for="(scheme, index1) in schemes" :key="index1">
        <div class="task_type_title">
          <span style="font-size: 20px" v-text="scheme.schemeName"></span>
          <span style="font-size: 16px; color: #595959; margin-left: 12px" v-text="scheme.tasks.length"></span>
        </div>
        <el-scrollbar style="flex: 1">
          <div class="task_list">
            <el-timeline>
              <el-timeline-item
                style="text-align: left;"
                v-for="(task, index2) in scheme.tasks"
                :key="index2"
                :icon="task.icon"
                :type="task.type"
                :color="task.isfinished == true ? '#0bbd87': 'red'"
                :size="task.size"
                :hollow="task.hollow"
                :timestamp="task.createDate"
                placement="top"
              >
                <TaskCard 
                  :TaskTitle="task.taskName"
                  :TaskStatus="task.isfinished"
                  v-on:listenToChildEvent="changeStatusFromChild(index1, index2, $event)"
                />
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
  import { getSchemeAPI } from '@/utils/api'
  import TaskCard from '@/components/ui-components/TaskCard.vue'
  export default {
    name: "Detail",
    props: {
      msg: String,
    },
    components: {
      TaskCard
    },
    mounted() {
      this.getScheme()
    },
    data() {
      return {
        schemes: []
      }
    },
    methods: {
      getScheme() {
        getSchemeAPI(1)
        .then((res) => {
          this.schemes = res.data
          console.log(this.schemes)
        })
        .catch((err) => {
          console.log(err.toString())
        })
      },
      changeStatusFromChild(id1, id2 , event) {
        this.$data.schemes[id1].tasks[id2].isfinished = event
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