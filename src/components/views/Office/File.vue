<template>
  <div style="display:flex;flex-direction:row">
    <el-upload
      ref="upload"
      action=""
      :multiple=true
      :before-upload="beforeUpload"
      :http-request="uploadHttpRequest"
      :file-list="uploadFileList"
    >
      <el-button size="mini">添加文件</el-button>
    </el-upload>
  </div>
  <el-table :data="documents" style="width: 100%">
    <el-table-column label="文件名">
      <template #default="scope">
        <el-button type="text">
          {{ scope.row.name_File }}
        </el-button>
      </template>
    </el-table-column>
    <el-table-column prop="uploadDate" label="上传时间"/>
    <el-table-column prop="uploaders[0].name" label="上传者"/>
    <el-table-column label="操作">
      <template #default="downloadScope">
        <el-button @click="downloadFile(downloadScope.row)" type="danger" size="mini">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { documentsData, taskPosition, updateDocumentsData } from '@/store/store'
import { uploadDocumentAPI, getDocumentAPI } from '@/utils/api'
export default {
  name: 'File',
  setup() {
    const fileList = ref([]) // 当前任务的全部文件列表
    const uploadFileList = ref([]) // 上传的文件列表
    const documents = computed(() => {
      return documentsData.list
    })
    const fileTaskId = computed(() => {
      return taskPosition.taskId
    })
    const downloadFile = (scope) => {
      console.log(scope)
    }
    // 根据任务id获取任务中的文件
    const getTaskDocuments = (tid) => {
      getDocumentAPI(tid)
      .then(res => {
        updateDocumentsData(res.data)
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    // 文件上传到服务器http请求
    const uploadHttpRequest = (param) => {
      const tid = fileTaskId.value
      console.log(tid)
      let fd = new FormData()
      fd.append("Documents", param.file)
      uploadDocumentAPI(fd, tid)
      .then(res => {
        console.log(res.data)
        getTaskDocuments(tid)
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    // 文件上传前处理
    const beforeUpload = (file) => {
      console.log('beforeUpload', file)
      console.log(fileTaskId)
    }
    onMounted(() => {
      console.log('File onMounted')
    })
    return {
      fileList,
      uploadFileList,
      documents,
      downloadFile,
      uploadHttpRequest,
      beforeUpload
    }
  }
}
</script>