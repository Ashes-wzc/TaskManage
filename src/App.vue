<template>
  <el-config-provider :locale="locale">
    <Demup msg="EvilGenius"/>
  </el-config-provider>
</template>

<script>
import Demup from './components/Demup.vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default {
  name: 'App',
  components: {
    Demup,
    [ElConfigProvider.name]: ElConfigProvider,
  },
  data() {
    return {
      locale: zhCn,
    }
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
