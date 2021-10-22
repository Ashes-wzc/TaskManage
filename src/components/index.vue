<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'Index',
    props: {
      hasCookie: Boolean
    },
    mounted() {
      this.isUserLogin()
    },
    methods: {
      isUserLogin() {
        if (this.$props.hasCookie) {
          this.$router.push('/login')
        }
        else{
          this.$router.push('/demup/task')
        }
      }
    }
  }
</script>

<style>
</style>