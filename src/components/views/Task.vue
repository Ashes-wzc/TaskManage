<template>
  <div>Task</div>
  <router-link to="/projects/b8l">B8L</router-link>
  <router-link to="/projects/calibration">Calibration</router-link>
</template>

<script>
export default {
  name: "Task",
  props: {
    msg: String,
  },
}
</script>

<style>
</style>