<template>
  <div class="login">
    <div class="login-container">
      <!-- 标题 -->
      <h1 class="title">系统登录</h1>
      <!-- 表单 -->
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-form">
        <!-- 登录 -->
        <el-form-item prop="account">
          <el-input
            type="text"
            prefix-icon="iconfont icon-zhanghao"
            v-model="loginForm.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            @click.native="changeType"
            :type="switchEye? 'text':'password'"
            prefix-icon="iconfont icon-mima"
            :suffix-icon="switchEye ? 'iconfont icon-yanjing-zheng' : 'iconfont icon-yanjing_bi' "
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="loginBtn" type="primary" @click="submitForm()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//引入ajax函数
import { checkLogin } from "@/api/account.js";
// 引入本地存储
import local from "@/utils/local.js";
// 引入创建动态路由的函数
import { createRoutes } from "@/router";

export default {
  data() {
    return {
      // 和表单双向绑定
      loginForm: {
        account: "",
        password: "",
      },
      //   验证规则
      rules: {
        //   账号验证
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        //   密码验证
        password: { required: true, message: "请输入密码", trigger: "blur" },
      },
      //   切换眼睛图标 true:睁眼  false：闭眼
      switchEye: false,
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          let res = await checkLogin(this.loginForm);
          let { code, msg, token, role } = res;
          if (code === 0) {
            local.set("t_k", token);
            local.set("role", role);

            //调用创建路由的函数
            createRoutes();

            this.$router.push("/home");
          } else {
            return;
          }
        }
      });
    },
    // 切换密码框的类型
    changeType(e) {
      // console.log(e.target.className);//icon-yanjing
      // 通过事件源找到类名包含icon-yanjing 的  说明点击的是眼睛图标
      if (e.target.className.includes("icon-yanjing")) {
        // 取反
        this.switchEye = !this.switchEye;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  // background: #2d3a4b;
  background: url("../../assets/img/ys.jpg");
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-container {
    width: 300px;
    .title {
      color: #fff;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }
    .login-form {
      /deep/ .el-form-item {
        //深度选择器
        margin-bottom: 10px;
        .el-form-item__label {
          color: #fff;
        }
        .el-input__inner {
          height: 30px;
          background: rgba(0, 0, 0, 0);
          border: 1px solid #fff;
        }
        .loginBtn {
          width: 100%;
          height: 30px;
          padding: 9px 20px;
        }
        .el-form-item__error {
          padding-top: 0px;
        }
      }
    }
  }
}
</style>