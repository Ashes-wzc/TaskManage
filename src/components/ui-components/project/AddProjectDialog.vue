<template>
  <el-dialog
    title="title"
    v-model="visible"
    width="50%"
    @close="$emit('update:visible', false)"
  >
    <el-form>
      <el-form-item>
        <el-input v-model="name"></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddProjectDialog',
  props: {
    title: String,
  }
}
</script>

<style>

</style>