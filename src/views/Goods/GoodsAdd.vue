<template>
  <Card>
    <span slot="title">商品添加</span>
    <!-- 内容 -->
    <div slot="content">
      <!-- 表单 -->
      <el-form style="width:450px" ref="goodsAdd" :model="goodsAdd" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="goodsAdd.name" placeholder="商品名称"></el-input>
        </el-form-item>
        <!-- 商品分类 -->
        <el-form-item label="商品分类">
          <el-select v-model="goodsAdd.category" placeholder="请选择商品分类">
            <el-option
              v-for="(item,index) in categories"
              :key="index"
              :value="item.cateName"
            >{{item.cateName}}</el-option>
          </el-select>
        </el-form-item>
        <!-- 商品价格 -->
        <el-form-item label="商品价格">
          <el-input-number v-model="goodsAdd.price" :min="1" :max="100"></el-input-number>
        </el-form-item>
        <!-- 商品图片 -->
        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <!-- 图片 -->
            <img v-if="goodsAdd.imgUrl" :src="imgServeUrl + goodsAdd.imgUrl " class="avatar" />
            <!-- 默认图标 -->
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 商品描述 -->
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="goodsAdd.goodsDesc"></el-input>
        </el-form-item>
        <!-- 添加商品 -->
        <el-form-item>
          <el-button type="primary" @click="AddGoods">添加商品</el-button>
        </el-form-item>
      </el-form>
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card";
import { Addgoods, getCategories } from "@/api/goods";
export default {
  components: {
    Card,
  },
  data() {
    return {
      imgServeUrl: "http://127.16.17.184:5000/upload/imgs/goods_img/", //图片所在的服务器目录
      uploadUrl: "http://127.16.17.184:5000/goods/goods_img_upload", // 发送ajax请求的地址
      goodsAdd: {
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: "",
      },
      categories: [],
    };
  },

  methods: {
    handleAvatarSuccess(res) {
      let { code, imgUrl, msg } = res;
      if (code === 0) {
        this.$message({
          message: msg,
          type: "success",
        });
        this.goodsAdd.imgUrl = imgUrl;
      }
    },
    async AddGoods() {
      let { code } = await Addgoods(this.goodsAdd);
      // console.log(code);
      if (code === 0) {
        this.$router.push("/goods/goods-list");
      }
    },
  },
  async created() {
    let { categories } = await getCategories();
    this.categories = categories;
  },
};
</script>

<style lang="less" scoped>
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
</style>