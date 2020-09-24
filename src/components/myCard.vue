<template>
  <div>
    <!-- 订单统计组件 -->
    <div class="my-card">
      <span :class="icon"></span>
      <p class="text">
        <span class="title">{{title}}</span>
        <span class="num">{{num}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  // 接受订单统计传过来的数据
  props: {
    icon: {
      type: String,
      required: true,
      default: "",
    },
    title: {
      type: String,
      required: true,
      default: "",
    },
    num: {
      type: Number,
      required: true,
      default: "",
    },
  },
};
</script>

<style lang="less" scoped>
.my-card {
  background: #fff;
  display: flex;
  padding: 20px 20px 20px 20px;
  justify-content: space-between;
  min-width: 150px;
  .icon {
    font-size: 60px;
    color: cornflowerblue;
  }
  .text {
    display: flex;
    flex-direction: column;
    text-align: center;
    .title {
      color: #dadada;
      margin-top: 5px;
      margin-bottom: 12px;
    }
    .num {
      color: #333;
      font-weight: bold;
    }
  }
}
</style>