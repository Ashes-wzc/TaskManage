<template>
  <el-tabs type="card" @tab-click="tabSwitch" style="width:100%" :stretch=true>
    <el-tab-pane label="任务修改">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="任务名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="任务编号">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="起止时间">
            <el-date-picker
              style="width:100%"
              v-model="dateValue"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="任务描述">
            <el-input v-model="form.desc" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="项目完成">
            <el-switch v-model="isTaskEnd" inline-prompt active-text="是" inactive-text="否"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="cancelSubmit">取消</el-button>
          </el-form-item>
        </el-form>
    </el-tab-pane>
    <el-tab-pane label="任务历史">
      任务历史
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  name: "TaskModifyDrawer",
  props: {
    drawerVisible: Boolean,
  },
  data() {
    return {
      form: {
        name: '',
        id: '',
        desc: '',
      },
      dateValue: '',
      isTaskEnd: ''
    }
  },
  methods: {
    tabSwitch(tab, event) {
      console.log(tab, event)
    },
    onSubmit() {
      ElMessageBox.confirm(
          '确认提交？',
          '请确认!',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
        .then(() => {
          this.$emit("changeDrawerVisible", false)
          ElMessage({
            type: 'success',
            message: '修改提交成功!'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消修改。'
          })
        })
    },
    cancelSubmit() {
      this.$emit("changeDrawerVisible", false)
    }
  }
}
</script>

<style>
</style>