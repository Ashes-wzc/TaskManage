<template>
  <div class="logo"></div>
  <a-menu theme="dark" mode="inline">
    <a-sub-menu title="项目">
      <a-menu-item>项目1</a-menu-item>
      <a-menu-item>项目2</a-menu-item>
      <a-menu-item>项目3</a-menu-item>
    </a-sub-menu>
    <a-menu-item>待办</a-menu-item>
    <a-menu-item>日历 mingtiangongzuo</a-menu-item>
  </a-menu>
</template>
<script>
	export default {
    name: 'DemupSider',
    props: {
      msg: String
    }
	}
</script>
<style>
	.logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
	}
</style>