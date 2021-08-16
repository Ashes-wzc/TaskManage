<template>
  <Demup msg="EvilGenius"/>
  <router-link></router-link>
</template>

<script>
import Demup from './components/Demup.vue'

export default {
  name: 'App',
  components: {
    Demup
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
  /*margin-top: 60px;*/
}
</style>
