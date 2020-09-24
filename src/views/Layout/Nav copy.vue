<template>
  <div class="nav">
    <div class="title">
      <span class="dianpuIcon iconfont icon-shangjiatuijian"></span>
      <p class="text">外卖商家中心</p>
    </div>
    <!-- 导航 -->
    <el-menu
      :default-active="curActive"
      unique-opened
      background-color="#304156"
      text-color="#fff"
      router
    >
      <!-- 后台首页 -->
      <el-menu-item index="/home">
        <i class="iconfont icon-houtai1"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>

      <!-- 订单管理 -->
      <el-menu-item index="/order">
        <i class="iconfont icon-dingdanguanli"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>

      <!-- 商品管理 -->
      <el-submenu index="/goods">
        <template slot="title">
          <i class="iconfont icon-shangpin"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="/goods/goods-add">商品添加</el-menu-item>
        <el-menu-item index="/goods/goods-cate">商品分类</el-menu-item>
        <el-menu-item index="/goods/goods-list">商品列表</el-menu-item>
      </el-submenu>

      <!-- 店铺管理 -->
      <el-menu-item index="/shop">
        <i class="iconfont icon-dianpu"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>

      <!-- 账号管理 -->
      <el-submenu index="/account">
        <template slot="title">
          <i class="iconfont icon-zhanghao"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item index="/account/account-add">账号添加</el-menu-item>
        <el-menu-item index="/account/account-list">账号列表</el-menu-item>
        <el-menu-item index="/account/pass-modify">密码修改</el-menu-item>
        <el-menu-item index="/account/personal">个人中心</el-menu-item>
      </el-submenu>

      <!-- 销售统计 -->
      <el-submenu index="/total">
        <template slot="title">
          <i class="iconfont icon-xiaoshoutongji"></i>
          <span>销售统计</span>
        </template>
        <el-menu-item index="/total/goods-total">商品统计</el-menu-item>
        <el-menu-item index="/total/order-total">订单统计</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import local from "@/utils/local";
export default {
  computed: {
    curActive() {
      return this.$route.path;
    },
  },
  data() {
    return {
      menus: [],
    };
  },
  created() {
    this.menus = local.get("menus");
  },
};
</script>

<style lang="less" scoped>
.nav {
  height: 100%;
  background: #304156;
  flex: 0 0 200px;
  color: #fff;
  .el-menu {
    border-right: 0;
    .iconfont {
      color: #fff;
      margin-right: 8px;
    }
    .el-menu-item.is-active {
      color: #409eff;
      background: #202f3f !important;
    }
  }
  .title {
    height: 60px;
    line-height: 60px;
    display: flex;
    .dianpuIcon {
      font-size: 24px;
      color: coral;
      margin-left: 20px;
    }
    .text {
      font-size: 16px;
      margin-left: 5px;
    }
  }
}
</style>