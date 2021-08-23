<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="num" label="序号" width="180"></el-table-column>
    <el-table-column prop="name" label="名称" width="180"></el-table-column>
    <el-table-column prop="detail" label="详细"></el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "Standard",
    props: {
      msg: String,
    },
    data() {
      return {
        tableData: [
          {
            num: "1",
            name: "电压",
            detail: "小于1V",
          },
          {
            num: "2",
            name: "电流",
            detail: "小于1A",
          },
          {
            num: "3",
            name: "时延",
            detail: "低于0.1S",
          },
          {
            num: "4",
            name: "温度",
            detail: "-40-80度",
          },
        ],
      };
    },
  }
</script>

<style>
</style>