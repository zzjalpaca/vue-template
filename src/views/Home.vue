
<template>
  <div>
    <el-button type="info">信息按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <span class="svg-container">
      <svg-icon icon-class="phone" />
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-container {
    padding: 6px 5px 6px 15px;
    color: red;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
</style>
