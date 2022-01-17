<template>
  <el-dialog v-model="dialogVisible" title="文件管理" width="80%">
    <el-table :data="fileList" style="width: 100%">
      <el-table-column prop="name_File" label="文件名" align="center"></el-table-column>
      <el-table-column prop="uploaders[0].name" label="上传者" align="center"></el-table-column>
      <el-table-column prop="uploadDate" label="上传时间" align="center"></el-table-column>
      <el-table-column #default="scope" label="操作" align="center">
        <el-button size="mini" type="primary" @click="downloadFile(scope.row)">下载</el-button>
        <el-button size="mini" type="danger" @click="deleteFile(scope.row)">删除</el-button>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { getDocumentAPI } from '@/utils/api'
export default {
  name: 'FileDialog',
  props: {
    visible: Boolean,
    taskId: new Number
  },
  emits: ['setDialogVisible'],
  setup(props, context) {
    const fileList = ref([])
    const dialogVisible = computed({
      get: () => {
        return props.visible
      },
      set: visible => {
        context.emit('setDialogVisible', visible)
      }
    })
    const downloadFile = (row) => {
      console.log('download', row)
    }
    const deleteFile = (row) => {
      console.log('delete', row)
    }
    watch(dialogVisible, () => {
      if(dialogVisible.value == true) {
        const tid = props.taskId
        getDocumentAPI(tid)
        .then(res => {
          // console.log(res.data)
          fileList.value = res.data
        })
        .catch(err => {
          console.log(err.toString())
        })
      }
    })
    return {
      fileList,
      dialogVisible,
      downloadFile,
      deleteFile
    }
  }
}
</script>
