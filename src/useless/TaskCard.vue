<template>
  <div class="task_card_container">
    <el-checkbox v-model=Status class="task_check_btn" @change="renewStatus(Status)"></el-checkbox>
    <div class="task_detail">
      <div>{{ TaskName }}</div>
      <!-- <div>{{ createDate }}</div>
      <div>{{ targetDate }}</div> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: "TaskCard",
    props: {
      TaskTitle: String,
      TaskStatus: Boolean,
      // createDate: String,
      // targetDate: String
    },
    data() {
      return {
        TaskName: this.$props.TaskTitle,
        Status: this.$props.TaskStatus,
        // createDate: this.$props.createDate,
        // targetDate: this.$props.targetDate
      }
    },
    methods: {
      renewStatus(status) {
        this.$emit("listenToChildEvent", status)
      }
    }
  }
</script>

<style>
  .task_card_container {
    display: flex;
    flex-direction: row;
    width: 272px;
    height: 78px;
    background-color: white;
    border-radius: 5px;
    color: black;
  }
  .task_check_btn {
    margin: 12px 8px 12px 12px;
  }
  .task_detail {
    padding: 14px 16px;
  }
</style>
