<template>
  <Card>
    <span class="title" slot="title">
      <span>商品分类</span>

      <!-- 添加分类按钮 -->
      <el-button type="primary" size="mini" @click="dialogFormVisible = true">添加分类</el-button>

      <!-- 添加分类 -->
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form :model="modelForm">
          <!-- 分类名称 -->
          <el-form-item label="分类名称">
            <el-input v-model="modelForm.cateName" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 是否启用 -->
          <el-form-item label="是否启用">
            <el-switch v-model="modelForm.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddEdit">确 定</el-button>
        </div>
      </el-dialog>
    </span>

    <!-- 分类列表 -->
    <div slot="content">
      <el-table :data="tableData" style="width: 100%">
        <!-- 序号 -->
        <el-table-column label="序号" width="100" type="index"></el-table-column>
        <!-- 分类名称 -->
        <el-table-column label="分类名称" width="180">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEdit">{{ scope.row.cateName }}</span>
            <el-input v-else size="mini" v-model="scope.row.cateName"></el-input>
          </template>
        </el-table-column>
        <!-- 是否启用 -->
        <el-table-column label="是否启用" width="180">
          <template slot-scope="scope">
            <el-switch
              :disabled="!scope.row.isEdit"
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button
              size="mini"
              :type="scope.row.isEdit?'success':''"
              @click="handleEdit(scope.row)"
            >{{scope.row.isEdit?'完成':'编辑'}}</el-button>
            <!-- 删除 -->
            <el-button size="mini" type="danger" @click="handleDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next,jumper"
        :total="total"
        :page-size="pageSize"
        background
      ></el-pagination>
    </div>
  </Card>
</template>

<script>
//引入 卡片  组件
import Card from "@/components/Card";
// 引入ajax函数
import {
  goods_addcate,
  goods_catelist,
  goods_delcate,
  goods_editcate,
} from "@/api/goods";

export default {
  components: {
    Card,
  },
  data() {
    return {
      tableData: [],
      modelForm: {
        cateName: "",
        state: false,
      },
      dialogFormVisible: false,
      currentPage: 1, //当前页码
      total: 0, //总页码
      pageSize: 6, //每页条数
    };
  },
  methods: {
    // 获取分类列表
    async fetchData() {
      let { total, data } = await goods_catelist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });

      // 判断边界值
      if (this.currentPage !== 1 && data.length <= 0) {
        this.currentPage -= 1;
        this.fetchData();
      }

      // 添加一个bool属性  用于切换可编辑 和 不可编辑状态
      data.forEach((item) => {
        item.state = Boolean(item.state);
        item.isEdit = false;
      });

      //渲染到页面
      this.tableData = data;
      this.total = total;
    },
    // 切换 可编辑 和 不可编辑状态
    async handleEdit(row) {
      row.isEdit = !row.isEdit;
      if (!row.isEdit) {
        // 发送编辑请求
        let { code } = await goods_editcate({
          id: row.id,
          cateName: row.cateName,
          state: row.state,
        });
      }
    },
    //当前页改变触发
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData();
    },
    // 添加分类
    async handleAddEdit() {
      let { code } = await goods_addcate(this.modelForm);
      if (code === 0) {
        this.dialogFormVisible = false;
        this.fetchData();
      }
    },
    // 单行删除
    handleDel(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let { code } = await goods_delcate({ id });
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
  },
  created() {
    this.fetchData();
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
}
.el-pagination {
  margin: 20px 0;
}
/deep/ .el-dialog {
  width: 30%;
}
</style>