<template>
  <el-config-provider :locale="locale">
    <Index :hasCookie="this.userHasCookie"/>
  </el-config-provider>
</template>

<script>
import Index from './components/index.vue'

import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default {
  name: 'App',
  components: {
    Index,
    [ElConfigProvider.name]: ElConfigProvider
  },
  data() {
    return {
      locale: zhCn,
      userHasCookie: true,
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
