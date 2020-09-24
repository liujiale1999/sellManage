<template>
  <Card>
    <span slot="title">账号信息</span>
    <div slot="content">
      <p>管理员ID：{{info.id}}</p>
      <el-divider></el-divider>
      <p>账号：{{info.account}}</p>
      <el-divider></el-divider>
      <p>用户组：{{info.userGroup}}</p>
      <el-divider></el-divider>
      <!-- 过滤时间格式 -->
      <p>创建时间：{{info.ctime | filterCtime}}</p>
      <el-divider></el-divider>
      <p>用户头像：</p>
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <!-- 上传的图片 -->
        <img v-if="imgUrl" :src="imgServeUrl + imgUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <!-- 确认修改 -->
      <el-button @click="handleEdit" type="primary" size="small">确认修改</el-button>
    </div>
  </Card>
</template>

<script>
// 引入卡片
import Card from "@/components/Card";
// 引入本地存储
import local from "@/utils/local";
// 引入修改时间格式
import moment from "moment";
//引入ajax函数
import { users_avataredit } from "@/api/account";

export default {
  components: {
    Card,
  },
  data() {
    return {
      info: {},
      uploadUrl: "http://127.16.17.184:5000/users/avatar_upload", //发送ajax的地址
      imgServeUrl: "http://127.16.17.184:5000/upload/imgs/acc_img/", //图片所在的服务器目录
      imgUrl: "",
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({
          message: msg,
          type: "success",
        });
      }
      this.imgUrl = imgUrl;
    },
    // 修改图片请求
    async handleEdit() {
      let { code } = await users_avataredit({ imgUrl: this.imgUrl });
      if (code === 0) {
        //通知头部傻笑
        this.$bus.$emit("xiu_gai");
      }
    },
  },
  created() {
    this.info = local.get("info");
  },
  // 过滤时间格式
  filters: {
    filterCtime(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.avatar-uploader {
  margin: 15px 0;
}
</style>