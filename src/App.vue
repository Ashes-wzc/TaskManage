<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default {
  name: 'App',
  components: {
    [ElConfigProvider.name]: ElConfigProvider
  },
  mounted() {
    if (localStorage.getItem('Bearer') != null || sessionStorage.getItem('Bearer') != null) {
      sessionStorage.setItem('Bearer', localStorage.getItem('Bearer'))
      this.$router.push('/projects')
    } else {
      this.$router.push('/login')
    }
  },
  data() {
    return {
      locale: zhCn,
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
  color: #2c3e50;
}
</style>
