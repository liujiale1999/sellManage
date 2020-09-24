<template>
  <Card>
    <span slot="title">商品列表</span>

    <div slot="content">
      <!-- 查询 -->
      <el-form :inline="true" :model="orderSearch">
        <el-form-item label="商品名称" size="mini">
          <el-input v-model="orderSearch.name" placeholder="商品名称"></el-input>
        </el-form-item>
        <!-- 分类 -->
        <el-form-item label="商品分类" size="mini">
          <el-select v-model="orderSearch.category" placeholder="请选择商品分类">
            <el-option
              v-for="(item,index) in categories"
              :key="index"
              :value="item.cateName"
            >{{item.cateName}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <!-- 商品详情 -->
            <el-form label-position="left" inline class="demo-table-expand">
              <!-- 商品 ID -->
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <!-- 商品名称 -->
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <!-- 商品分类 -->
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <!-- 商品价格 -->
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <!-- 图片 -->
              <el-form-item label="图片">
                <img style="width:40px;height:40px" :src="imgServeUrl+props.row.imgUrl" alt />
              </el-form-item>
              <!-- 创建时间 -->
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime | filterCtime }}</span>
              </el-form-item>
              <!-- 商品评价 -->
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <!-- 商品销量 -->
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
              <!-- 商品描述 -->
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- 商品列表 -->
        <!-- 商品名称 -->
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <!-- 所属分类 -->
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <!-- 商品价格 -->
        <el-table-column label="商品价格" prop="price" width="100"></el-table-column>
        <!-- 商品图片 -->
        <el-table-column label="商品图片" prop="imgUrl" width="100">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <img style="width:40px;height:40px" :src="imgServeUrl+scope.row.imgUrl" alt />
          </template>
        </el-table-column>
        <!-- 商品描述 -->
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 模态框 -->
      <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
        <el-form :model="Editform">
          <!-- 商品名称 -->
          <el-form-item label="商品名称" label-width="80px">
            <el-input v-model="Editform.name" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 商品分类 -->
          <el-form-item label="商品分类" label-width="80px">
            <el-input v-model="Editform.category" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 商品价格 -->
          <el-form-item label="商品价格" label-width="80px">
            <el-input v-model="Editform.price" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 商品图片 -->
          <el-form-item label="商品图片" label-width="80px">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <!-- 图片 -->
              <img v-if="Editform.imgUrl" :src="imgServeUrl + Editform.imgUrl " class="avatar" />
              <!-- 默认图标 -->
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 商品描述 -->
          <el-form-item label="商品描述" label-width="80px">
            <el-input v-model="Editform.goodsDesc" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 商品id -->
          <!-- <el-form-item label="商品id" label-width="80px">
            <el-input v-model="Editform.id" autocomplete="off"></el-input>
          </el-form-item>-->
        </el-form>
        <!-- 按钮 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddEdit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 3, 5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card";
import {
  getGoodsList,
  EditGoodsList,
  delGoods,
  getCategories,
} from "@/api/goods";
// 引入修改时间格式
import moment from "moment";
export default {
  components: {
    Card,
  },
  data() {
    return {
      tableData: [],
      currentPage: 1, //当前页码
      pageSize: 5, //每页条数
      total: 0,
      imgServeUrl: "http://127.16.17.184:5000/upload/imgs/goods_img/", //图片所在的服务器目录
      Editform: {
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: "",
        id: "",
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      uploadUrl: "http://127.16.17.184:5000/goods/goods_img_upload", // 发送ajax请求的地址
      orderSearch: {
        //商品查询
        name: "",
        category: "",
      },
      categories: [],
    };
  },
  methods: {
    async fetchData() {
      let { total, data } = await getGoodsList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        name: this.orderSearch.name,
        category: this.orderSearch.category,
      });

      // 渲染到页面
      this.tableData = data;
      this.total = total;
    },
    // 每页条数改变触发
    handleSizeChange(size) {
      this.pageSize = size;
      this.fetchData();
    },
    // 当前页改变时触发
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData();
    },

    // 点击编辑  弹出模态框
    handleEdit(row) {
      this.dialogFormVisible = true;
      let { name, category, price, imgUrl, goodsDesc, id } = row;
      this.Editform = { name, category, price, imgUrl, goodsDesc, id }; //和模态框双向绑定
      // console.log(this.Editform);
    },
    // 商品上传成功的回调函数
    handleAvatarSuccess(res) {
      let { code, msg, imgUrl } = res;
      // console.log(imgUrl);
      if (code === 0) {
        this.$message({
          message: msg,
          type: "success",
        });
        this.Editform.imgUrl = imgUrl;
      }
    },
    // 确定修改
    async handleAddEdit() {
      let { code } = await EditGoodsList(this.Editform);
      // console.log(this.Editform);
      if (code === 0) {
        this.dialogFormVisible = false;
        this.fetchData();
      }
    },
    // 删除商品
    handleDel(id) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { code } = await delGoods({ id });
          if (code === 0) {
            this.fetchData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 查询
    search() {
      this.currentPage = 1; //页码调到第一页
      this.fetchData();
    },
    // 重置
    reset() {
      this.orderSearch = {
        name: "",
        category: "",
      };
      //再次调用查询
      this.search();
    },
  },
  async created() {
    this.fetchData(); //第一次调用
    let { categories } = await getCategories();
    this.categories = categories;
  },
  // 修改时间格式
  filters: {
    filterCtime(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-pagination {
  margin: 20px 0;
}
/deep/ .el-dialog {
  width: 40%;
}
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