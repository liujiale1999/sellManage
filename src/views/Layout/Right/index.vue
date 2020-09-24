<template>
  <div class="right">
    <!-- 头部 -->
    <Header />

    <!-- 下边内容部分 -->
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
//引入头部组件
import Header from "./Header.vue";

export default {
  //注册组件
  components: {
    Header,
  },
};
</script>

<style lang="less" scoped>
.right {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  .main {
    background: #f0f2f5;
    padding: 20px;
    height: 100%;
    overflow-y: scroll;
  }
}
</style>