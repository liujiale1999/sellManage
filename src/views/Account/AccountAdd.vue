<template>
  <Card>
    <!-- 标题 -->
    <span slot="title">添加账号</span>
    <!-- 内容 -->
    <div slot="content">
      <el-form
        :model="accAddForm"
        label-width="100px"
        :rules="rules"
        ref="accAddForm"
        style="width:318px"
        status-icon
      >
        <!-- 账号 -->
        <el-form-item label="账号" prop="account">
          <el-input v-model="accAddForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="accAddForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 下拉框 -->
        <el-form-item label="用户组" prop="userGroup">
          <el-select v-model="accAddForm.userGroup">
            <el-option value="普通管理员">普通管理员</el-option>
            <el-option value="超级管理员">超级管理员</el-option>
          </el-select>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button @click="submitForm" type="primary">添加</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </Card>
</template>

<script>
// 引入组件
import Card from "@/components/Card";
//引入验证规则
import { ACC_REG, PWD_REG } from "@/utils/reg.js";
// 引入ajax函数
import { addAcc } from "@/api/account.js";

export default {
  components: {
    //注册 卡片 组件
    Card,
  },
  data() {
    // 自定义验证规则
    const checkAcc = (rule, value, callback) => {
      if (!value) {
        //非空验证失败的回调
        callback(new Error("请输入账号哦"));
      } else if (!ACC_REG.test(value)) {
        //正则验证失败的回调
        callback(new Error("3到12位（中文/字母/数字/下划线"));
      } else {
        //验证成功的回调
        callback();
      }
    };

    const checkPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码哦"));
      } else if (!PWD_REG.test(value)) {
        callback(new Error("3到12位（字母/数字/下划线"));
      } else {
        callback();
      }
    };

    return {
      accAddForm: {
        account: "",
        password: "",
        userGroup: "",
      },
      rules: {
        account: { validator: checkAcc, required: true, trigger: "blur" },
        password: { validator: checkPwd, required: true, trigger: "blur" },
        userGroup: {
          required: true,
          message: "请选择用户组",
          trigger: "change",
        },
      },
    };
  },
  methods: {
    // 添加
    submitForm() {
      this.$refs.accAddForm.validate(async (valid) => {
        if (valid) {
          let res = await addAcc(this.accAddForm);
          let { code } = res;
          if (code === 0) {
            //跳转到转账号列表
            this.$router.push("/account/account-list");
          } else {
            return;
          }
        } else {
          return;
        }
      });
    },
    //重置
    resetForm() {
      this.$refs.accAddForm.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
</style>