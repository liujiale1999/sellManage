<template>
  <div class="nav">
    <div class="title">
      <span class="dianpuIcon iconfont icon-shangjiatuijian"></span>
      <p class="text">外卖商家中心</p>
    </div>
    <!-- 导航 -->
    <el-menu
      :default-active="curActive"
      background-color="#001529"
      text-color="#B3B9BF"
      unique-opened
      router
    >
      <template v-for="menu in menus">
        <!-- 没有儿子的 -->
        <el-menu-item
          v-if="menu.children && menu.children.length === 1 || menu.path === '/order'"
          :index="menu.path"
          :key="menu.path"
        >
          <i class="iconfont" :class="menu.meta.icon"></i>
          <span slot="title">{{ menu.meta.title }}</span>
        </el-menu-item>

        <!-- 有儿子的 -->
        <el-submenu v-else :index="menu.path" :key="menu.path">
          <template slot="title">
            <i class="iconfont" :class="menu.meta.icon"></i>
            <span>{{ menu.meta.title }}</span>
          </template>

          <el-menu-item
            v-for="item in menu.children"
            :key="item.path"
            :index="item.path"
          >{{ item.meta.title }}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import local from "@/utils/local";
export default {
  computed: {
    curActive() {
      if (this.$route.path === "/home") return "/";
      if (
        this.$route.path === "/order/order-list" ||
        this.$route.path === "/order/order-edit"
      )
        return "/order";
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
  /deep/.el-menu {
    border-right: 0;
    // background: #304156 !important;
    .iconfont {
      color: #fff;
      margin-right: 8px;
    }
    .el-menu-item {
      background: #304156 !important;
      &:hover {
        background-color: #202f3f !important;
        color: #fff !important;
      }
    }
    .el-submenu {
      .el-submenu__title {
        background: #304156 !important;
        .iconfont {
          margin-right: 8px;
        }
      }
      /deep/.el-menu {
        .el-menu-item {
          background-color: #304156 !important;
          &:hover {
            background-color: #202f3f !important;
            color: #fff !important;
          }
        }
        .el-menu-item.is-active {
          background: #202f3f !important;
          color: #409eff;
        }
      }
    }
    // .el-menu--inline {
    //   .el-menu-item {
    //     background: #202f3f !important;
    //   }
    // }
    // /deep/.el-submenu__title {
    //   background: #304156 !important;
    // }
    // .el-menu-item.is-active {
    //   background: #202f3f !important;
    //   color: #409eff;
    // }
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