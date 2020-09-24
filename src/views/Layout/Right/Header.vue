<template>
  <div class="header">
    <!-- 左侧面包屑 -->
    <el-row :gutter="20">
      <el-col :xs="12" :md="16" :sm="12">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="item in breadArr"
            :key="item.title"
            :to="{ path: item.path }"
          >{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

      <!-- 右侧头像 -->
      <el-col :xs="12" :md="8" :sm="12" class="header-right">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            欢迎你,
            <span>{{account}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personal">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 头像 -->
        <el-avatar size="large" :src="imgUrl"></el-avatar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入本地存储
import local from "@/utils/local";
//引入ajax函数
import { getInfo } from "@/api/account";

export default {
  data() {
    return {
      account: "",
      imgUrl: "",
      //面包屑的数组
      breadArr: [],
    };
  },
  methods: {
    // 计算面包屑
    calcBreadArr() {
      let arr = [{ path: "/home", title: "首页" }];

      this.$route.matched.forEach((v) => {
        //判断
        if (v.meta && v.meta.title) {
          arr.push({ path: v.path, title: v.meta.title });
        }
      });

      this.breadArr = arr;
    },
    //
    handleCommand(command) {
      if (command === "personal") {
        this.$router.push("/account/personal");
      } else if (command === "logout") {
        this.$message({ type: "success", message: "退出成功" });
        local.clear(); //清空本地数据
        // 跳转到登录
        this.$router.push("/login");

        // 退出登录  刷新页面  解决会无限的往router里边加路由的bug
        window.location.reload();
      }
    },
    // 获取头部数据
    async fetchInfo() {
      let { accountInfo } = await getInfo();

      // 把信息存到本地
      local.set("info", accountInfo);

      this.account = accountInfo.account;
      this.imgUrl = accountInfo.imgUrl;
    },
  },
  created() {
    // 调用计算面包屑的函数
    this.calcBreadArr();
    //获取头部数据
    this.fetchInfo();

    // 接受修改头像的请求
    this.$bus.$on("xiu_gai", () => {
      this.fetchInfo();
    });
  },

  watch: {
    // 监听地址栏的变化
    "$route.path"(newVal, oldVal) {
      this.calcBreadArr();
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .el-row {
    .el-col {
      height: 60px;
      display: flex;
      align-items: center;
    }

    .header-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>