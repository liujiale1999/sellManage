<template>
  <Card>
    <span class="title" slot="title">
      <span>店铺管理</span>
      <el-button @click="save" :type="!isEdit?'primary':'success'" size="mini">{{!isEdit?'编辑':'完成'}}</el-button>
    </span>

    <div slot="content">
      <el-form :model="shopForm" :disabled="!isEdit">
        <!-- 店铺名称 -->
        <el-form-item label="店铺名称" label-width="80px">
          <el-input v-model="shopForm.name"></el-input>
        </el-form-item>

        <!-- 店铺公告 -->
        <el-form-item label="店铺公告" label-width="80px">
          <el-input type="textarea" v-model="shopForm.bulletin"></el-input>
        </el-form-item>

        <!-- 店铺头像 -->
        <el-form-item label="店铺头像" label-width="80px">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="shopForm.avatar" :src="imgServeUrl + shopForm.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!-- 店铺图片 -->
        <el-form-item label="店铺图片" label-width="80px">
          <el-upload
            :action="uploadUrl"
            list-type="picture-card"
            :file-list="shopForm.pics"
            :on-success="handlePicSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- 放大图片的模态框 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>

        <!-- 配送费 -->
        <el-form-item label="配送费" label-width="80px">
          <el-input v-model="shopForm.deliveryPrice"></el-input>
        </el-form-item>
        <!-- 配送时间 -->
        <el-form-item label="配送时间" label-width="80px">
          <el-input v-model="shopForm.deliveryTime"></el-input>
        </el-form-item>
        <!-- 配送描述 -->
        <el-form-item label="配送描述" label-width="80px">
          <el-input v-model="shopForm.description"></el-input>
        </el-form-item>
        <!-- 店铺评分 -->
        <el-form-item label="店铺评分" label-width="80px">
          <el-input v-model="shopForm.score"></el-input>
        </el-form-item>
        <!-- 销量 -->
        <el-form-item label="销量" label-width="80px">
          <el-input v-model="shopForm.sellCount"></el-input>
        </el-form-item>

        <!-- 活动 -->
        <el-form-item label="活动" label-width="80px">
          <el-checkbox-group v-model="shopForm.supports">
            <el-checkbox label="在线支付满28减5"></el-checkbox>
            <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
            <el-checkbox label="单人精彩套餐"></el-checkbox>
            <el-checkbox label="特价饮品8折抢购"></el-checkbox>
            <el-checkbox label="单人特色套餐"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 营业时间 -->
        <el-form-item label="营业时间" label-width="80px">
          <el-time-picker
            is-range
            v-model="shopForm.date"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          ></el-time-picker>
        </el-form-item>
      </el-form>
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card";
import { getShopInfo, shopEdit } from "@/api/shop.js";
import { isDate } from "moment";
export default {
  components: {
    Card,
  },
  data() {
    return {
      shopForm: {
        id: "",
        name: "",
        bulletin: "",
        // 图片
        avatar: "",
        pics: [],
        deliveryPrice: "",
        deliveryTime: "",
        description: "",
        score: "",
        sellCount: "",
        supports: "",
        date: "",
      },
      uploadUrl: "http://127.16.17.184:5000/shop/upload", //发送ajax的地址
      imgServeUrl: "http://127.16.17.184:5000/upload/shop/", //图片所在的服务器目录
      dialogVisible: false, //查看图片的模态框是否隐藏
      isEdit: false,
      dialogImageUrl: "", //查看图片的模态框里的图片的地址
    };
  },
  methods: {
    // 头像图片上传成功
    handleAvatarSuccess(res) {
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({
          message: msg,
          type: "success",
        });
      }
      // 头像回填
      this.shopForm.avatar = imgUrl;
    },
    // 店铺图片上传成功
    handlePicSuccess(res) {
      let { code, msg, imgUrl } = res;
      // 把上传成功的图片添加到pics[里面]
      this.shopForm.pics.push({ url: this.imgServeUrl + imgUrl });
    },
    // 点击已上传文件的钩子  查看大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      // 显示模态框
      this.dialogVisible = true;
    },
    // 删除图片的钩子
    handleRemove(file) {
      this.shopForm.pics.forEach((item, index) => {
        if (item.url === file.url) {
          this.shopForm.pics.splice(index, 1);
        }
      });
    },
    // 修改店铺数据
    async save() {
      this.isEdit = !this.isEdit;

      if (!this.isEdit) {
        // 处理图片
        let arr = this.shopForm.pics.map((pic) => {
          return pic.url.substr(this.imgServeUrl.length);
        });
        let data = {
          id: this.shopForm.id,
          name: this.shopForm.name,
          bulletin: this.shopForm.bulletin,
          avatar: this.shopForm.avatar,
          deliveryPrice: this.shopForm.deliveryPrice,
          deliveryTime: this.shopForm.deliveryTime,
          description: this.shopForm.description,
          score: this.shopForm.score,
          sellCount: this.shopForm.sellCount,
          supports: JSON.stringify(this.shopForm.supports),
          pics: JSON.stringify(arr),
          date: JSON.stringify(this.shopForm.date),
        };
        await shopEdit(data);
      }
    },
  },
  async created() {
    // 数据回填
    let { data } = await getShopInfo();

    // 把每张图片的数据格式 处理成完整的地址
    data.pics = data.pics.map((item) => {
      return { url: this.imgServeUrl + item };
    });

    this.shopForm = data;
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
}
.el-form {
  width: 600px;
  /deep/.avatar-uploader .el-upload {
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
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 148px;
    height: 148;
    display: block;
  }
}
</style>