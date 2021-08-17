<template>
  <!-- <Demup msg="EvilGenius"/> -->
  <router-link to="/">Home</router-link>
  <router-link to="/b8l">B8L</router-link>
  <router-link to="/contact">Contact</router-link>
  <router-view></router-view>
</template>

<script>
// import Demup from './components/Demup.vue'

export default {
  name: 'App',
  components: {
    // Demup
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
