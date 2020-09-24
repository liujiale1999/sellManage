<template>
  <Card>
    <!-- 标题 -->
    <span slot="title">密码修改</span>
    <!-- 内容 -->
    <div slot="content">
      <el-form
        :model="passForm"
        label-width="100px"
        :rules="rules"
        ref="passForm"
        style="width:318px"
        status-icon
      >
        <!-- 原密码 -->
        <el-form-item label="原密码" prop="oldPwd">
          <el-input v-model="passForm.oldPwd" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 新密码 -->
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="passForm.newPwd" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="confirmPwd">
          <el-input v-model="passForm.confirmPwd" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button @click="submitForm" type="primary">确定</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </Card>
</template>

<script>
// 引入 卡片 组件
import Card from "@/components/Card";
//引入验证规则
import { ACC_REG, PWD_REG } from "@/utils/reg.js";
// 引入ajax函数
import { checkoldpwd, editpwd } from "@/api/account.js";
//引入本地存储
import local from "@/utils/local";

export default {
  components: {
    Card,
  },
  data() {
    // 自定义验证

    // 旧密码
    const checkOldPwd = async (rule, value, callback) => {
      if (!value) {
        callback(new Error("旧密码不能为空"));
      } else {
        //验证旧密码
        let { code } = await checkoldpwd({ oldPwd: value });
        if (code === "11") {
          // this.$message.error("旧密码错误");
          callback(new Error("旧密码错误"));
        } else {
          callback();
        }
      }
    };

    // 新密码验证
    const checkNewPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("新密码不能为空"));
      } else if (!PWD_REG.test(value)) {
        callback(new Error("3到12位（字母，数字，下划线）"));
      } else {
        // 触发一次性验证
        if (this.passForm.confirmPwd !== "") {
          //判断是否为空
          this.$refs.passForm.validateField("confirmPwd");
        }
        callback();
      }
    };

    // 确认验证
    const checkConfirmPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.passForm.newPwd) {
        //验证是否和新密码一致
        callback(new Error("两次密码不一致哦"));
      } else {
        callback();
      }
    };

    return {
      passForm: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: "",
      },
      rules: {
        oldPwd: { required: true, validator: checkOldPwd, trigger: "blur" },
        newPwd: { validator: checkNewPwd, required: true, trigger: "blur" },
        confirmPwd: {
          validator: checkConfirmPwd,
          required: true,
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    //确定
    submitForm() {
      this.$refs.passForm.validate(async (valid) => {
        if (valid) {
          //判断旧密码和新密码是否不同
          if (this.passForm.oldPwd !== this.passForm.newPwd) {
            let { code } = await editpwd({ newPwd: this.passForm.newPwd });
            if (code === 0) {
              this.$router.push("/login");
              local.clear();
            } else {
              this.$message.error("修改失败");
            }
          } else {
            this.$message.error("新密码不能与旧密码相同");
          }
        } else {
          return;
        }
      });
    },
    // 重置
    resetForm() {
      this.$refs.passForm.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
</style>