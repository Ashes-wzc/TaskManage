<template>
  <el-dialog v-model="dialogVisible" width="30%" title="选择负责人">
    <el-radio-group v-model="radio">
      <el-radio v-for="(user, index) in userList" :key="index" :label="user.id">
        {{ user.username }}-{{ user.name }}
      </el-radio>
    </el-radio-group>
    <template #footer>
      <el-button size="mini" type="primary" @click="leaderInfo">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { getAllUserAPI } from '@/utils/api'
export default {
  name: 'LeaderSelectDialog',
  props: {
    visible: Boolean
  },
  emits: ['setDialogVisible', 'returnUserInfo'],
  setup(props, context) {
    const radio = ref(1)
    const userList = ref([])
    // 判断对话框是否显示,以及emit函数
    const dialogVisible = computed({
      get: () => {
        return props.visible
      },
      set: (visible) => {
        context.emit('setDialogVisible', visible)
      }
    })
    // 获取全部用户信息
    const getAllUser = () => {
      getAllUserAPI()
      .then(res => {
        // console.log(res.data)
        userList.value = res.data
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    const leaderInfo = () => {
      context.emit('returnUserInfo', userList.value[radio.value - 1])
      context.emit('setDialogVisible', false)
    }
    watch(dialogVisible, () => {
      if(dialogVisible.value == true) {
        getAllUser()
      }
    })
    return {
      radio,
      userList,
      dialogVisible,
      getAllUser,
      leaderInfo
    }
  }
}
</script>