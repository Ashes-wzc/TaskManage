<template>
  <el-dialog v-model="dialogVisible" title="文件管理" width="80%">
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
import { getDocumentAPI, uploadDocumentAPI ,downloadDocumentAPI, deleteDocumentAPI } from '@/utils/api'
export default {
  name: 'FileDialog',
  props: {
    visible: Boolean,
    taskId: new Number
  },
  emits: ['setDialogVisible'],
  setup(props, context) {
    const fileList = ref([]) // 当前任务的全部文件列表
    const uploadFileList = ref([]) // 上传的文件列表
    // 判断对话框是否显示,以及emit函数
    const dialogVisible = computed({
      get: () => {
        return props.visible
      },
      set: visible => {
        context.emit('setDialogVisible', visible)
      }
    })
    // 文件上传到服务器http请求
    const uploadHttpRequest = (param) => {
      const tid = props.taskId
      let fd = new FormData()
      fd.append("Documents", param.file)
      uploadDocumentAPI(fd, tid)
      .then(res => {
        console.log(res.data)
        getDocuments(props.taskId)
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    // 文件上传前处理
    const beforeUpload = (file) => {
      console.log('beforeUpload', file)
    }
    // 下载文件
    const downloadFile = (row) => {
      // console.log('download', row)
      downloadDocumentAPI(row.sno)
      .then(res => {
        // console.log('download', res.data)
        let url = window.URL.createObjectURL(new Blob([res.data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', row.name_File)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(link.href)
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    // 删除文件
    const deleteFile = (row) => {
      console.log('删除文件', row)
      const did = row.sno
      deleteDocumentAPI(did)
      .then(res => {
        console.log(res.data)
        getDocuments(props.taskId)
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    // 获取任务中的全部文件
    const getDocuments = (tid) => {
      getDocumentAPI(tid)
      .then(res => {
        // console.log(res.data)
        fileList.value = res.data
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    // 监听dialogVisible,对话框打开时更新文件数据
    watch(dialogVisible, () => {
      if(dialogVisible.value == true) {
        getDocuments(props.taskId)
      }
    })
    return {
      // variable
      fileList,
      uploadFileList,
      dialogVisible,
      // function
      uploadHttpRequest,
      beforeUpload,
      downloadFile,
      deleteFile,
      getDocuments
    }
  }
}
</script>
